const fs = require('fs');

let content = fs.readFileSync('src/components/FormulaWorkshopView.tsx', 'utf-8');

if (!content.includes('formatPercent')) {
  content = content.replace('const { getFormulaGuides, isEnglish, t } = useLanguage();', 'const { getFormulaGuides, isEnglish, t, formatCurrency, formatPercent, formatNumber } = useLanguage();');
}

// %{calculatedKe.toFixed(1)} -> ${formatPercent(calculatedKe, 1)}
content = content.replace(/%\{([a-zA-Z0-9_]+)\.toFixed\(([0-9])\)\}/g, '${formatPercent($1, $2)}');

// %{waccKd} -> ${formatPercent(waccKd, 1)} (assuming default 1)
// Wait, some don't have .toFixed. We can just do ${formatPercent(waccKd, 1)}.
content = content.replace(/%\{([a-zA-Z0-9_]+)\}/g, '${formatPercent($1, 1)}');

// Fix the display of `$${waccEquity}M` etc.
content = content.replace(/\$\$\{([a-zA-Z0-9_]+)\}M/g, '${formatCurrency($1 * 1000000)}');

fs.writeFileSync('src/components/FormulaWorkshopView.tsx', content, 'utf-8');
console.log("Fixed FormulaWorkshopView!");
