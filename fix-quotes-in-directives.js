const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function fixQuotesInDirectives() {
  console.log('Starting to fix quotes in use client directives...');
  
  try {
    // Get all TypeScript and JavaScript files
    const files = glob.sync('**/*.{tsx,jsx,ts,js}', {
      ignore: ['node_modules/**', '.next/**', 'fix-*.js']
    });
    
    let fixedCount = 0;
    
    for (const file of files) {
      try {
        const filePath = path.join(process.cwd(), file);
        const content = await readFile(filePath, 'utf8');
        
        // Fix "use client" directive
        let fixedContent = content.replace(/&quot;use client&quot;/, '"use client"');
        
        // Fix import statements
        fixedContent = fixedContent.replace(/from &quot;([^&]+)&quot;/g, 'from "$1"');
        fixedContent = fixedContent.replace(/import &quot;([^&]+)&quot;/g, 'import "$1"');
        
        if (content !== fixedContent) {
          await writeFile(filePath, fixedContent, 'utf8');
          console.log(`✅ Fixed quotes in ${file}`);
          fixedCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    }
    
    console.log(`Completed fixing quotes in ${fixedCount} files.`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixQuotesInDirectives().catch(console.error); 