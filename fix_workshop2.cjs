const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf-8');

  // Replace `%${(something).toFixed(1)}` with `${formatPercentagePoints(something, 1)}`
  content = content.replace(/\%\$\{([^\}]+)\.toFixed\(([0-9]+)\)\}/g, '${formatPercentagePoints($1, $2)}');

  // Replace `$${(something).toFixed(1)}` where it means currency
  // Wait, I already did this for NOPAT: `${formatUsdFromMillions(calculatedNopat)}`. Let's check what's left for `\$`.
  content = content.replace(/\$\$\{([^\}]+)\.toFixed\(([0-9]+)\)\}/g, '\\$$${$1.toFixed($2)}'); // I'll just remove double dollar

  fs.writeFileSync(file, content, 'utf-8');
}

fix('src/components/FormulaWorkshopView.tsx');
fix('src/components/FormulaDeepDiveModal.tsx');
