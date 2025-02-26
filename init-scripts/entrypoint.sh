#!/bin/sh
set -e

echo "Waiting for the database to be available..."
# Wait up to 30 seconds for the DB to be ready.
./wait-for-it.sh db:5432 -t 30

echo "Database is available. Generating Prisma client..."
# Generate the Prisma client (this does not require a DB connection in most cases)
npx prisma generate

echo "Running Prisma migrations..."
# Use 'migrate dev' in development or 'migrate deploy' in production.
# Here we use migrate dev; adjust as needed.
npx prisma migrate dev --name init --skip-seed

echo "Seeding the database..."
npx prisma db seed

echo "Starting the application..."
# Finally, start the application (adjust the command as needed)
npm run start
