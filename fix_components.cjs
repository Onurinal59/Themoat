const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;

  // Add imports if they use LanguageContext functions
  if (content.includes('useLanguage()')) {
    // We already added them to LanguageContextType, so we just extract them from useLanguage()
    const match = content.match(/const\s+\{\s*([^}]+)\s*\}\s*=\s*useLanguage\(\)/);
    if (match) {
      let vars = match[1];
      const needs = ['formatPercentagePoints', 'formatUsdFromMillions', 'formatUsdFromBillions', 'formatMultiplier', 'formatDurationYears'];
      needs.forEach(n => {
        if (!vars.includes(n)) {
          vars += `, ${n}`;
          changed = true;
        }
      });
      if (changed) {
         content = content.replace(match[0], `const { ${vars} } = useLanguage()`);
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf-8');
  }
});
