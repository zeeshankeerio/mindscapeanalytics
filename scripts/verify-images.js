const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const PUBLIC_IMAGE_DIRS = ['public/images', 'public/assets']; 
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];

// Get all image references from JS and TSX files
const findImageReferences = () => {
  const references = new Set();
  
  // Search for image references in code files
  const files = glob.sync('{app,components,pages}/**/*.{js,jsx,ts,tsx}');
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Match common image path patterns
      const imgMatches = content.match(/['"](\/images\/[^'"]+)|['"](\/assets\/[^'"]+)/g) || [];
      
      imgMatches.forEach(match => {
        // Clean up the match
        const cleanMatch = match.replace(/['"]/g, '');
        if (!references.has(cleanMatch)) {
          references.add(cleanMatch);
        }
      });
      
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  });
  
  return Array.from(references);
};

// Verify if referenced images exist in the public directory
const verifyImages = () => {
  const imageReferences = findImageReferences();
  const missingImages = [];
  const publicDir = 'public';
  
  console.log(`Found ${imageReferences.length} image references in code files.`);
  
  for (const imgRef of imageReferences) {
    // Remove leading slash if present
    const relativePath = imgRef.startsWith('/') ? imgRef.substring(1) : imgRef;
    const fullPath = path.join(publicDir, relativePath);
    
    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      missingImages.push(imgRef);
    }
  }
  
  return missingImages;
};

// Main function
const main = () => {
  console.log('🔍 Verifying image references...');
  
  const missingImages = verifyImages();
  
  if (missingImages.length === 0) {
    console.log('✅ All referenced images exist in the public directory.');
  } else {
    console.log(`⚠️ Found ${missingImages.length} missing images:`);
    missingImages.forEach(img => {
      console.log(`  - ${img}`);
    });
    
    console.log('\n💡 To fix the missing images:');
    console.log('1. Add the missing images to the appropriate public directory');
    console.log('2. OR update the code to reference existing images');
    console.log('3. OR use the OptimizedImage component which handles missing images gracefully');
  }
};

// Check image files in the public directory
const checkPublicImages = () => {
  console.log('🔍 Checking image formats in public directory...');
  
  PUBLIC_IMAGE_DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.log(`Directory ${dir} doesn't exist, skipping...`);
      return;
    }
    
    // Find all image files
    const imageFiles = glob.sync(`${dir}/**/*.*`);
    
    let validCount = 0;
    let suspiciousCount = 0;
    const suspiciousFiles = [];
    
    imageFiles.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        // This is a known image extension
        try {
          const stats = fs.statSync(file);
          if (stats.size < 100) { // Suspiciously small file
            suspiciousFiles.push({ file, size: stats.size });
            suspiciousCount++;
          } else {
            validCount++;
          }
        } catch (error) {
          console.error(`Error checking file ${file}:`, error);
        }
      } else {
        // Unknown extension in image directory
        suspiciousFiles.push({ file, reason: 'Unknown extension' });
        suspiciousCount++;
      }
    });
    
    console.log(`Found ${validCount} valid images and ${suspiciousCount} suspicious files in ${dir}`);
    
    if (suspiciousFiles.length > 0) {
      console.log('Suspicious files:');
      suspiciousFiles.forEach(({ file, size, reason }) => {
        console.log(`  - ${file}${size ? ` (${size} bytes)` : ''}${reason ? ` - ${reason}` : ''}`);
      });
    }
  });
};

// Run both checks
main();
checkPublicImages(); 