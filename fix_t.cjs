const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath);
    } else if (dirPath.endsWith('.tsx')) {
      let content = fs.readFileSync(dirPath, 'utf-8');
      if (content.includes('const { isEnglish } = useLanguage();')) {
        content = content.replace('const { isEnglish } = useLanguage();', 'const { isEnglish, t } = useLanguage();');
        fs.writeFileSync(dirPath, content, 'utf-8');
      }
      if (content.includes('const { getFormulaGuides, isEnglish } = useLanguage();')) {
        content = content.replace('const { getFormulaGuides, isEnglish } = useLanguage();', 'const { getFormulaGuides, isEnglish, t } = useLanguage();');
        fs.writeFileSync(dirPath, content, 'utf-8');
      }
      // Any other variation?
      if (content.includes('useLanguage();') && !content.includes('t } = useLanguage();') && !content.includes('t, ') && !content.includes(', t }')) {
        content = content.replace(/const\s+\{\s*([^}]+)\s*\}\s*=\s*useLanguage\(\);/g, 'const { $1, t, formatCurrency, formatPercent, formatNumber } = useLanguage();');
        fs.writeFileSync(dirPath, content, 'utf-8');
      }
    }
  });
}

walkDir('./src');
console.log("Fixed missing 't' destructurings!");
