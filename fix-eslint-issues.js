const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const filesToFix = [
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

async function fixUnescapedEntities() {
  console.log('Starting to fix unescaped entities in files...');
  
  for (const file of filesToFix) {
    try {
      const filePath = path.join(process.cwd(), file);
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
      } else {
        console.log(`⏭️ No changes needed for ${file}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
  
  console.log('Completed fixing unescaped entities.');
}

fixUnescapedEntities().catch(console.error); 