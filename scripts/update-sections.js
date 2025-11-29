const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Directories to scan
const directoriesToScan = [
  'app',
  'components'
];

// Container patterns to look for
const containerPatterns = [
  'container mx-auto px-4',
  'container mx-auto px-',
  'container mx-auto',
  'className="container',
  "className='container"
];

// Function to search for container patterns
function findContainerPatterns() {
  console.log('Scanning project for container patterns...\n');
  
  // Use grep to find patterns (works on Unix-based systems)
  const command = `grep -r "${containerPatterns.join('\\|')}" --include="*.tsx" --include="*.jsx" ${directoriesToScan.join(' ')}`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log('Error scanning files. For Windows users, please use PowerShell and manually search for container classes.');
      return;
    }
    
    // Process results
    const results = stdout.split('\n').filter(line => line.trim() !== '');
    
    if (results.length === 0) {
      console.log('No container patterns found.');
      return;
    }
    
    console.log(`Found ${results.length} potential sections to update:`);
    console.log('--------------------------------------------------------\n');
    
    // Group by file
    const fileMap = {};
    
    results.forEach(result => {
      const [file, ...rest] = result.split(':');
      if (!fileMap[file]) {
        fileMap[file] = [];
      }
      fileMap[file].push(rest.join(':'));
    });
    
    // Display results by file
    Object.keys(fileMap).forEach(file => {
      console.log(`File: ${file}`);
      console.log('--------------------------------------------------------');
      fileMap[file].forEach(line => {
        console.log(`  ${line.trim()}`);
      });
      console.log('');
    });
    
    // Output instructions
    console.log('\nInstructions to update sections:');
    console.log('--------------------------------------------------------');
    console.log('Option 1: Replace container divs with FlexibleSection component:');
    console.log('```jsx');
    console.log('// Before');
    console.log('<section className="py-12">');
    console.log('  <div className="container mx-auto px-4 md:px-6">');
    console.log('    {/* content */}');
    console.log('  </div>');
    console.log('</section>');
    console.log('');
    console.log('// After');
    console.log('import { FlexibleSection } from "@/components/flexible-section"');
    console.log('');
    console.log('<FlexibleSection');
    console.log('  fullWidth={true}');
    console.log('  className="py-12"');
    console.log('>');
    console.log('  {/* content */}');
    console.log('</FlexibleSection>');
    console.log('```');
    console.log('');
    console.log('Option 2: Update existing divs using getContainerClasses:');
    console.log('```jsx');
    console.log('// Before');
    console.log('<div className="container mx-auto px-4 md:px-6">');
    console.log('');
    console.log('// After');
    console.log('import { getContainerClasses } from "@/lib/container-utils"');
    console.log('<div className={getContainerClasses({ fullWidth: true })}>');
    console.log('```');
  });
}

// Run the function
findContainerPatterns(); 