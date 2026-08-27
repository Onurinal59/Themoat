const fs = require('fs');

let mod = fs.readFileSync('src/components/ModuleReader.tsx', 'utf-8');

mod = mod.replace(/\{isEnglish \? \`Go to Adım 0\$\{(.+?)\}\` : \`Step 0\$\{(.+?)\}'ye Git\`\}/g, 
    '{isEnglish ? `Go to Step 0${$1}` : `Adım 0${$1}\'ye Git`}');
    
mod = mod.replace(/\{isEnglish \? \`Go to Step 0\$\{(.+?)\}\` : \`Step 0\$\{(.+?)\}'ye Git\`\}/g, 
    '{isEnglish ? `Go to Step 0${$1}` : `Adım 0${$1}\'ye Git`}');

// also `Adım 0${nextModule.id}'ü Önizle`
// wait, line 1241 in ModuleReader:
mod = mod.replace(/Step 0\$\{(.+?)\} Önizle/g, 'Adım 0${$1}\'ü Önizle');
// Wait, I might have replaced incorrectly earlier. Let me just restore from git or search carefully.

fs.writeFileSync('src/components/ModuleReader.tsx', mod, 'utf-8');
