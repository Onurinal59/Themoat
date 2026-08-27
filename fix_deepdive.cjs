const fs = require('fs');

let content = fs.readFileSync('src/components/FormulaDeepDiveModal.tsx', 'utf-8');

if (!content.includes('formatPercent')) {
  content = content.replace('const { getFormulaGuides, isEnglish, t } = useLanguage();', 'const { getFormulaGuides, isEnglish, t, formatCurrency, formatPercent, formatNumber } = useLanguage();');
}

content = content.replace(/%\{([a-zA-Z0-9_]+)\.toFixed\(([0-9])\)\}/g, '${formatPercent($1, $2)}');
content = content.replace(/%\{([a-zA-Z0-9_]+)\}/g, '${formatPercent($1, 1)}');
content = content.replace(/\$\$\{([a-zA-Z0-9_]+)\}M/g, '${formatCurrency($1 * 1000000)}');

fs.writeFileSync('src/components/FormulaDeepDiveModal.tsx', content, 'utf-8');
console.log("Fixed FormulaDeepDiveModal!");
