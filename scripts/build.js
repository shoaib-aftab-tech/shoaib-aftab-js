const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const srcDir = path.join(__dirname, '../src');
const modulesDir = path.join(srcDir, 'modules');
const distDir = path.join(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

async function build() {
  let combinedJS = `/* Shoaib Aftab JS Framework v1.0.0 */\n\n`;
  combinedJS += `var SA = (function() {\n`;
  combinedJS += `  var _SA = {};\n\n`; // change internal name to avoid redeclaration with SA

  const moduleFiles = fs.readdirSync(modulesDir).filter(f => f.endsWith('.js'));
  for (const file of moduleFiles) {
    const content = fs.readFileSync(path.join(modulesDir, file), 'utf8');
    const stripped = content
      .replace(/import[\s\S]*?from[\s\S]*?;/g, '')
      .replace(/export\s+default[\s\S]*?;/g, '')
      .replace(/export\s+const\s+/g, 'const ')
      .replace(/export\s+function\s+/g, 'function ')
      .replace(/export\s+{[\s\S]*?};?/g, '')
      .replace(/export\s+/g, '');
    combinedJS += `  // --- ${file} ---\n` + stripped + `\n\n`;
  }
  
  const indexContent = fs.readFileSync(path.join(srcDir, 'index.js'), 'utf8')
    .replace(/import[\s\S]*?from[\s\S]*?;/g, '')
    .replace(/export\s+default[\s\S]*?;/g, '')
    .replace(/export\s+{[\s\S]*?};?/g, '')
    .replace(/const SA =/g, '_SA =');
    
  combinedJS += indexContent;
  combinedJS += `\n  return _SA;\n})();\n`;
  combinedJS += `if (typeof window !== 'undefined') { window.SA = SA; }\n`;

  fs.writeFileSync(path.join(distDir, 'shoaib-aftab.js'), combinedJS);

  try {
    const minified = await minify(combinedJS, { compress: true, mangle: true });
    fs.writeFileSync(path.join(distDir, 'shoaib-aftab.min.js'), minified.code);
    console.log('JS Build completed successfully!');
  } catch (error) {
    console.error('Error minifying JS:', error);
  }
}

build();
