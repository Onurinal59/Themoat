const fs = require('fs');

// 1. RoicWaccSim (Live Sync)
let roic = fs.readFileSync('src/components/simulators/RoicWaccSim.tsx', 'utf-8');
roic = roic.replace(/<span className="text-\[11px\] text-slate-500 dark:text-slate-400 font-mono">Live Sync<\/span>/g, 
  '<span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{isEnglish ? "Live Sync" : "Canlı Eşzamanlama"}</span>');
fs.writeFileSync('src/components/simulators/RoicWaccSim.tsx', roic, 'utf-8');

// 2. modulesData.ts
let mod = fs.readFileSync('src/data/modulesData.ts', 'utf-8');
mod = mod.replace(/\(Value Destruction\)/g, '(Değer Yok Edimi)');
mod = mod.replace(/\(The Value Triad\)/g, '(Değer Yaratmanın Üç Boyutu)');
fs.writeFileSync('src/data/modulesData.ts', mod, 'utf-8');

// 3. glossaryData.ts
let glo = fs.readFileSync('src/data/glossaryData.ts', 'utf-8');
glo = glo.replace(/\(Value Destruction\)/g, '(Değer Yok Edimi)');
glo = glo.replace(/\(The Value Triad\)/g, '(Değer Yaratmanın Üç Boyutu)');
glo = glo.replace(/Değer Yaratma Üçlüsü/g, 'Değer Yaratmanın Üç Boyutu');
fs.writeFileSync('src/data/glossaryData.ts', glo, 'utf-8');

// 4. companyAuditData.ts
let aud = fs.readFileSync('src/data/companyAuditData.ts', 'utf-8');
aud = aud.replace(/Value Destruction \(ROIC < WACC\)/g, 'Değer Yok Edimi (ROIC < WACC)');
fs.writeFileSync('src/data/companyAuditData.ts', aud, 'utf-8');

// 5. FormulaWorkshopView.tsx
let forW = fs.readFileSync('src/components/FormulaWorkshopView.tsx', 'utf-8');
forW = forW.replace(/Şirket değer yakıyor \(Value destruction\)!/gi, 'Şirket değer yakıyor (Değer Yok Edimi)!');
fs.writeFileSync('src/components/FormulaWorkshopView.tsx', forW, 'utf-8');

