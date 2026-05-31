const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const modulesDir = path.join(srcDir, 'modules');
const distDir = path.join(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Custom Native JS Minifier (Zero Dependencies)
function minifyJS(code) {
  // A basic regex minifier. Caution: Not a full AST parser, 
  // but sufficient for our zero-dependency standard.
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\/\/.*$/gm, '')         // Remove single-line comments
    .replace(/[\n\r\t]/g, '')         // Remove newlines and tabs
    .replace(/\s{2,}/g, ' ')          // Remove multiple spaces
    .trim();
}

async function build() {
  let combinedJS = `/* Shoaib Aftab JS Framework v2.0.0 */\n\n`;
  combinedJS += `var SA = (function() {\n`;
  combinedJS += `  var _SA = {};\n\n`;

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
    const minified = minifyJS(combinedJS);
    fs.writeFileSync(path.join(distDir, 'shoaib-aftab.min.js'), `/* Shoaib Aftab JS Framework v2.0.0 | MIT License */\n` + minified);
    console.log('JS Build completed successfully with native minifier!');
  } catch (error) {
    console.error('Error minifying JS:', error);
  }
}

build();
