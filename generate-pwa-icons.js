const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Source icon
const sourceIcon = path.join(__dirname, 'public', 'icon.png');

// Ensure the icons directory exists
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Define icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Generate each icon size
async function generateIcons() {
  try {
    for (const size of sizes) {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
      await sharp(sourceIcon)
        .resize(size, size)
        .toFile(outputPath);
      console.log(`Generated icon: ${outputPath}`);
    }
    console.log('All PWA icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 