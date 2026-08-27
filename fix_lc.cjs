const fs = require('fs');
let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

if (!content.includes('const LanguageContext = createContext')) {
  content = content.replace('const UI_TRANSLATIONS', 'export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);\n\nconst UI_TRANSLATIONS');
  fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
}
