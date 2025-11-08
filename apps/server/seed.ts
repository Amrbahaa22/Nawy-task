import { connect, connection } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

// MongoDB connection string
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://mongoadminsusr:mongoadminpassword@localhost:27017/mydb?authSource=admin';

// Define the apartment schema structure
interface Apartment {
  title: string;
  description: string;
  type: string;
  price: number;
  rooms: number;
  baths: number;
  area: number;
  furnishingStatus?: string;
  amenities: string[];
  photos?: string[];
  images?: string[];
}

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connect(DATABASE_URL);
    console.log('✅ Connected to MongoDB');

    // Read the properties.json file
    // Try multiple paths (for local dev and Docker)
    let propertiesPath = path.join(__dirname, '../client/properties.json');
    if (!fs.existsSync(propertiesPath)) {
      propertiesPath = path.join(__dirname, 'properties.json');
    }

    console.log(`📁 Reading properties from: ${propertiesPath}`);
    const propertiesData = fs.readFileSync(propertiesPath, 'utf-8');
    const properties: Apartment[] = JSON.parse(propertiesData);

    console.log(`📦 Found ${properties.length} properties to insert`);

    // Get the apartments collection
    const db = connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    const apartmentsCollection = db.collection('apartments');

    // Clear existing data (optional)
    const deleteResult = await apartmentsCollection.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing apartments`);

    // Transform the data to match the schema
    const transformedProperties = properties.map(prop => ({
      title: prop.title,
      description: prop.description || '',
      type: prop.type,
      price: prop.price,
      rooms: prop.rooms,
      baths: prop.baths,
      area: prop.area,
      furnishingStatus: prop.furnishingStatus || 'not furnished',
      amenities: prop.amenities || [],
      photos: prop.images || prop.photos || [],
    }));

    // Insert the properties
    const result = await apartmentsCollection.insertMany(transformedProperties);
    console.log(`✅ Successfully inserted ${result.insertedCount} apartments`);

    // Display the inserted documents
    const insertedDocs = await apartmentsCollection.find({}).toArray();
    console.log('\n📋 Inserted apartments:');
    insertedDocs.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.title} - $${doc.price}/month - ${doc.rooms} rooms`);
    });

    console.log('\n🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await connection.close();
    console.log('👋 Database connection closed');
  }
}

// Run the seed function
seedDatabase();
