#!/usr/bin/env node

/**
 * Container Search Script
 * 
 * This script identifies all occurrences of standard container classes in the codebase
 * that should be migrated to use getContainerClasses or FlexibleSection.
 * 
 * Usage:
 * 1. Run: node scripts/find-container-classes.js
 * 2. The script will output all files and line numbers where container classes are used
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ASCII art banner
console.log(`
╔════════════════════════════════════════════════════╗
║ MINDSCAPE ANALYTICS - CONTAINER MIGRATION SCANNER  ║
╚════════════════════════════════════════════════════╝
`);

console.log('Searching for container class patterns to migrate...\n');

try {
  // Find all occurrences of container classes
  const containerResults = execSync(
    'grep -r "container mx-auto" --include="*.tsx" --include="*.jsx" --include="*.js" .',
    { encoding: 'utf-8' }
  );
  
  // Find all occurrences of px-4 md:px-6 pattern (common with containers)
  const paddingResults = execSync(
    'grep -r "px-4 md:px-6" --include="*.tsx" --include="*.jsx" --include="*.js" .',
    { encoding: 'utf-8' }
  );

  // Process and deduplicate results
  const allResults = processResults([containerResults, paddingResults]);
  
  // Print findings
  if (allResults.length > 0) {
    console.log(`Found ${allResults.length} potential container patterns to migrate:\n`);
    
    allResults.forEach((result, index) => {
      console.log(`${index + 1}. ${result.file}:${result.line}`);
      console.log(`   ${result.content.trim()}`);
      console.log('');
    });
    
    console.log('\nMigration Options:');
    console.log('1. Use FlexibleSection component (recommended):');
    console.log('   import { FlexibleSection } from "@/components/flexible-section"');
    console.log('   <FlexibleSection fullWidth={true} className="...">');
    console.log('     {/* content */}');
    console.log('   </FlexibleSection>');
    console.log('');
    console.log('2. Use getContainerClasses utility:');
    console.log('   import { getContainerClasses } from "@/lib/container-utils"');
    console.log('   <div className={getContainerClasses({ fullWidth: true })}>');
    console.log('     {/* content */}');
    console.log('   </div>');
    console.log('');
    console.log('See docs/layout-migration.md for more details.');
  } else {
    console.log('No container patterns found! All components might already be migrated.');
  }
} catch (error) {
  console.error('Error searching for container patterns:', error.message);
  
  // Windows-specific fallback
  if (process.platform === 'win32') {
    console.log('\nFallback for Windows: Please use PowerShell and run:');
    console.log('Get-ChildItem -Recurse -Include *.tsx,*.jsx,*.js | Select-String -Pattern "container mx-auto" | Format-Table Path,LineNumber,Line -AutoSize');
    console.log('\nOr use the update-all-sections.js script for guidance on manual migration.');
  }
}

/**
 * Process and deduplicate grep results
 */
function processResults(resultsArray) {
  const processedResults = [];
  const seen = new Set();
  
  resultsArray.forEach(results => {
    if (!results || results.trim() === '') return;
    
    const lines = results.split('\n');
    lines.forEach(line => {
      if (!line || line.trim() === '') return;
      
      // Parse file and line information
      const match = line.match(/^([^:]+):(\d+):(.*)/);
      if (match) {
        const [_, file, lineNum, content] = match;
        
        // Skip node_modules and certain directories
        if (file.includes('node_modules') || 
            file.includes('.next') || 
            file.includes('.git') ||
            file.includes('scripts/find-container-classes.js')) {
          return;
        }
        
        const key = `${file}:${lineNum}`;
        if (!seen.has(key)) {
          seen.add(key);
          processedResults.push({
            file,
            line: lineNum,
            content
          });
        }
      }
    });
  });
  
  return processedResults;
} 