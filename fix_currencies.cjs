const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // ReverseDCFSim
  if (file.includes('ReverseDCFSim.tsx')) {
    content = content.replace(/\{formatCurrency\(marketCap \* 1000000\)\}/g, '{formatUsdFromBillions(marketCap / 1000, 1)}');
    content = content.replace(/\{formatCurrency\(steadyStateValue \* 1000000\)\}/g, '{formatUsdFromBillions(steadyStateValue / 1000, 1)}');
    content = content.replace(/\{formatCurrency\(Math.max\(0, marketCap - steadyStateValue\) \* 1000000\)\}/g, '{formatUsdFromBillions(Math.max(0, marketCap - steadyStateValue) / 1000, 1)}');
  }
  
  // FormulaWorkshopView & DeepDive
  content = content.replace(/\{formatCurrency\(totalInvestedCapital \* 1000000\)\}/g, ' {formatUsdFromMillions(totalInvestedCapital)}');
  content = content.replace(/\{formatCurrency\(fnReportedEbit \* 1000000\)\}/g, ' {formatUsdFromMillions(fnReportedEbit)}');
  content = content.replace(/\{formatCurrency\(adjustedEbit \* 1000000\)\}/g, ' {formatUsdFromMillions(adjustedEbit)}');

  fs.writeFileSync(file, content, 'utf-8');
}

fix('src/components/simulators/ReverseDCFSim.tsx');
fix('src/components/FormulaWorkshopView.tsx');
fix('src/components/FormulaDeepDiveModal.tsx');
