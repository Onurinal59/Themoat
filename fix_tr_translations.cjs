const fs = require('fs');

let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

// Find the TR block index
const trStart = content.indexOf('"tr": {');

if (trStart !== -1) {
  let trBlock = content.slice(trStart);
  let enBlock = content.slice(0, trStart);
  
  // Replace in TR block
  trBlock = trBlock.replace(/"Navbar\.language_dil_669": ".*",/, '"Navbar.language_dil_669": "DİL",');
  trBlock = trBlock.replace(/"Navbar\.dark_667": ".*",/, '"Navbar.dark_667": "Koyu",');
  trBlock = trBlock.replace(/"Navbar\.light_668": ".*",/, '"Navbar.light_668": "Açık",');
  trBlock = trBlock.replace(/"Navbar\.switch_to_dark_theme_666": ".*",/, '"Navbar.switch_to_dark_theme_666": "Koyu Temaya Geç",');
  
  trBlock = trBlock.replace(/"MoatChecklistSim\.live_sync_26": ".*",/, '"MoatChecklistSim.live_sync_26": "Canlı Eşzamanlama",');
  
  // Wide Moat, Narrow Moat, Value Destruction, The Value Triad in Roadmap? 
  // Wait, let's just replace the exact text if it exists
  trBlock = trBlock.replace(/"(.*)Wide Moat(.*)": "(.*)",/g, '"$1Wide Moat$2": "Geniş Hendek",');
  trBlock = trBlock.replace(/"(.*)Narrow Moat(.*)": "(.*)",/g, '"$1Narrow Moat$2": "Dar Hendek",');
  trBlock = trBlock.replace(/"(.*)Value Destruction(.*)": "(.*)",/g, '"$1Value Destruction$2": "Değer Yıkımı",');
  trBlock = trBlock.replace(/"(.*)The Value Triad(.*)": "(.*)",/g, '"$1The Value Triad$2": "Değer Üçlemesi",');

  // Replace in EN block
  enBlock = enBlock.replace(/"Navbar\.language_dil_669": ".*",/, '"Navbar.language_dil_669": "LANGUAGE",');
  enBlock = enBlock.replace(/"(.*)Wide Moat(.*)": "Wide Moat \/ Geniş Hendek",/g, '"$1Wide Moat$2": "Wide Moat",');
  enBlock = enBlock.replace(/"(.*)Narrow Moat(.*)": "Narrow Moat \/ Dar Hendek",/g, '"$1Narrow Moat$2": "Narrow Moat",');
  
  content = enBlock + trBlock;
  fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
}
