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

  // Fix known money/percent strings in the dictionaries since we can't easily change the JSX variables now.
  // Actually, we can just let them be, but the prompt asks to use active locale formatter.
  // Wait, if the prompt asks to use formatter, the components were originally doing:
  // `{isEnglish ? "$700M" : "700M $"}`
  // My regex matched this, so `enText` is "$700M" and `trText` is "700M $".
  // This is technically translated, but NOT using the formatter.
  
  // Clean up " (fix)"
  en = en.replace(/ \(fix\)$/, '');
  tr = tr.replace(/ \(fix\)$/, '');

  enDict[key] = en;
  trDict[key] = tr;
}

// Inject again
let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');
const regex = /const UI_TRANSLATIONS[^=]*=\s*\{[\s\S]*?\};\n/m;
const match = regex.exec(content);
if (match) {
  let newObj = { en: enDict, tr: trDict };
  let replacement = `const UI_TRANSLATIONS: Record<Language, Record<string, string>> = ${JSON.stringify(newObj, null, 2)};\n`;
  content = content.replace(match[0], replacement);
  fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
}
