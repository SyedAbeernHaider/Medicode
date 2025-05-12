const { execSync } = require('child_process');
const fs = require('fs');

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

// Build the project
console.log('Building project...');
execSync('npm run build', { stdio: 'inherit' });

// Verify the build output
if (!fs.existsSync('dist')) {
  console.error('Build failed: dist directory not found');
  process.exit(1);
}

console.log('Build completed successfully!');
