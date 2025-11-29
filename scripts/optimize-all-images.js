/**
 * optimize-all-images.js
 * 
 * This script runs a complete image optimization workflow:
 * 1. Verifies all image references in the project
 * 2. Creates placeholder images
 * 3. Optimizes all images for size and format
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for pretty console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

// Helper to log a section title
const logSection = (title) => {
  console.log('\n' + colors.bgBlue + colors.white + colors.bright + ' ' + title + ' ' + colors.reset + '\n');
};

// Helper to log a task
const logTask = (task, indent = 0) => {
  const indentStr = '  '.repeat(indent);
  console.log(indentStr + colors.cyan + '→' + colors.reset + ' ' + task);
};

// Helper to log success
const logSuccess = (message, indent = 0) => {
  const indentStr = '  '.repeat(indent);
  console.log(indentStr + colors.green + '✓' + colors.reset + ' ' + message);
};

// Helper to log error
const logError = (message, indent = 0) => {
  const indentStr = '  '.repeat(indent);
  console.log(indentStr + colors.red + '✗' + colors.reset + ' ' + message);
};

// Helper to log warning
const logWarning = (message, indent = 0) => {
  const indentStr = '  '.repeat(indent);
  console.log(indentStr + colors.yellow + '⚠' + colors.reset + ' ' + message);
};

// Helper to run a script and handle errors
const runScript = (scriptPath, errorMessage) => {
  try {
    logTask(`Running ${path.basename(scriptPath)}...`);
    execSync(`node ${scriptPath}`, { stdio: 'inherit' });
    return true;
  } catch (error) {
    logError(`Error running ${path.basename(scriptPath)}: ${errorMessage || error.message}`);
    return false;
  }
};

// Main function
const main = async () => {
  console.log(colors.bright + colors.magenta + `
  ╔═════════════════════════════════════════════╗
  ║ MINDSCAPE IMAGE OPTIMIZATION TOOLKIT        ║
  ║                                             ║
  ║ Complete image optimization workflow        ║
  ╚═════════════════════════════════════════════╝` + colors.reset);
  
  // Step 1: Verify image references
  logSection('STEP 1: Verifying Image References');
  const verifyResult = runScript('./scripts/verify-images.js', 'Could not verify images');
  
  if (!verifyResult) {
    logWarning('Image verification had issues, but continuing with optimization...');
  } else {
    logSuccess('Image verification completed successfully');
  }
  
  // Step 2: Create placeholder images
  logSection('STEP 2: Creating Placeholder Images');
  const placeholdersResult = runScript('./scripts/create-placeholder.js', 'Could not create placeholder images');
  
  if (!placeholdersResult) {
    logWarning('Placeholder creation had issues, but continuing with optimization...');
  } else {
    logSuccess('Placeholder creation completed successfully');
  }
  
  // Step 3: Run the main image optimization
  logSection('STEP 3: Optimizing All Images');
  const optimizeResult = runScript('./scripts/optimize-images.js', 'Image optimization failed');
  
  if (!optimizeResult) {
    logError('Image optimization encountered errors');
    process.exit(1);
  } else {
    logSuccess('Image optimization completed successfully');
  }
  
  // Step 4: Summary
  logSection('OPTIMIZATION COMPLETE');
  console.log(colors.green + colors.bright + 'All image optimization steps have been completed!' + colors.reset);
  console.log('\nNext steps:');
  console.log('1. Review optimized images in /optimized directories');
  console.log('2. Replace original large images with optimized versions');
  console.log('3. Use the OptimizedImage component for better loading performance');
  console.log('4. Add PreloadCriticalImages component to your layout');
  
  // Add script to package.json if not already there
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = require(packageJsonPath);
      
      if (!packageJson.scripts || !packageJson.scripts['optimize:all-images']) {
        logTask('Adding script to package.json...');
        
        if (!packageJson.scripts) {
          packageJson.scripts = {};
        }
        
        packageJson.scripts['optimize:all-images'] = 'node scripts/optimize-all-images.js';
        
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        logSuccess('Added optimize:all-images script to package.json');
      }
    }
  } catch (error) {
    logWarning('Could not update package.json: ' + error.message);
  }
};

// Run the main function
main().catch(error => {
  console.error(colors.red + 'Unhandled error in optimization process:' + colors.reset, error);
  process.exit(1);
}); 