const fs = require('fs');
let content = fs.readFileSync('src/data/checklistData.ts', 'utf-8');

content = content.replace(/1\. Giriş & Getiri \(Introduction\)/g, "1. Giriş & Getiri");
content = content.replace(/2\. Sektör Haritası \(Lay of the Land\)/g, "2. Sektör Haritası");
content = content.replace(/4\. Giriş Engelleri \(Barriers to Entry\)/g, "4. Giriş Engelleri");
content = content.replace(/5\. Yıkım ve Çözülme \(Disruption\)/g, "5. Yıkım ve Çözülme");
content = content.replace(/6\. Şirket Analizi \(Value Creation\)/g, "6. Şirket Analizi ve Değer Yaratımı");

fs.writeFileSync('src/data/checklistData.ts', content, 'utf-8');

let audit = fs.readFileSync('src/data/companyAuditData.ts', 'utf-8');
audit = audit.replace(/1\. Giriş & Getiri \(Introduction\)/g, "1. Giriş & Getiri");
audit = audit.replace(/2\. Sektör Haritası \(Lay of the Land\)/g, "2. Sektör Haritası");
audit = audit.replace(/4\. Giriş Engelleri \(Barriers to Entry\)/g, "4. Giriş Engelleri");
audit = audit.replace(/5\. Yıkım ve Çözülme \(Disruption\)/g, "5. Yıkım ve Çözülme");
audit = audit.replace(/6\. Şirket Analizi \(Value Creation\)/g, "6. Şirket Analizi ve Değer Yaratımı");
fs.writeFileSync('src/data/companyAuditData.ts', audit, 'utf-8');

let moatsim = fs.readFileSync('src/components/simulators/MoatChecklistSim.tsx', 'utf-8');
moatsim = moatsim.replace(/1\. Giriş & Getiri \(Introduction\)/g, "1. Giriş & Getiri");
moatsim = moatsim.replace(/2\. Sektör Haritası \(Lay of the Land\)/g, "2. Sektör Haritası");
moatsim = moatsim.replace(/4\. Giriş Engelleri \(Barriers to Entry\)/g, "4. Giriş Engelleri");
moatsim = moatsim.replace(/5\. Yıkım ve Çözülme \(Disruption\)/g, "5. Yıkım ve Çözülme");
moatsim = moatsim.replace(/6\. Şirket Analizi \(Value Creation\)/g, "6. Şirket Analizi ve Değer Yaratımı");
fs.writeFileSync('src/components/simulators/MoatChecklistSim.tsx', moatsim, 'utf-8');

