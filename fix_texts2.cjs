const fs = require('fs');

let file = 'src/components/FormulaDeepDiveModal.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(/\{waccEquity\}M \{t\("FormulaDeepDiveModal\.text_233"\)\} \(\{Math\.round\(weightE \* 100\)\}\%\)/g, 
  '{formatUsdFromMillions(waccEquity, 0)} ({formatPercentagePoints(Math.round(weightE * 100), 0)})');

content = content.replace(/\{waccDebt\}M \{t\("FormulaDeepDiveModal\.text_235"\)\} \(\{Math\.round\(weightD \* 100\)\}\%\)/g, 
  '{formatUsdFromMillions(waccDebt, 0)} ({formatPercentagePoints(Math.round(weightD * 100), 0)})');

fs.writeFileSync(file, content, 'utf-8');
