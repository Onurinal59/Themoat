const fs = require('fs');

// 1. Fix companyAuditData.ts (TR specific strings)
let auditData = fs.readFileSync('src/data/companyAuditData.ts', 'utf-8');
auditData = auditData.replace(/Toptan Satış & Üyelikli Perakende \(Warehouse Club\)/g, 'Toptan Satış & Üyelikli Perakende');
auditData = auditData.replace(/İndirimli Perakende \(Hard-Discount Retail\)/g, 'Sert İndirimli Market Perakendeciliği');
auditData = auditData.replace(/Hard-Discount Grocery Retail/g, 'Sert İndirimli Market Perakendeciliği');
fs.writeFileSync('src/data/companyAuditData.ts', auditData, 'utf-8');

// 2. Fix MoatDuelView.tsx
let duel = fs.readFileSync('src/components/MoatDuelView.tsx', 'utf-8');

// Fix Wide/Narrow labels in TR strings
// Find t("...", "Wide Moat (Geniş Hendek)") or similar and replace with "Geniş Hendek" if it's TR, but wait, the label is generated dynamically based on moatType!

// In MoatDuelView.tsx:
// {score1.moatType === "wide" ? (isEnglish ? "Wide Moat" : "Geniş Hendek (Wide)") : ... }
// Let's just do a regex replace to remove the "(Wide)" and "(Narrow)" in MoatDuelView.tsx
duel = duel.replace(/Geniş Hendek \(Wide\)/g, 'Geniş Hendek');
duel = duel.replace(/Dar Hendek \(Narrow\)/g, 'Dar Hendek');

// Replace "Relative Advantage" in MoatDuelView.tsx if it's there
duel = duel.replace(/"Relative Advantage"/g, 'isEnglish ? "Relative Advantage" : "Göreli Rekabet Üstünlüğü"');

// Actually let's search if "Relative Advantage" exists.
fs.writeFileSync('src/components/MoatDuelView.tsx', duel, 'utf-8');

