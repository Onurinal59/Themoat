const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf-8');

  // WACC text
  content = content.replace(/Şirket her 100 TL için yıllık en az/g, 'Şirket yatırılan her 100 birim sermaye için yıllık en az');
  
  // ROIC text
  content = content.replace(/The firm generates \$?\$\{calculatedRoic\.toFixed\(1\)\} of pure cash return per \$100 of invested capital\./g, 
    'The firm generates ${formatPercentagePoints(calculatedRoic, 1)} pure cash return per $100 capital deployed.');
  content = content.replace(/The firm generates \$?\$\{calculatedRoic\.toFixed\(1\)\} pure cash return per \$100 capital deployed\./g, 
    'The firm generates ${formatPercentagePoints(calculatedRoic, 1)} pure cash return on invested capital.');
  content = content.replace(/Şirket yatırılan her 100 TL için yıllık \$?\$\{calculatedRoic\.toFixed\(1\)\} nakit kâr üretmektedir\./g, 
    'Şirket yatırılan sermaye üzerinden yıllık ${formatPercentagePoints(calculatedRoic, 1)} nakit kâr üretmektedir.');
  
  // Adjusted EBIT text
  // `Reported EBIT: {formatCurrency(fnReportedEbit * 1000000)} → Adjusted EBIT: {formatCurrency(adjustedEbit * 1000000)} (+${formatUsdFromMillions(fnRdExpense - fnRdAmort)} net R&D capitalization impact).`
  content = content.replace(/Reported EBIT:\{formatCurrency\(fnReportedEbit \* 1000000\)\}/g, 'Reported EBIT: ${formatUsdFromMillions(fnReportedEbit)}');
  content = content.replace(/Adjusted EBIT:\{formatCurrency\(adjustedEbit \* 1000000\)\}/g, 'Adjusted EBIT: ${formatUsdFromMillions(adjustedEbit)}');
  content = content.replace(/\(\+\$\{formatUsdFromMillions\(fnRdExpense - fnRdAmort\)\}/g, '(+${formatUsdFromMillions(fnRdExpense - fnRdAmort)}');
  
  content = content.replace(/Raporlanan FVÖK: \{formatCurrency\(fnReportedEbit \* 1000000\)\}/g, 'Raporlanan FVÖK: ${formatUsdFromMillions(fnReportedEbit)}');
  content = content.replace(/Düzeltilmiş FVÖK: \{formatCurrency\(adjustedEbit \* 1000000\)\}/g, 'Düzeltilmiş FVÖK: ${formatUsdFromMillions(adjustedEbit)}');
  
  // DeepDive specific
  content = content.replace(/Invested Capital =\{formatCurrency\(totalInvestedCapital \* 1000000\)\}/g, 'Invested Capital = ${formatUsdFromMillions(totalInvestedCapital)}');

  fs.writeFileSync(file, content, 'utf-8');
}

fix('src/components/FormulaWorkshopView.tsx');
fix('src/components/FormulaDeepDiveModal.tsx');
