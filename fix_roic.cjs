const fs = require('fs');

let file = 'src/components/simulators/RoicWaccSim.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(/\`\+\$\{spread\.toFixed\([0-9]+\)\}\% Spread \(\+\$\$\{Math\.round\(economicProfit\)\.toLocaleString\(\)\}M \/ Year\)\`/g, 
  '`+${formatPercentagePoints(spread, 2)} Spread (+${formatUsdFromMillions(economicProfit, 0)} / Year)`');

content = content.replace(/\`\+\$\{spread\.toFixed\([0-9]+\)\} Puan Yayılım \(\+\$\{Math\.round\(economicProfit\)\.toLocaleString\(\)\}M \$ \/ Yıl Refah\)\`/g, 
  '`+${formatPercentagePoints(spread, 2)} Yayılım (+${formatUsdFromMillions(economicProfit, 0)} / Yıl)`');
  
content = content.replace(/\`\$\{spread\.toFixed\([0-9]+\)\}\% Negative Spread \(-\$\$\{Math\.abs\(Math\.round\(economicProfit\)\)\.toLocaleString\(\)\}M \/ Year\)\`/g, 
  '`${formatPercentagePoints(spread, 2)} Negative Spread (${formatUsdFromMillions(economicProfit, 0)} / Year)`');

content = content.replace(/\`\$\{spread\.toFixed\([0-9]+\)\} Puan Negatif Yayılım \(\-\$\{Math\.abs\(Math\.round\(economicProfit\)\)\.toLocaleString\(\)\}M \$ \/ Yıl Kayıp\)\`/g, 
  '`${formatPercentagePoints(spread, 2)} Negatif Yayılım (${formatUsdFromMillions(economicProfit, 0)} / Yıl)`');

fs.writeFileSync(file, content, 'utf-8');
