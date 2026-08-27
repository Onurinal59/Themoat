const fs = require('fs');

let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

// Navbar language
content = content.replace(/"Navbar\.language_dil_669": "Language \/ Dil",/g, '"Navbar.language_dil_669": "Language",');
content = content.replace(/"Navbar\.language_dil_669": "Dil: Türkçe \/ English",/g, '"Navbar.language_dil_669": "Dil",');

// Dark/Light
content = content.replace(/"Navbar\.dark_667": "Dark",/g, '"Navbar.dark_667": "Dark",');
content = content.replace(/"Navbar\.dark_667": "Koyu",/g, '"Navbar.dark_667": "Koyu",');
// Let's ensure TR says 'Koyu' - maybe it said 'Dark' somewhere else? Or maybe I should just make sure it's translated properly.

// TR'de `Live Sync` yerine `Canlı Eşzamanlama` kullan.
content = content.replace(/"MoatChecklistSim\.live_sync_26": "Live Sync",/g, '"MoatChecklistSim.live_sync_26": "Canlı Eşzamanlama",');

// Wide Moat, Narrow Moat, Value Destruction, The Value Triad
content = content.replace(/"RoadmapView\.wide_moat_420": "Wide Moat",/g, '"RoadmapView.wide_moat_420": "Geniş Hendek",'); // TR only!
// Need to only replace in TR!
// Let's just do a targeted replace for TR block.
