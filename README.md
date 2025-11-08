# 🏠 Apartment Rental Platform

A modern, full-stack apartment rental platform built with Next.js, NestJS, and MongoDB. This application allows users to browse, search, and add apartment listings with image uploads powered by Cloudinary.

![Tech Stack](https://img.shields.io/badge/Next.js-15.0.4-black?style=flat&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-10.0-red?style=flat&logo=nestjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?style=flat&logo=docker)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue?style=flat&logo=typescript)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Seeding](#database-seeding)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Contributing](#contributing)

## ✨ Features

- 🏘️ **Browse Apartments** - View a comprehensive list of available apartments
- 🔍 **Search & Filter** - Find properties by type, price, rooms, and amenities
- 📝 **Add Listings** - Create new apartment listings with detailed information
- 🖼️ **Image Upload** - Upload multiple property images via Cloudinary integration
- 📱 **Responsive Design** - Fully responsive UI built with Tailwind CSS
- 🔐 **Form Validation** - Robust client and server-side validation
- 🐳 **Docker Support** - Containerized application for easy deployment
- 📊 **Database Management** - MongoDB with Mongoose ODM
- 🔄 **Auto-Seeding** - Automatic database population with sample data
- 📖 **API Documentation** - Interactive Swagger/OpenAPI documentation

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Ant Design, React Icons
- **State Management**: Zustand
- **Image Gallery**: PhotoSwipe
- **HTTP Client**: Axios
- **Notifications**: React Toastify

### Backend
- **Framework**: [NestJS 10](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **File Upload**: Multer + Cloudinary
- **Validation**: class-validator, class-transformer
- **API Docs**: Swagger/OpenAPI

### DevOps
- **Monorepo**: Turborepo
- **Containerization**: Docker & Docker Compose
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier

## 📁 Project Structure

```
Apartment-Website/
├── apps/
│   ├── client/                 # Next.js Frontend Application
│   │   ├── app/               # App Router pages
│   │   │   ├── properties/    # Property listing pages
│   │   │   │   ├── [id]/     # Dynamic property detail page
│   │   │   │   └── add/      # Add new property page
│   │   │   ├── layout.tsx    # Root layout
│   │   │   └── page.tsx      # Home page
│   │   ├── components/        # React components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   ├── store/            # Zustand state management
│   │   └── properties.json   # Sample property data
│   │
│   └── server/                # NestJS Backend Application
│       ├── src/
│       │   ├── features/
│       │   │   ├── apartment/ # Apartment module
│       │   │   │   ├── apartment.controller.ts
│       │   │   │   ├── apartment.service.ts
│       │   │   │   ├── dto/  # Data Transfer Objects
│       │   │   │   └── entity/
│       │   │   └── cloudinary/ # Image upload service
│       │   └── common/        # Shared utilities
│       ├── seed.ts           # Database seeding script
│       ├── docker-entrypoint.sh
│       └── Dockerfile
│
├── packages/
│   └── eslint-config/        # Shared ESLint configurations
│
├── docker-compose.yaml       # Docker orchestration
├── turbo.json               # Turborepo configuration
└── .env                     # Environment variables
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 10.x
- **Docker** >= 20.x (for containerized deployment)
- **Docker Compose** >= 2.x (for containerized deployment)

### For Local Development (without Docker):
- **MongoDB** >= 6.x

## 🚀 Installation

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amrbahaa22/Apartment-Website.git
   cd Apartment-Website
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your credentials:
   ```env
   # Database
   DATABASE_URL=mongodb://mongoadminsusr:mongoadminpassword@mongodb:27017/mydb?authSource=admin

   # Cloudinary (for image uploads)
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Start all services with Docker**
   ```bash
   docker compose up -d
   ```

   This will start:
   - **MongoDB** on port 27017
   - **Mongo Express** (DB Admin) on port 8081
   - **Backend API** on port 8000
   - **Frontend** on port 3000

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/api
   - Database Admin: http://localhost:8081

### Option 2: Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amrbahaa22/Apartment-Website.git
   cd Apartment-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Update for local development:
   ```env
   DATABASE_URL=mongodb://mongoadminsusr:mongoadminpassword@127.0.0.1:27017/mydb?authSource=admin
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start MongoDB** (if not using Docker)
   ```bash
   mongod --dbpath /path/to/data/db
   ```

5. **Seed the database**
   ```bash
   cd apps/server
   npm run seed
   ```

6. **Start development servers**
   ```bash
   # From project root
   npm run dev
   ```

   Or start services individually:
   ```bash
   # Terminal 1 - Backend
   cd apps/server
   npm run start:dev

   # Terminal 2 - Frontend
   cd apps/client
   npm run dev
   ```

## 📖 Usage

### Browsing Properties

1. Navigate to http://localhost:3000
2. Browse featured properties on the home page
3. Click on any property to view detailed information
4. Use the search and filter options to find specific properties

### Adding a New Property

1. Go to http://localhost:3000/properties/add
2. Fill in the property details:
   - Title
   - Description
   - Type (Apartment, House, Condo, etc.)
   - Price per month
   - Number of rooms and bathrooms
   - Square footage
   - Furnishing status
   - Amenities (select multiple)
   - Upload property images
3. Submit the form
4. Property will be added to the database and visible on the listings page

### API Usage

#### Get All Apartments
```bash
curl http://localhost:8000/v1/apartment
```

#### Get Apartment by ID
```bash
curl http://localhost:8000/v1/apartment/{id}
```

#### Create New Apartment
```bash
curl -X POST http://localhost:8000/v1/apartment \
  -H "Content-Type: multipart/form-data" \
  -F "title=Luxury Apartment" \
  -F "description=Beautiful apartment in downtown" \
  -F "type=Apartment" \
  -F "price=2500" \
  -F "rooms=3" \
  -F "baths=2" \
  -F "area=1500" \
  -F "furnishingStatus=furnished" \
  -F "amenities=[\"Wifi\",\"Gym\",\"Parking\"]" \
  -F "photos=@image1.jpg" \
  -F "photos=@image2.jpg"
```

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MongoDB connection string | `mongodb://user:pass@localhost:27017/mydb` |
| `CLOUDINARY_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_secret_key` |
| `NEXT_PUBLIC_API_DOMAIN` | API URL for client | `http://localhost:8000/v1` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |

## 📚 API Documentation

Interactive API documentation is available via Swagger UI:

**URL**: http://localhost:8000/api

The documentation includes:
- All available endpoints
- Request/response schemas
- Try-it-out functionality
- Model definitions

## 🌱 Database Seeding

The application automatically seeds the database with sample property data when running in Docker.

### Manual Seeding

To manually seed the database:

```bash
# Local development
cd apps/server
npm run seed

# Docker
docker exec -it apartment_server npm run seed
```

The seed script will:
1. Connect to MongoDB
2. Clear existing apartment data
3. Insert 10 sample properties from `apps/client/properties.json`
4. Display confirmation

### Sample Data

The seed includes 10 properties with various:
- Types (Apartment, House, Condo, Cabin, etc.)
- Price ranges ($1,000 - $3,800/month)
- Room configurations (1-4 bedrooms)
- Amenities and features

## 💻 Development

### Available Scripts

```bash
# Install dependencies
npm install

# Start all services in development mode
npm run dev

# Build all packages
npm run build

# Lint code
npm run lint

# Format code
npm run format

# Docker commands
docker compose up -d          # Start all services
docker compose down           # Stop all services
docker compose logs -f        # View logs
docker compose restart        # Restart services
```

### Development Workflow

1. **Make changes** to your code
2. **Hot reload** is enabled for both frontend and backend
3. **Test changes** in the browser (http://localhost:3000)
4. **Check API** via Swagger (http://localhost:8000/api)
5. **Commit** your changes following conventional commits

### Turborepo Commands

```bash
# Run dev for all apps
npm run dev

# Run dev for specific app
npx turbo dev --filter=@apps/client
npx turbo dev --filter=@apps/server

# Build specific app
npx turbo build --filter=@apps/client
```

## 🚢 Production Deployment

### Docker Production Build

1. **Build production images**
   ```bash
   docker compose build
   ```

2. **Start production containers**
   ```bash
   docker compose up -d
   ```

3. **Check container health**
   ```bash
   docker compose ps
   docker logs apartment_server
   docker logs apartment_client
   ```

### Environment Configuration

Ensure production environment variables are set:
- Use strong database passwords
- Set `NODE_ENV=production`
- Configure proper CORS settings
- Use production Cloudinary credentials
- Set up proper logging

### Health Checks

- MongoDB: Health check runs every 10 seconds
- Backend waits for MongoDB to be healthy before starting
- Automatic database seeding on first startup

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Amr Bahaa**
- GitHub: [@Amrbahaa22](https://github.com/Amrbahaa22)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- NestJS team for the powerful backend framework
- Turborepo for monorepo management
- Cloudinary for image hosting
- MongoDB for the database

---

**Note**: Don't forget to replace placeholder values in `.env` with your actual credentials before running the application.

For issues and feature requests, please use the [GitHub Issues](https://github.com/Amrbahaa22/Apartment-Website/issues) page.

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
