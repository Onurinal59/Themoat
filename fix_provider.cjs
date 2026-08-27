const fs = require('fs');
let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

const providerCode = `
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("economicMoatLocale");
    if (saved === "tr" || saved === "en") return saved;
    if (typeof navigator !== "undefined" && navigator.language.startsWith("tr")) return "tr";
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("economicMoatLocale", lang);
  };
`;

content = content.replace('const toggleLanguage = () => {', providerCode + '\n  const toggleLanguage = () => {');
fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
console.log("Restored LanguageProvider");
