#!/bin/sh
set -e

echo "🚀 Starting apartment server..."

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
until nc -z mongodb 27017; do
  echo "MongoDB is unavailable - sleeping"
  sleep 2
done

echo "✅ MongoDB is ready!"

# Run seed script
echo "🌱 Seeding database..."
if [ -f "seed.ts" ]; then
  npx ts-node seed.ts || echo "⚠️  Seeding failed or already completed"
else
  echo "⚠️  seed.ts not found, skipping seeding"
fi

# Start the application
echo "🎯 Starting NestJS application..."
exec node dist/main.js
