const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { promisify } = require('util');
const { exec } = require('child_process');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const execPromise = promisify(exec);

// List of files to check for unescaped entities
const filesWithEntities = [
  'app/about/page.tsx',
  'app/careers/page.tsx',
  'app/contact/page.tsx',
  'app/dashboard/docs/page.tsx',
  'app/docs/api/page.tsx',
  'app/docs/page.tsx',
  'app/founder/page.tsx',
  'app/pricing/page.tsx',
  'app/services/[service]/page.tsx',
  'app/solutions/cloud/page.tsx',
  'app/solutions/genai/page.tsx',
  'app/solutions/industry/page.tsx',
  'components/case-studies-section.tsx',
  'components/case-studies.tsx',
  'components/cookie-consent.tsx',
  'components/dashboard/models-section.tsx',
  'components/enhanced-cta-section.tsx',
  'components/enhanced-industry-solutions.backup.tsx',
  'components/enhanced-industry-solutions.new.tsx',
  'components/enhanced-industry-solutions.tsx',
  'components/smart-contract-builder.tsx',
  'components/ai-platform-demo.tsx'
];

// List of files to check for img tags
const filesWithImgTags = [
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

// Components with React Hook issues
const reactHookFiles = [
  'components/ai-capabilities-showcase.tsx',
  'components/ai-vision-demo.tsx',
  'components/three-model-viewer.tsx',
  'components/three-scene.tsx',
  'components/dashboard/business-insights.tsx',
  'components/dashboard/models-section.tsx'
];

async function fixUnescapedEntities() {
  console.log('\n🔧 Starting to fix unescaped entities in files...');
  let fixedCount = 0;
  
  for (const file of filesWithEntities) {
    try {
      const filePath = path.join(process.cwd(), file);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️ File not found: ${file}, skipping...`);
        continue;
      }
      
      const content = await readFile(filePath, 'utf8');
      
      // Replace unescaped single quotes with &apos;
      // This regex looks for single quotes that aren't in HTML attributes or JSX properties
      let fixedContent = content.replace(/(?<!(=|:)\s*['"].*)'(?!.*['"](\s+|\s*>))/g, '&apos;');
      
      // Replace unescaped double quotes with &quot;
      // This regex looks for double quotes that aren't in HTML attributes or JSX properties
      fixedContent = fixedContent.replace(/(?<!(=|:)\s*['"}.])"/g, '&quot;');
      
      if (content !== fixedContent) {
        await writeFile(filePath, fixedContent, 'utf8');
        console.log(`✅ Fixed unescaped entities in ${file}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
  
  console.log(`Completed fixing unescaped entities in ${fixedCount} files.`);
  return fixedCount;
}

async function fixImgTags() {
  console.log('\n🔧 Starting to fix img tags in files...');
  let fixedCount = 0;
  
  for (const file of filesWithImgTags) {
    try {
      const filePath = path.join(process.cwd(), file);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️ File not found: ${file}, skipping...`);
        continue;
      }
      
      const content = await readFile(filePath, 'utf8');
      
      // Check if file already imports Image from next/image
      const hasImageImport = /import\s+(?:Image|\{\s*.*?Image.*?\s*\})\s+from\s+['"]next\/image['"]/g.test(content);
      
      // Check if file contains img tags
      const hasImgTag = /<img\s+/g.test(content);
      
      if (!hasImgTag) {
        continue;
      }
      
      let fixedContent = content;
      
      if (!hasImageImport) {
        // Add import statement for Image from next/image at the top of the imports
        fixedContent = fixedContent.replace(
          /(import\s+.*?from\s+['"].*?['"]\s*;?\n|["']use client["'];\s*\n)/,
          `$1import Image from "next/image";\n`
        );
      }
      
      // Replace img tags with Image components - more carefully
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
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
  
  console.log(`Completed fixing img tags in ${fixedCount} files.`);
  return fixedCount;
}

async function fixReactHookDependencies() {
  console.log('\n🔧 Fixing React Hook dependency issues...');
  let fixedCount = 0;
  
  for (const file of reactHookFiles) {
    try {
      const filePath = path.join(process.cwd(), file);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️ File not found: ${file}, skipping...`);
        continue;
      }
      
      await execPromise(`npx eslint --fix ${filePath}`);
      console.log(`✅ Fixed React Hook issues in ${file}`);
      fixedCount++;
    } catch (error) {
      console.error(`❌ Error fixing React Hook dependencies in ${file}:`, error);
    }
  }
  
  console.log(`Completed fixing React Hook dependencies in ${fixedCount} files.`);
  return fixedCount;
}

async function fixStringLiterals() {
  console.log('\n🔧 Starting to fix string literals...');
  let fixedCount = 0;
  
  // Get all TypeScript and JavaScript files that had issues fixed
  const filesToCheck = [...new Set([...filesWithEntities, ...filesWithImgTags, ...reactHookFiles])];
  
  for (const file of filesToCheck) {
    try {
      const filePath = path.join(process.cwd(), file);
      
      if (!fs.existsSync(filePath)) {
        continue;
      }
      
      let content = await readFile(filePath, 'utf8');
      const originalContent = content;
      
      // Fix common issues with string literals
      content = content
        // Fix "use client" directive if it was messed up
        .replace(/&quot;use client&quot;/, '"use client"')
        // Fix import statements
        .replace(/from &quot;([^&]+)&quot;/g, 'from "$1"')
        .replace(/import &quot;([^&]+)&quot;/g, 'import "$1"');
      
      if (content !== originalContent) {
        await writeFile(filePath, content, 'utf8');
        console.log(`✅ Fixed string literals in ${file}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
  
  console.log(`Completed fixing string literals in ${fixedCount} files.`);
  return fixedCount;
}

// Main function to run all fixes
async function fixAllIssues() {
  console.log('🚀 Starting to fix all issues...');
  
  try {
    const entitiesFixed = await fixUnescapedEntities();
    const imgTagsFixed = await fixImgTags();
    const hookDepsFixed = await fixReactHookDependencies();
    const stringLiteralsFixed = await fixStringLiterals();
    
    console.log('\n✅ Summary of fixes:');
    console.log(`- Fixed unescaped entities in ${entitiesFixed} files`);
    console.log(`- Fixed img tags in ${imgTagsFixed} files`);
    console.log(`- Fixed React Hook dependencies in ${hookDepsFixed} files`);
    console.log(`- Fixed string literals in ${stringLiteralsFixed} files`);
    
    console.log('\n🏁 All issues have been fixed! Run "npm run lint" to verify.');
  } catch (error) {
    console.error('\n❌ Error fixing issues:', error);
  }
}

// Run all fixes
fixAllIssues().catch(console.error); 