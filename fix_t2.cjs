const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath);
    } else if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
      let content = fs.readFileSync(dirPath, 'utf-8');
      
      // If it uses t( but doesn't have t defined
      if (content.includes('t("') && !content.includes('const {') && !content.includes(' t,') && !content.includes(' t }') && !content.includes(' t } =')) {
        // Just inject useLanguage if missing
        if (!content.includes('useLanguage')) {
          content = "import { useLanguage } from '../context/LanguageContext';\n" + content;
        }
      }
      
      // Specifically fix the ones mentioned
      if (content.match(/const\s+\{\s*isEnglish\s*\}\s*=\s*useLanguage\(\);/)) {
        content = content.replace(/const\s+\{\s*isEnglish\s*\}\s*=\s*useLanguage\(\);/g, 'const { isEnglish, t } = useLanguage();');
      }

      fs.writeFileSync(dirPath, content, 'utf-8');
    }
  });
}
walkDir('./src/components');
console.log("Fixed missing t");
