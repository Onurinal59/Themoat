const fs = require('fs');

let file = 'src/components/MoatDuelView.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Replace {something.percent}% with {formatPercentagePoints(something.percent, 1)} or similar
// Actually these are pre-calculated numbers. Like fin1.roicPercent.
content = content.replace(/\{fin([12])\.roicPercent\}\%/g, '{formatPercentagePoints(fin$1.roicPercent, 1)}');
content = content.replace(/\{fin([12])\.nopatMarginPercent\}\%/g, '{formatPercentagePoints(fin$1.nopatMarginPercent, 1)}');
content = content.replace(/\{fin([12])\.spread\}\%/g, '{formatPercentagePoints(fin$1.spread, 1)}');
content = content.replace(/\{fin([12])\.spread > 0 \? \`\+\$\{fin([12])\.spread\}\%\` : \`\$\{fin([12])\.spread\}\%\`\}/g, 
  '{fin$1.spread > 0 ? `+${formatPercentagePoints(fin$1.spread, 1)}` : formatPercentagePoints(fin$1.spread, 1)}');

// Fix multipliers: {fin1.capitalTurnover}x -> {formatMultiplier(fin1.capitalTurnover, 2)}
content = content.replace(/\{fin([12])\.capitalTurnover\}x/g, '{formatMultiplier(fin$1.capitalTurnover, 2)}');

// In string literals (clipboard copy text):
content = content.replace(/\$\{fin([12])\.roicPercent\}\%/g, '${formatPercentagePoints(fin$1.roicPercent, 1)}');
content = content.replace(/\%\$\{fin([12])\.roicPercent\}/g, '${formatPercentagePoints(fin$1.roicPercent, 1)}');
content = content.replace(/\$\{comp([12])\.financials\.wacc\}\%/g, '${formatPercentagePoints(comp$1.financials.wacc, 1)}');
content = content.replace(/\%\$\{comp([12])\.financials\.wacc\}/g, '${formatPercentagePoints(comp$1.financials.wacc, 1)}');
content = content.replace(/\$\{fin([12])\.spread\}\%/g, '${formatPercentagePoints(fin$1.spread, 1)}');
content = content.replace(/\%\$\{fin([12])\.spread\}/g, '${formatPercentagePoints(fin$1.spread, 1)}');
content = content.replace(/\$\{fin([12])\.nopatMarginPercent\}\%/g, '${formatPercentagePoints(fin$1.nopatMarginPercent, 1)}');
content = content.replace(/\%\$\{fin([12])\.nopatMarginPercent\}/g, '${formatPercentagePoints(fin$1.nopatMarginPercent, 1)}');
content = content.replace(/\$\{fin([12])\.capitalTurnover\}x/g, '${formatMultiplier(fin$1.capitalTurnover, 2)}');

fs.writeFileSync(file, content, 'utf-8');
