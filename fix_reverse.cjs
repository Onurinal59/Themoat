const fs = require('fs');

let content = fs.readFileSync('src/components/simulators/ReverseDCFSim.tsx', 'utf-8');

if (!content.includes('formatCurrency')) {
  content = content.replace('const { isEnglish, t } = useLanguage();', 'const { isEnglish, t, formatCurrency, formatPercent, formatNumber } = useLanguage();');
}

// 1. Tooltip prefix and unit:
// prefix="$" unit="M"
content = content.replace(/prefix="\$"[\s\n]*unit="M"/, 'prefix={isEnglish ? "$" : ""} unit={isEnglish ? "M" : " Mn $"}');

// 2. return `$${val}M (${label})`;
content = content.replace(/return \`\$\$\{val\}M \(\$\{label\}\)\`;/, 'return isEnglish ? `\\$\\${val}M (\\${label})` : `\\${val} Mn \\$ (\\${label})`;');

// 3. %{steadyStatePercentage}
content = content.replace(/%\{steadyStatePercentage\}/g, '${formatPercent(steadyStatePercentage, 0)}');

// 4. %{futureValuePercentage}
content = content.replace(/%\{futureValuePercentage\}/g, '${formatPercent(futureValuePercentage, 0)}');

// 5. ${(steadyStateValue / 1000).toFixed(1)}B
content = content.replace(/\$\{\(steadyStateValue \/ 1000\)\.toFixed\(1\)\}B/g, '${formatCurrency(steadyStateValue * 1000000)}');

// 6. ${(Math.max(0, (marketCap - steadyStateValue) / 1000)).toFixed(1)}B
content = content.replace(/\$\{Math\.max\(0, \(marketCap - steadyStateValue\) \/ 1000\)\.toFixed\(1\)\}B/g, '${formatCurrency(Math.max(0, marketCap - steadyStateValue) * 1000000)}');

// 7. $${currentFCF}M
content = content.replace(/\$\$\{currentFCF\}M/g, '${formatCurrency(currentFCF * 1000000)}');

// 8. %{wacc}
content = content.replace(/%\{wacc\}/g, '${formatPercent(wacc, 1)}');

// 9. ${(steadyStateValue / 1000).toFixed(2)}B
content = content.replace(/\$\{\(steadyStateValue \/ 1000\)\.toFixed\(2\)\}B/g, '${formatCurrency(steadyStateValue * 1000000)}');

// 10. ${(marketCap / 1000).toFixed(1)}B
content = content.replace(/\$\{\(marketCap \/ 1000\)\.toFixed\(1\)\}B/g, '${formatCurrency(marketCap * 1000000)}');

// 11. ${(Math.max(0, marketCap - steadyStateValue) / 1000).toFixed(2)}B
content = content.replace(/\$\{\(Math\.max\(0, marketCap - steadyStateValue\) \/ 1000\)\.toFixed\(2\)\}B/g, '${formatCurrency(Math.max(0, marketCap - steadyStateValue) * 1000000)}');

// 12. $${marketCap}M
content = content.replace(/\$\$\{marketCap\}M/g, '${formatCurrency(marketCap * 1000000)}');

fs.writeFileSync('src/components/simulators/ReverseDCFSim.tsx', content, 'utf-8');
console.log("Fixed ReverseDCFSim!");
