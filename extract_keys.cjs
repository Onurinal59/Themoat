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

const keys = [];
const regex = /t\("([^"]+)"\)/g;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys.push(match[1]);
  }
}

walkDir('./src/components', processFile);
if (fs.existsSync('./src/App.tsx')) processFile('./src/App.tsx');

fs.writeFileSync('all_keys.json', JSON.stringify([...new Set(keys)], null, 2));
console.log("Total unique keys:", new Set(keys).size);
