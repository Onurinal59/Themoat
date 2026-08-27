const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx}');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let origContent = content;

  // Replace `${formatCurrency(...)` (JSX text) that I already replaced with `{formatCurrency`
  // But wait, there are occurrences of `$${` in template literals. 
  // Let's replace `$${formatCurrency` with `${formatCurrency`
  content = content.replace(/\$\$\{formatCurrency/g, '${formatCurrency');
  
  // Replace `$%{` with `${` if it exists
  content = content.replace(/\$\%\{/g, '${');
  
  // Replace `%${formatPercent` with `${formatPercent` in template literals
  content = content.replace(/\%\$\{formatPercent/g, '${formatPercent');
  content = content.replace(/\%\{formatPercent/g, '{formatPercent');
  
  // And in JSX: `% {formatPercent` -> `{formatPercent`
  content = content.replace(/\%?\s*\{formatPercent/g, '{formatPercent');

  // In JSX: `$ {formatCurrency` -> `{formatCurrency`
  content = content.replace(/\$?\s*\{formatCurrency/g, '{formatCurrency');
  
  // Also things like `Current FCF (${currentFCF}M)` should be `Current FCF (${formatUsdFromMillions(currentFCF)})`
  // Wait, I can't blindly do this. Let's do some specific replacements for ReverseDCFSim.
  if (file.includes('ReverseDCFSim.tsx')) {
    content = content.replace(/\(\$\{currentFCF\}M\)/g, '(${formatUsdFromMillions(currentFCF)})');
  }

  // FormulaWorkshopView
  if (file.includes('FormulaWorkshopView.tsx')) {
    content = content.replace(/\$?\$\{calculatedNopat\.toFixed\([0-9]+\)\}M/g, '${formatUsdFromMillions(calculatedNopat)}');
    content = content.replace(/\$?\$\{fnRdExpense - fnRdAmort\}M/g, '${formatUsdFromMillions(fnRdExpense - fnRdAmort)}');
  }
  
  if (file.includes('FormulaDeepDiveModal.tsx')) {
    content = content.replace(/\$?\$\{calculatedNopat\.toFixed\([0-9]+\)\}M/g, '${formatUsdFromMillions(calculatedNopat)}');
  }

  if (origContent !== content) {
    fs.writeFileSync(file, content, 'utf-8');
  }
});
