const fs = require('fs');

let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

// Fix "Relative Advantage"
content = content.replace(/"MoatDuelView\.relative_competitive_441": "Göreli Rekabet Analizi \(Relative Advantage\)",/g, 
  '"MoatDuelView.relative_competitive_441": "Göreli Rekabet Üstünlüğü",');

// Also Wide Moat / Narrow Moat translation for MoatDuelView if any
content = content.replace(/"MoatDuelView\.wide_moat_447": "Wide Moat",/g, '"MoatDuelView.wide_moat_447": "Geniş Hendek",'); // TR only? wait, replacing globally would mess up EN if I'm not careful. Let's do it safely.

const trStart = content.indexOf('"tr": {');
if (trStart !== -1) {
  let trBlock = content.slice(trStart);
  let enBlock = content.slice(0, trStart);
  
  trBlock = trBlock.replace(/"MoatDuelView\.wide_moat_447": ".*",/g, '"MoatDuelView.wide_moat_447": "Geniş Hendek",');
  trBlock = trBlock.replace(/"MoatDuelView\.narrow_moat_448": ".*",/g, '"MoatDuelView.narrow_moat_448": "Dar Hendek",');
  trBlock = trBlock.replace(/"MoatDuelView\.wide_moat_474": ".*",/g, '"MoatDuelView.wide_moat_474": "Geniş Hendek",');
  trBlock = trBlock.replace(/"MoatDuelView\.narrow_moat_475": ".*",/g, '"MoatDuelView.narrow_moat_475": "Dar Hendek",');
  
  trBlock = trBlock.replace(/"ReverseDCFSim\.wide_moat_tech_gian_1237": ".*",/g, '"ReverseDCFSim.wide_moat_tech_gian_1237": "🏰 Geniş Hendekli Mega-Teknoloji",');
  trBlock = trBlock.replace(/"ReverseDCFSim\.narrow_moat_consume_1238": ".*",/g, '"ReverseDCFSim.narrow_moat_consume_1238": "🛍️ Dar Hendekli Tüketim Markası",');
  
  content = enBlock + trBlock;
  fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
}

// Now replace footer in Footer.tsx
let footer = fs.readFileSync('src/components/Footer.tsx', 'utf-8');
footer = footer.replace(/\{t\("footer\.contact", "Soru, geri bildirim veya iş birliği önerileriniz için LinkedIn üzerinden doğrudan iletişime geçebilirsiniz\."\)\}/g, 
  '{t("footer.contact")}');
footer = footer.replace(/\{t\("footer\.education", "Eğitim & Modüller"\)\}/g, '{t("footer.education")}');
footer = footer.replace(/\{t\("footer\.tools", "Laboratuvar & Araçlar"\)\}/g, '{t("footer.tools")}');
footer = footer.replace(/\{t\("footer\.copyright", "© 2026 Ekonomik Hendek Akademisi"\)\}/g, '{t("footer.copyright")}');
footer = footer.replace(/\{t\("footer\.disclaimer", "Bu platform yalnızca finansal analiz, eğitim ve metodolojik öğrenim amaçlıdır; herhangi bir yatırım tavsiyesi \(YTD\) niteliği taşımaz\."\)\}/g, 
  '{t("footer.disclaimer")}');
footer = footer.replace(/Ekonomik Hendek Akademisi/g, '{t("footer.title")}');
footer = footer.replace(/Michael J\. Mauboussin ve Dan Callahan'ın metodolojilerini temel alan interaktif strateji, ROIC röntgeni ve rekabet avantajı simülasyon platformu\./g, '{t("footer.desc")}');
footer = footer.replace(/Platform Yapımcısı & Geliştirici/g, '{t("footer.role")}');

fs.writeFileSync('src/components/Footer.tsx', footer, 'utf-8');
