const fs = require('fs');

let lang = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

const trStart = lang.indexOf('"tr": {');
let enBlock = lang.slice(0, trStart);
let trBlock = lang.slice(trStart);

trBlock = trBlock.replace(/"footer\.desc": "[^"]+",/g, '"footer.desc": "Michael J. Mauboussin ve Dan Callahan\'ın metodolojilerini temel alan interaktif strateji, ROIC röntgeni ve rekabet avantajı simülasyon platformu.",');
trBlock = trBlock.replace(/"footer\.tagline": "[^"]+",/g, '"footer.tagline": "Sürdürülebilir Rekabet Avantajı & Kurumsal Değerleme Rehberi",');

lang = enBlock + trBlock;
fs.writeFileSync('src/context/LanguageContext.tsx', lang, 'utf-8');
