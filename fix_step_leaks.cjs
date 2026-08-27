const fs = require('fs');

let nav = fs.readFileSync('src/components/MobileBottomNav.tsx', 'utf-8');
nav = nav.replace(/Adım 0\$\{(.+?)\} Önizle/g, 'Adım 0${$1}\'ü Önizle');
fs.writeFileSync('src/components/MobileBottomNav.tsx', nav, 'utf-8');

let mod = fs.readFileSync('src/components/ModuleReader.tsx', 'utf-8');
mod = mod.replace(/Step 0\$\{(.+?)\} quizini geç\./g, 'Adım 0${$1} testini geç.');
mod = mod.replace(/Step 0\$\{(.+?)\}’e Git/g, 'Adım 0${$1}\'ye Git');
mod = mod.replace(/Step 0\$\{(.+?)\} Önizle/g, 'Adım 0${$1}\'ü Önizle');
fs.writeFileSync('src/components/ModuleReader.tsx', mod, 'utf-8');

