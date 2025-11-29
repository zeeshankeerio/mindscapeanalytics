const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const PUBLIC_DIR = 'public';
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const PLACEHOLDER_NAME = 'placeholder.jpg';
const WIDTH = 800;
const HEIGHT = 600;
const BACKGROUND_COLOR = '#f0f0f0';
const TEXT = 'Image Not Found';
const TEXT_COLOR = '#666666';
const FONT_SIZE = 40;

// Check if images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  console.log(`Creating images directory: ${IMAGES_DIR}`);
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Path to the placeholder image
const placeholderPath = path.join(IMAGES_DIR, PLACEHOLDER_NAME);

// Create an SVG with text
const createSvgWithText = (width, height, backgroundColor, text, textColor, fontSize) => {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="${fontSize}px" 
        fill="${textColor}" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `);
};

// Generate the placeholder image
const generatePlaceholder = async () => {
  try {
    const svg = createSvgWithText(WIDTH, HEIGHT, BACKGROUND_COLOR, TEXT, TEXT_COLOR, FONT_SIZE);
    
    await sharp(svg)
      .jpeg({
        quality: 90,
        chromaSubsampling: '4:4:4'
      })
      .toFile(placeholderPath);
    
    console.log(`✅ Placeholder image created at: ${placeholderPath}`);
    
    // Also create a WebP version for better performance
    const webpPath = placeholderPath.replace('.jpg', '.webp');
    await sharp(svg)
      .webp({
        quality: 90
      })
      .toFile(webpPath);
    
    console.log(`✅ WebP placeholder image created at: ${webpPath}`);
    
  } catch (error) {
    console.error('Error generating placeholder image:', error);
  }
};

// Run the script
generatePlaceholder(); 