const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  content = content.replace(/\$\s*\{formatCurrency/g, '{formatCurrency');
  content = content.replace(/\$\s*\{formatUsdFrom/g, '{formatUsdFrom');
  content = content.replace(/\%\s*\{formatPercentage/g, '{formatPercentage');
  content = content.replace(/\%\s*\{formatPercent/g, '{formatPercent');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
  }
});
