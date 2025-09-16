#!/usr/bin/env node

/**
 * Simple deployment script for Vercel
 * Run with: node deploy-to-vercel.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel deployment process...\n');

// Check if vercel.json exists
if (!fs.existsSync('vercel.json')) {
  console.error('❌ vercel.json not found. Please ensure the configuration file exists.');
  process.exit(1);
}

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found.');
  process.exit(1);
}

try {
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });
  
  console.log('\n🔨 Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('\n☁️  Deploying to Vercel...');
  console.log('If this is your first deployment, you\'ll be prompted to:');
  console.log('1. Link to an existing project or create a new one');
  console.log('2. Confirm the deployment settings\n');
  
  // Run vercel deployment
  execSync('vercel --prod', { stdio: 'inherit' });
  
  console.log('\n✅ Deployment completed successfully!');
  console.log('Your TIME replica website is now live on Vercel.');
  
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  console.log('\nTroubleshooting tips:');
  console.log('1. Make sure Vercel CLI is installed: npm install -g vercel');
  console.log('2. Login to Vercel: vercel login');
  console.log('3. Check the deployment logs for specific errors');
  process.exit(1);
}