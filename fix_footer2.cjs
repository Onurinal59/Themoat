const fs = require('fs');

let footer = fs.readFileSync('src/components/Footer.tsx', 'utf-8');

footer = footer.replace(/\{t\(\s*"footer\.description",\s*"[^"]+"\s*\)\}/g, '{t("footer.desc")}');
footer = footer.replace(/\{t\("footer\.tagline", "Sürdürülebilir Rekabet Avantajı & Kurumsal Değerleme Rehberi"\)\}/g, '{t("footer.tagline")}');

fs.writeFileSync('src/components/Footer.tsx', footer, 'utf-8');

let lang = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');
lang = lang.replace(/"footer\.desc": "[^"]+",/g, '"footer.desc": "An interactive strategy, ROIC X-ray, and competitive advantage simulation platform based on the methodologies of Michael J. Mauboussin and Dan Callahan.",\n    "footer.tagline": "Sustainable Competitive Advantage & Corporate Valuation Guide",');
lang = lang.replace(/"footer\.desc": "Michael J\. Mauboussin ve Dan Callahan'ın metodolojilerini temel alan interaktif strateji, ROIC röntgeni ve rekabet avantajı simülasyon platformu\.",/g, '"footer.desc": "Michael J. Mauboussin ve Dan Callahan\'ın metodolojilerini temel alan interaktif strateji, ROIC röntgeni ve rekabet avantajı simülasyon platformu.",\n    "footer.tagline": "Sürdürülebilir Rekabet Avantajı & Kurumsal Değerleme Rehberi",');

fs.writeFileSync('src/context/LanguageContext.tsx', lang, 'utf-8');
