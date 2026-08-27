const fs = require('fs');
let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

const oldInit = `  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("economicMoatLocale");
    if (saved === "tr" || saved === "en") return saved;
    if (typeof navigator !== "undefined" && navigator.language.startsWith("tr")) return "tr";
    return "en";
  });`;

const newInit = `  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("economicMoatLocale");
    if (saved === "tr" || saved === "en") return saved;
    if (typeof navigator !== "undefined") {
      const langs = navigator.languages || [navigator.language];
      for (const l of langs) {
        if (l && l.toLowerCase().startsWith("tr")) return "tr";
      }
    }
    return "en";
  });`;

if (content.includes(oldInit)) {
    content = content.replace(oldInit, newInit);
    fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
    console.log("Success");
} else {
    console.log("oldInit not found exactly.");
}
