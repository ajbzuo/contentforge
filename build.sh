#!/bin/bash

# Vercel build script for TIME replica website
echo "Starting build process..."

# Install dependencies
npm ci

# Build the client (React app)
echo "Building client application..."
npm run build

# The server will be built automatically by Vercel using the Node.js runtime
echo "Build completed successfully!"