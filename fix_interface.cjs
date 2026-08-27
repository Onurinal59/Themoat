const fs = require('fs');

let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

// Find the second interface LanguageContextType
const match = content.match(/interface LanguageContextType \{[\s\S]*?const UI_TRANSLATIONS/);
if (match) {
  content = content.replace(match[0], 'const UI_TRANSLATIONS');
  fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
  console.log("Removed duplicate interface");
}
