const fs = require('fs');

let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

const enKeys = `
    "footer.title": "Economic Moat Academy",
    "footer.desc": "An interactive strategy, ROIC X-ray, and competitive advantage simulation platform based on the methodologies of Michael J. Mauboussin and Dan Callahan.",
    "footer.role": "Platform Creator & Developer",
    "footer.contact": "For questions, feedback, or collaboration opportunities, feel free to connect on LinkedIn.",
    "footer.education": "EDUCATION & MODULES",
    "footer.tools": "LABORATORY & TOOLS",
    "footer.copyright": "© 2026 Economic Moat Academy",
    "footer.disclaimer": "This platform is intended solely for financial analysis, education, and methodological learning; it does not constitute investment advice.",
`;

const trKeys = `
    "footer.title": "Ekonomik Hendek Akademisi",
    "footer.desc": "Michael J. Mauboussin ve Dan Callahan'ın metodolojilerini temel alan interaktif strateji, ROIC röntgeni ve rekabet avantajı simülasyon platformu.",
    "footer.role": "Platform Yapımcısı & Geliştirici",
    "footer.contact": "Soru, geri bildirim veya iş birliği önerileriniz için LinkedIn üzerinden doğrudan iletişime geçebilirsiniz.",
    "footer.education": "EĞİTİM & MODÜLLER",
    "footer.tools": "LABORATUVAR & ARAÇLAR",
    "footer.copyright": "© 2026 Ekonomik Hendek Akademisi",
    "footer.disclaimer": "Bu platform yalnızca finansal analiz, eğitim ve metodolojik öğrenim amaçlıdır; herhangi bir yatırım tavsiyesi (YTD) niteliği taşımaz.",
`;

content = content.replace(/"en": \{/, '"en": {' + enKeys);
content = content.replace(/"tr": \{/, '"tr": {' + trKeys);

fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
