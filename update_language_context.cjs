const fs = require('fs');

let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

// Add formatters to LanguageContextType
content = content.replace('  getMasterTemplate: () => CompanyAuditDossier;\n}', `  getMasterTemplate: () => CompanyAuditDossier;
  formatPercent: (value: number, fractionDigits?: number) => string;
  formatCurrency: (value: number) => string;
  formatNumber: (value: number, fractionDigits?: number) => string;
  formatDuration: (minutes: number) => string;
}`);

// Add implementations inside LanguageProvider
const implementations = `
  const formatPercent = (value: number, fractionDigits: number = 1): string => {
    return new Intl.NumberFormat(language === "tr" ? "tr-TR" : "en-US", {
      style: "percent",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(value / 100);
  };

  const formatCurrency = (value: number): string => {
    if (value === 0) return new Intl.NumberFormat(language === "tr" ? "tr-TR" : "en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(0);
    return new Intl.NumberFormat(language === "tr" ? "tr-TR" : "en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1
    }).format(value);
  };

  const formatNumber = (value: number, fractionDigits: number = 0): string => {
    return new Intl.NumberFormat(language === "tr" ? "tr-TR" : "en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(value);
  };

  const formatDuration = (minutes: number): string => {
    return language === "tr" ? \`\${minutes} dk\` : \`\${minutes} min\`;
  };
`;

content = content.replace('  const getMasterTemplate = (): CompanyAuditDossier => {', implementations + '\n  const getMasterTemplate = (): CompanyAuditDossier => {');

// Add to returned context
content = content.replace('    getMasterTemplate,', '    getMasterTemplate,\n    formatPercent,\n    formatCurrency,\n    formatNumber,\n    formatDuration,');

// Also update useEffect to set document language and title
const documentEffect = `
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'tr' ? 'Ekonomik Hendek Akademisi | Değer Yatırımı & ROIC' : 'Economic Moat Academy | Master Value Investing & ROIC';
    
    // Update meta tags
    const updateMeta = (selector, content) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };
    
    if (language === 'tr') {
      updateMeta('meta[name="description"]', "Michael Mauboussin'in ekonomik hendek çerçevesini, ROIC analizini ve tersine DCF değerlemelerini interaktif simülatörlerle öğrenin.");
      updateMeta('meta[property="og:title"]', "Ekonomik Hendek Akademisi | Değer Yatırımı & ROIC");
      updateMeta('meta[property="og:description"]', "Michael Mauboussin'in ekonomik hendek çerçevesini, ROIC analizini ve tersine DCF değerlemelerini interaktif simülatörlerle öğrenin.");
      updateMeta('meta[name="twitter:title"]', "Ekonomik Hendek Akademisi | Değer Yatırımı & ROIC");
      updateMeta('meta[name="twitter:description"]', "Michael Mauboussin'in ekonomik hendek çerçevesini, ROIC analizini ve tersine DCF değerlemelerini interaktif simülatörlerle öğrenin.");
    } else {
      updateMeta('meta[name="description"]', "Master Michael Mauboussin's economic moat framework, ROIC analysis, and reverse DCF valuations with interactive simulators.");
      updateMeta('meta[property="og:title"]', "Economic Moat Academy | Master Value Investing & ROIC");
      updateMeta('meta[property="og:description"]', "Master Michael Mauboussin's economic moat framework, ROIC analysis, and reverse DCF valuations with interactive simulators.");
      updateMeta('meta[name="twitter:title"]', "Economic Moat Academy | Master Value Investing & ROIC");
      updateMeta('meta[name="twitter:description"]', "Master Michael Mauboussin's economic moat framework, ROIC analysis, and reverse DCF valuations with interactive simulators.");
    }
  }, [language]);
`;

content = content.replace('  useEffect(() => {', documentEffect + '\n  useEffect(() => {');

fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
console.log("LanguageContext updated with formatters and meta tags.");
