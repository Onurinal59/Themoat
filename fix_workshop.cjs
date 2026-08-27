const fs = require('fs');
let file = 'src/components/FormulaWorkshopView.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Equity
content = content.replace(/\{waccEquity\}M \{t\("FormulaWorkshopView\.text_[0-9]+"\)\} \(\{Math\.round\(weightE \* 100\)\}\%\)/g, 
  '{formatUsdFromMillions(waccEquity, 0)} ({formatPercentagePoints(Math.round(weightE * 100), 0)})');

// Debt
content = content.replace(/\{waccDebt\}M \{t\("FormulaWorkshopView\.text_[0-9]+"\)\} \(\{Math\.round\(weightD \* 100\)\}\%\)/g, 
  '{formatUsdFromMillions(waccDebt, 0)} ({formatPercentagePoints(Math.round(weightD * 100), 0)})');

// WACC string formatting for TR and EN 
content = content.replace(/\{waccBeta\.toFixed\(2\)\}x \(Ke = \{formatPercent\(calculatedKe, 1\)\}\)/g, 
  '{formatMultiplier(waccBeta, 2)} (Ke = {formatPercentagePoints(calculatedKe, 1)})');

content = content.replace(/\{formatPercent\(waccKd, 1\)\}/g, '{formatPercentagePoints(waccKd, 1)}');
content = content.replace(/\{formatPercent\(waccTax, 1\)\}/g, '{formatPercentagePoints(waccTax, 1)}');
content = content.replace(/\{formatPercent\(netKd, 1\)\}/g, '{formatPercentagePoints(netKd, 1)}');
content = content.replace(/\{formatPercent\(waccRf, 1\)\}/g, '{formatPercentagePoints(waccRf, 1)}');
content = content.replace(/\{formatPercent\(calculatedWacc, 2\)\}/g, '{formatPercentagePoints(calculatedWacc, 2)}');

fs.writeFileSync(file, content, 'utf-8');
