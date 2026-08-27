const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
        callback(dirPath);
      }
    }
  });
}

const enDict = {};
const trDict = {};

// We will generate keys like "Component.someText"
let keyId = 0;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 20).replace(/^_|_$/g, '');
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let componentName = path.basename(filePath, path.extname(filePath));
  
  let modified = false;

  // Regex to match: isEnglish ? "..." : "..."
  // It handles single/double quotes and template literals (without internal variables for simplicity)
  // We use a regex that balances quotes
  const regex = /isEnglish\s*\?\s*(["'\`])(.*?)\1\s*:\s*(["'\`])(.*?)\3/gs;

  content = content.replace(regex, (match, q1, enText, q2, trText) => {
    // If it has internal interpolation ${}, skip or handle carefully
    if (enText.includes('${') || trText.includes('${')) {
      return match;
    }
    
    let slug = slugify(enText) || 'text';
    keyId++;
    let key = `${componentName}.${slug}_${keyId}`;
    
    enDict[key] = enText;
    trDict[key] = trText;
    
    modified = true;
    
    // We replace it with t("key")
    return `t("${key}")`;
  });

  if (modified) {
    // Ensure `t` is destructured if `isEnglish` is destructured
    if (content.includes('isEnglish') && !content.includes(' t ') && !content.includes(', t') && !content.includes(' t,')) {
      content = content.replace('isEnglish', 'isEnglish, t');
    }
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

walkDir('./src/components', processFile);

if (fs.existsSync('./src/App.tsx')) processFile('./src/App.tsx');

fs.writeFileSync('en_extracted.json', JSON.stringify(enDict, null, 2));
fs.writeFileSync('tr_extracted.json', JSON.stringify(trDict, null, 2));
console.log("Extraction complete!");
