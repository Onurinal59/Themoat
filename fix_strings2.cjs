const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Undo my bad regex: it replaced `%{formatPercent` with `{formatPercent`, wait, no, I replaced it with `\${formatPercent`? 
  // No, I did `content = content.replace(/\%\$\{formatPercent/g, '${formatPercent');` which is fine.
  // And `content = content.replace(/\%?\s*\{formatPercent/g, '{formatPercent');` which means `% {formatPercent` becomes `{formatPercent`.
  // Wait, why did it become `$`? Ah, I also had `content.replace(/\$?\s*\{formatCurrency/g, '{formatCurrency');`
  // But wait, line 421 is `${formatPercent(calculatedKe, 1)}`. 
  // Let's replace `\$\{formatPercent` with `{formatPercent` because they are inside JSX!
  content = content.replace(/\$\{formatPercent/g, '{formatPercent');
  content = content.replace(/\$\{formatCurrency/g, '{formatCurrency');
  
  // Ensure we don't have stray `$` or `%` before `{format`
  content = content.replace(/\$?\s*\{formatPercent/g, '{formatPercent');
  content = content.replace(/\%?\s*\{formatPercent/g, '{formatPercent');
  content = content.replace(/\$?\s*\{formatCurrency/g, '{formatCurrency');
  content = content.replace(/\%?\s*\{formatCurrency/g, '{formatCurrency');
  
  // Format multipliers: `{waccBeta.toFixed(2)}x` -> `{formatMultiplier(waccBeta, 2)}`
  content = content.replace(/\{([a-zA-Z0-9_]+)\.toFixed\(([0-9]+)\)\}x/g, '{formatMultiplier($1, $2)}');

  fs.writeFileSync(file, content, 'utf-8');
});
