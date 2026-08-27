const fs = require('fs');
const path = require('path');

const pairs = [];
const regex = /[a-zA-Z_$]\?\s*(["'\`])(.*?)\1\s*:\s*(["'\`])(.*?)\3/g;

function walkDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath);
    } else if (dirPath.endsWith('.js')) {
      let content = fs.readFileSync(dirPath, 'utf-8');
      let match;
      while ((match = regex.exec(content)) !== null) {
        let enText = match[2];
        let trText = match[4];
        if (enText && trText && enText !== trText) {
          pairs.push({ en: enText, tr: trText });
        }
      }
    }
  });
}

walkDir('./dist/assets');
fs.writeFileSync('extracted_pairs.json', JSON.stringify(pairs, null, 2));
console.log("Extracted pairs:", pairs.length);
