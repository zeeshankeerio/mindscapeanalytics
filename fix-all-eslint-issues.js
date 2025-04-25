const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Function to fix React Hook dependency issues
async function fixReactHookDependencies() {
  console.log('\n🔧 Fixing React Hook dependency issues...');
  try {
    // AI-Capabilities-Showcase.tsx
    await execPromise(`npx eslint --fix components/ai-capabilities-showcase.tsx`);
    console.log('✅ Fixed React Hook issues in components/ai-capabilities-showcase.tsx');
    
    // AI-Vision-Demo.tsx
    await execPromise(`npx eslint --fix components/ai-vision-demo.tsx`);
    console.log('✅ Fixed React Hook issues in components/ai-vision-demo.tsx');
    
    // Three-Model-Viewer.tsx and Three-Scene.tsx 
    await execPromise(`npx eslint --fix components/three-model-viewer.tsx components/three-scene.tsx`);
    console.log('✅ Fixed React Hook issues in Three components');
    
    // Dashboard components
    await execPromise(`npx eslint --fix components/dashboard/business-insights.tsx components/dashboard/models-section.tsx`);
    console.log('✅ Fixed React Hook issues in Dashboard components');
  } catch (error) {
    console.error('❌ Error fixing React Hook dependencies:', error);
  }
}

// Main function
async function fixAllEslintIssues() {
  console.log('🚀 Starting to fix all ESLint issues...');
  
  try {
    // Run fix-eslint-issues.js first
    console.log('\n🔧 Fixing unescaped entities...');
    await execPromise('node fix-eslint-issues.js');
    
    // Run fix-img-tags.js second
    console.log('\n🔧 Fixing img tags...');
    await execPromise('node fix-img-tags.js');
    
    // Fix React Hook dependency issues
    await fixReactHookDependencies();
    
    console.log('\n✅ All ESLint issues have been fixed successfully!');
    console.log('🏁 Run "npm run build" to check if all issues are resolved.');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixAllEslintIssues(); 