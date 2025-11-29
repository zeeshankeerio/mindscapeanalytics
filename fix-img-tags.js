const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const filesToFix = [
  'app/blog/page.tsx',
  'app/careers/page.tsx',
  'app/case-studies/page.tsx',
  'app/pricing/page.tsx',
  'app/solutions/cloud/page.tsx',
  'app/solutions/enterprise/page.tsx',
  'app/solutions/genai/page.tsx',
  'app/solutions/industry/page.tsx',
  'components/ai-capabilities-showcase.tsx',
  'components/ai-demo.tsx',
  'components/ai-platform-demo.tsx',
  'components/ai-vision-demo.tsx',
  'components/cv-model-demo.tsx',
  'components/dashboard/projects-section.tsx',
  'components/enhanced-cv-model-demo.tsx',
  'components/feature-showcase.tsx',
  'components/industry-use-cases.tsx',
  'components/main-navigation.tsx',
  'components/partner-ecosystem.tsx'
];

async function fixImgTags() {
  console.log('Starting to fix img tags in files...');
  
  for (const file of filesToFix) {
    try {
      const filePath = path.join(process.cwd(), file);
      const content = await readFile(filePath, 'utf8');
      
      let fixedContent = content;
      
      // Check if file already imports Image from next/image
      const hasImageImport = /import\s+(?:Image|\{\s*.*?Image.*?\s*\})\s+from\s+['"]next\/image['"]/g.test(content);
      
      // Check if file contains img tags
      const hasImgTag = /<img\s+/g.test(content);
      
      if (hasImgTag && !hasImageImport) {
        // Add import statement for Image from next/image at the top of the imports
        fixedContent = fixedContent.replace(
          /(import\s+.*?from\s+['"].*?['"]\s*;?\n|["']use client["'];\s*\n)/,
          `$1import Image from "next/image";\n`
        );
      }
      
      // Replace img tags with Image components
      // This is a simplified version and might need adjustments based on the actual HTML structure
      fixedContent = fixedContent.replace(
        /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/g,
        (match, before, src, after) => {
          // Extract alt text if it exists
          const altMatch = (before + after).match(/alt=["']([^"']*)["']/);
          const alt = altMatch ? altMatch[1] : 'image';
          
          // Check if width and height are already specified
          const hasWidth = (before + after).includes('width=');
          const hasHeight = (before + after).includes('height=');
          
          // Create Image component props
          let props = `src="${src}" alt="${alt}"`;
          if (!hasWidth) props += ' width={500}';
          if (!hasHeight) props += ' height={300}';
          
          // Preserve other attributes like className
          (before + after).replace(/(\w+)=["']([^"']*)["']/g, (attrMatch, name, value) => {
            if (name !== 'src' && name !== 'alt' && name !== 'width' && name !== 'height') {
              props += ` ${name}="${value}"`;
            }
            return '';
          });
          
          return `<Image ${props} />`;
        }
      );
      
      if (content !== fixedContent) {
        await writeFile(filePath, fixedContent, 'utf8');
        console.log(`✅ Fixed img tags in ${file}`);
      } else {
        console.log(`⏭️ No changes needed for ${file}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
  
  console.log('Completed fixing img tags.');
}

fixImgTags().catch(console.error); 