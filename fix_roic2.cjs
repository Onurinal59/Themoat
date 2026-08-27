const fs = require('fs');

let file = 'src/components/simulators/RoicWaccSim.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(/\{spread \>\= 0 \? \`\+\$\{spread\.toFixed\(1\)\}\%\` : \`\$\{spread\.toFixed\(1\)\}\%\`\}/g, 
  '{spread >= 0 ? `+${formatPercentagePoints(spread, 1)}` : formatPercentagePoints(spread, 1)}');
  
content = content.replace(/\$\{investedCapital\.toLocaleString\(\)\}M/g, '${formatUsdFromMillions(investedCapital)}');
content = content.replace(/× \{spread\.toFixed\(1\)\}\%/g, '× {formatPercentagePoints(spread, 1)}');

fs.writeFileSync(file, content, 'utf-8');

let file2 = 'src/components/simulators/ValueStickSim.tsx';
let content2 = fs.readFileSync(file2, 'utf-8');
content2 = content2.replace(/\$\{wtp\}/g, '${formatCurrency(wtp)}');
content2 = content2.replace(/\$\{price\}/g, '${formatCurrency(price)}');
content2 = content2.replace(/\$\{cost\}/g, '${formatCurrency(cost)}');
content2 = content2.replace(/\$\{wts\}/g, '${formatCurrency(wts)}');
content2 = content2.replace(/\$\{totalValueCreated\}/g, '${formatCurrency(totalValueCreated)}');
content2 = content2.replace(/\$\{customerDelight\}/g, '${formatCurrency(customerDelight)}');
content2 = content2.replace(/\$\{firmProfit\}/g, '${formatCurrency(firmProfit)}');
content2 = content2.replace(/\$\{supplierSurplus\}/g, '${formatCurrency(supplierSurplus)}');
fs.writeFileSync(file2, content2, 'utf-8');

