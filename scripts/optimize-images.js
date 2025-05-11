const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Enhanced Configuration
const QUALITY_DEFAULT = 80; // Default quality setting for JPEG, WebP, and AVIF
const QUALITY_HIGH = 85; // Higher quality for critical images
const QUALITY_LARGE_FILES = 75; // Lower quality for very large images (>1MB)
const QUALITY_VERY_LARGE = 65; // Even lower quality for extremely large images (>4MB)

// Size breakpoints for responsive images
const DIMENSIONS = [
  { width: 320 },  // Small mobile screens
  { width: 640 },  // Mobile screens
  { width: 750 },  // Larger mobile screens  
  { width: 828 },  // Medium screens
  { width: 1080 }, // Tablets/Laptop screens
  { width: 1200 }, // Laptop screens
  { width: 1920 }, // Desktop screens
  { width: 2048 }, // Large desktop screens
  { width: 3840 }  // 4K screens
];

// Prioritize more efficient formats
const OUTPUT_FORMATS = ['webp', 'avif']; // Modern formats to generate in addition to original
const PUBLIC_IMAGE_DIRS = [
  'public/images', 
  'public/assets', 
  'public',
  'public/icons',
  'public/images/scrolling_solutions',
  'public/images/real-estate',
  'public/images/projects',
  'public/images/services',
  'public/images/solutions',
  'public/images/partners'
]; // All directories containing images
const PLACEHOLDER_WIDTH = 20; // Width of low-quality image placeholders

// File size thresholds in bytes
const LARGE_FILE_THRESHOLD = 1 * 1024 * 1024; // 1MB
const VERY_LARGE_FILE_THRESHOLD = 4 * 1024 * 1024; // 4MB
const CRITICAL_FILES = [
  'founder.jpg', 
  'apple-icon.png', 
  'favicon.ico', 
  'icon.png',
  'mindscape-showcase.jpg'
]; // Files that need special handling

// Ensure output directories exist
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Get all image files from the specified directories
const getImageFiles = () => {
  let imageFiles = [];
  
  PUBLIC_IMAGE_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = glob.sync(`${dir}/**/*.+(jpg|jpeg|png|gif|webp|avif)`);
      imageFiles = [...imageFiles, ...files];
    }
  });
  
  // Remove duplicates
  imageFiles = [...new Set(imageFiles)];
  
  return imageFiles;
}

// Create a low quality placeholder image
const createPlaceholder = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize(PLACEHOLDER_WIDTH)
      .blur(5)
      .webp({ quality: 80 }) // Always use WebP for placeholders
      .toFile(outputPath);
    
    console.log(`✓ Created placeholder: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`✗ Error creating placeholder for ${inputPath}:`, error);
    return false;
  }
}

// Determine quality setting based on file size and importance
const getQualityForFile = (filePath, fileSize) => {
  const fileName = path.basename(filePath);
  
  // For critical files, we might want to maintain higher quality
  if (CRITICAL_FILES.includes(fileName) && fileSize < LARGE_FILE_THRESHOLD) {
    return QUALITY_HIGH;
  }
  
  // For very large files, use much more aggressive compression
  if (fileSize > VERY_LARGE_FILE_THRESHOLD) {
    return QUALITY_VERY_LARGE;
  }
  
  // For large files, use more aggressive compression
  if (fileSize > LARGE_FILE_THRESHOLD) {
    return QUALITY_LARGE_FILES;
  }
  
  // Default quality setting
  return QUALITY_DEFAULT;
}

// Optimize and resize an image
const optimizeImage = async (filePath) => {
  try {
    const fileInfo = path.parse(filePath);
    const outputDir = path.join(fileInfo.dir, 'optimized');
    ensureDirectoryExists(outputDir);
    
    // Create placeholders directory
    const placeholdersDir = path.join(fileInfo.dir, 'placeholders');
    ensureDirectoryExists(placeholdersDir);
    
    // Get file size
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    const qualitySetting = getQualityForFile(filePath, fileSize);
    
    console.log(`Processing ${filePath} (${(fileSize / 1024 / 1024).toFixed(2)}MB) with quality ${qualitySetting}`);
    
    // Create placeholder image
    const placeholderPath = path.join(placeholdersDir, `${fileInfo.name}.webp`);
    await createPlaceholder(filePath, placeholderPath);
    
    // Create a high-quality WebP version at original size for critical images
    if (CRITICAL_FILES.includes(fileInfo.name + fileInfo.ext)) {
      const criticalWebpPath = path.join(outputDir, `${fileInfo.name}-original.webp`);
      await sharp(filePath)
        .webp({ quality: QUALITY_HIGH })
        .toFile(criticalWebpPath);
      console.log(`✓ Created critical WebP version: ${criticalWebpPath}`);
    }
    
    // Read image metadata
    const metadata = await sharp(filePath).metadata();
    
    // For founder.jpg and other very large images, create a special optimized version
    if (fileSize > VERY_LARGE_FILE_THRESHOLD) {
      // Create a highly optimized version at original dimensions
      const optimizedOrigPath = path.join(outputDir, `${fileInfo.name}-optimized${fileInfo.ext}`);
      await sharp(filePath)
        .jpeg({ quality: QUALITY_VERY_LARGE, mozjpeg: true })
        .toFile(optimizedOrigPath);
      
      console.log(`✓ Created highly optimized original: ${optimizedOrigPath}`);
      
      // Create an optimized WebP version
      const optimizedWebpPath = path.join(outputDir, `${fileInfo.name}-optimized.webp`);
      await sharp(filePath)
        .webp({ quality: QUALITY_VERY_LARGE, effort: 6 })
        .toFile(optimizedWebpPath);
      
      console.log(`✓ Created highly optimized WebP: ${optimizedWebpPath}`);
      
      // For founder.jpg, create an even smaller version
      if (fileInfo.name === 'founder') {
        const reducedPath = path.join(outputDir, `${fileInfo.name}-reduced.webp`);
        await sharp(filePath)
          .resize(1200) // Reduce dimensions
          .webp({ quality: QUALITY_VERY_LARGE, effort: 6 })
          .toFile(reducedPath);
        
        console.log(`✓ Created reduced size version: ${reducedPath}`);
      }
    }
    
    // Process each required dimension
    for (const dimension of DIMENSIONS) {
      // Skip if target width is larger than original to prevent upscaling
      if (dimension.width > metadata.width) continue;
      
      // Create resized original format
      const origOutputPath = path.join(outputDir, `${fileInfo.name}-${dimension.width}${fileInfo.ext}`);
      await sharp(filePath)
        .resize(dimension.width)
        .toFile(origOutputPath);
      
      console.log(`✓ Resized to ${dimension.width}px: ${origOutputPath}`);
      
      // Create WebP and AVIF versions at appropriate quality
      for (const format of OUTPUT_FORMATS) {
        const formatOutputPath = path.join(outputDir, `${fileInfo.name}-${dimension.width}.${format}`);
        
        await sharp(filePath)
          .resize(dimension.width)
          [format]({ 
            quality: qualitySetting,
            effort: 6 // Higher effort for better compression
          })
          .toFile(formatOutputPath);
        
        console.log(`✓ Converted to ${format} (${dimension.width}px): ${formatOutputPath}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error(`✗ Error optimizing ${filePath}:`, error);
    return false;
  }
}

// Handle SVG optimization
const optimizeSvgFiles = () => {
  console.log('🔄 Optimizing SVG files...');
  
  const svgFiles = [];
  PUBLIC_IMAGE_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = glob.sync(`${dir}/**/*.svg`);
      svgFiles.push(...files);
    }
  });
  
  console.log(`Found ${svgFiles.length} SVG files to optimize.`);
  
  // We're not actually optimizing SVGs in this script, but we could add SVGO here
  // For now, just copy them to optimized folder
  svgFiles.forEach(file => {
    const fileInfo = path.parse(file);
    const outputDir = path.join(fileInfo.dir, 'optimized');
    ensureDirectoryExists(outputDir);
    
    const outputPath = path.join(outputDir, fileInfo.base);
    fs.copyFileSync(file, outputPath);
    console.log(`✓ Copied SVG: ${outputPath}`);
  });
}

// Handle favicon optimization
const optimizeFavicon = () => {
  const faviconPath = 'public/favicon.ico';
  
  if (fs.existsSync(faviconPath)) {
    console.log('🔄 Optimizing favicon...');
    
    try {
      // Read the favicon and create WebP versions at different sizes
      const outputDir = path.join('public', 'optimized');
      ensureDirectoryExists(outputDir);
      
      // Create WebP favicon in multiple sizes
      [16, 32, 48, 64].forEach(async (size) => {
        try {
          const outputPath = path.join(outputDir, `favicon-${size}.webp`);
          await sharp(faviconPath)
            .resize(size)
            .webp({ quality: 90 })
            .toFile(outputPath);
            
          console.log(`✓ Created favicon WebP (${size}px): ${outputPath}`);
        } catch (err) {
          console.error(`✗ Error creating favicon WebP (${size}px):`, err);
        }
      });
    } catch (error) {
      console.error('✗ Error optimizing favicon:', error);
    }
  }
}

// Move optimized files to their final destinations
const finalizeOptimization = () => {
  console.log('🔄 Moving optimized files to their final destinations...');
  
  // We could implement a strategy to replace original files with optimized versions
  // For safety, we're leaving this as a separate step that can be implemented later
  console.log('⚠️ Manual step required: Review optimized files and replace originals as needed');
}

// Main function
const optimizeImages = async () => {
  console.log('🖼️  Starting enhanced image optimization process...');
  
  const imageFiles = getImageFiles();
  console.log(`Found ${imageFiles.length} images to optimize.`);
  
  if (imageFiles.length === 0) {
    console.log('No images found. Exiting.');
    return;
  }
  
  let successCount = 0;
  let failureCount = 0;
  
  // Process critical files first
  const criticalFilePaths = imageFiles.filter(file => {
    const fileName = path.basename(file);
    return CRITICAL_FILES.some(criticalFile => fileName.includes(criticalFile));
  });
  
  console.log(`Processing ${criticalFilePaths.length} critical files first...`);
  
  for (const file of criticalFilePaths) {
    console.log(`Processing critical file: ${file}`);
    const success = await optimizeImage(file);
    
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }
  }
  
  // Process remaining files
  const remainingFiles = imageFiles.filter(file => {
    const fileName = path.basename(file);
    return !CRITICAL_FILES.some(criticalFile => fileName.includes(criticalFile));
  });
  
  console.log(`Processing ${remainingFiles.length} remaining files...`);
  
  for (const file of remainingFiles) {
    console.log(`Processing: ${file}`);
    const success = await optimizeImage(file);
    
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }
  }
  
  // Optimize SVG files
  optimizeSvgFiles();
  
  // Optimize favicon
  optimizeFavicon();
  
  // Finalize optimization
  finalizeOptimization();
  
  console.log('\n🎉 Image optimization complete!');
  console.log(`✅ Successfully optimized: ${successCount} images`);
  if (failureCount > 0) {
    console.log(`❌ Failed to optimize: ${failureCount} images`);
  }
  
  // Create a next.config helper output
  console.log('\n📝 Add these to your next.config.js:');
  console.log(`
  images: {
    deviceSizes: [${DIMENSIONS.map(d => d.width).join(', ')}],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },`);
  
  // Output instructions for implementing optimized images
  console.log('\n📋 Implementation Instructions:');
  console.log('1. Review the optimized images in the optimized/ directories');
  console.log('2. Replace any extremely large originals with their optimized versions');
  console.log('3. Use the Next.js Image component with priority for above-the-fold images');
  console.log('4. For critical paths like the founder page, preload the most important images');
  console.log('5. Consider implementing lazy loading for below-the-fold images');
}

// Run the optimization
optimizeImages().catch(error => {
  console.error('Error during optimization process:', error);
  process.exit(1);
}); 