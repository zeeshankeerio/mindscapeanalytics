const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function fixStringLiterals() {
  console.log('Starting to fix string literals...');
  
  try {
    // Get all TypeScript and JavaScript files
    const files = glob.sync('**/*.{tsx,jsx,ts,js}', {
      ignore: ['node_modules/**', '.next/**', 'fix-*.js']
    });
    
    let fixedCount = 0;
    
    for (const file of files) {
      try {
        const filePath = path.join(process.cwd(), file);
        let content = await readFile(filePath, 'utf8');
        
        // Save original content to check for changes
        const originalContent = content;
        
        // Revert all string literal replacements
        // This is a more aggressive approach but needed to fix the syntax errors
        
        content = content
          // Fix &quot; back to "
          .replace(/&quot;/g, '"')
          // Fix &apos; back to '
          .replace(/&apos;/g, "'");
        
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
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixStringLiterals().catch(console.error); 