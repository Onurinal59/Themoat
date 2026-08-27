const fs = require('fs');

const enDict = JSON.parse(fs.readFileSync('en_reconstructed.json', 'utf-8'));
const trDict = JSON.parse(fs.readFileSync('tr_reconstructed.json', 'utf-8'));

let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

// Find the UI_TRANSLATIONS block
// We can just replace the whole UI_TRANSLATIONS definition
const regex = /const UI_TRANSLATIONS[^=]*=\s*\{[\s\S]*?\};\n/m;
const match = regex.exec(content);

if (match) {
  // Let's create the new one
  let newObj = {
    en: enDict,
    tr: trDict
  };
  
  // Wait, I should also keep the old keys from tr. Let's extract them.
  // Actually, I can just evaluate the old code to get it, or just ignore it if it's already covered.
  // Wait, the old keys are like "nav.academy". The components STILL use "nav.academy" if they weren't matched.
  // Wait, did my regex replace "nav.academy"? No, because `isEnglish ? "xxx" : "yyy"` was replaced, but `t("nav.academy", isEnglish ? ...)` was already using `t`.
  // Wait, my regex matched `isEnglish ? ... : ...`. So `t("nav.academy", isEnglish ? "Academy" : "Akademi")` became `t("nav.academy", t("Component.slug_key"))` which is a bit weird.
  
  let replacement = `const UI_TRANSLATIONS: Record<Language, Record<string, string>> = ${JSON.stringify(newObj, null, 2)};\n`;
  content = content.replace(match[0], replacement);
  fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
  console.log("Injected translations into LanguageContext!");
} else {
  console.log("Could not find UI_TRANSLATIONS block.");
}
