const fs = require('fs');

const enDict = JSON.parse(fs.readFileSync('en_reconstructed.json', 'utf-8'));
const trDict = JSON.parse(fs.readFileSync('tr_reconstructed.json', 'utf-8'));

for (let key in enDict) {
  let en = enDict[key];
  let tr = trDict[key];
  
  if (en.includes('Wide Moat')) en = en.replace(/Geniş Hendek\s*\(Wide\)/g, 'Wide Moat');
  if (en.includes('Narrow Moat')) en = en.replace(/Dar Hendek\s*\(Narrow\)/g, 'Narrow Moat');
  if (en.includes('Geniş Hendek (Wide)')) en = en.replace(/Geniş Hendek \(Wide\)/g, 'Wide Moat');
  if (en.includes('Dar Hendek (Narrow)')) en = en.replace(/Dar Hendek \(Narrow\)/g, 'Narrow Moat');

  if (tr.includes('Geniş Hendek (Wide)')) tr = tr.replace(/Geniş Hendek \(Wide\)/g, 'Geniş Hendek');
  if (tr.includes('Dar Hendek (Narrow)')) tr = tr.replace(/Dar Hendek \(Narrow\)/g, 'Dar Hendek');

  en = en.replace(/ \(fix\)$/, '');
  tr = tr.replace(/ \(fix\)$/, '');

  enDict[key] = en;
  trDict[key] = tr;
}

let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

// The file is corrupted. We need to find the start of UI_TRANSLATIONS and the start of toggleLanguage
const startIndex = content.indexOf('const UI_TRANSLATIONS');
const endIndex = content.indexOf('const toggleLanguage = () => {');

if (startIndex > -1 && endIndex > -1) {
  let newObj = { en: enDict, tr: trDict };
  let replacement = `const UI_TRANSLATIONS: Record<Language, Record<string, string>> = ${JSON.stringify(newObj, null, 2)};\n\n  `;
  content = content.slice(0, startIndex) + replacement + content.slice(endIndex);
  fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
  console.log("Fixed replace issue!");
} else {
  console.log("Could not find boundaries.");
}
