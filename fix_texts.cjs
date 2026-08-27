const fs = require('fs');

function clean(file) {
  let content = fs.readFileSync(file, 'utf-8');

  // Specific variables that are in millions:
  const milVars = ['roicEbit', 'roicNwc', 'roicPpe', 'ppSegmentCap', 'calculatedEconomicProfit', 'fnReportedEbit', 'fnRdExpense', 'fnRdAmort', 'adjustedNopat', 'dpRev', 'dpNopat', 'dpCapital'];
  
  milVars.forEach(v => {
    // e.g. {roicEbit}M {t("FormulaWorkshopView.text_324")}
    let regex = new RegExp(`\\{${v}\\}M \\{t\\("[^"]+"\\)\\}`, 'g');
    content = content.replace(regex, `{formatUsdFromMillions(${v}, 0)}`);
    
    // e.g. {calculatedEconomicProfit.toFixed(1)}M {t("FormulaWorkshopView.text_359")}
    let regex2 = new RegExp(`\\{${v}\\.toFixed\\([0-9]+\\)\\}M \\{t\\("[^"]+"\\)\\}`, 'g');
    content = content.replace(regex2, `{formatUsdFromMillions(${v})}`);
  });

  // Variables that are standard currency (not millions)
  const curVars = ['vsWtp', 'vsPrice', 'vsCost', 'vsWts', 'consumerSurplus', 'firmMargin', 'supplierSurplus', 'dcfPrice', 'dcfNopat'];
  curVars.forEach(v => {
    // e.g. {vsWtp} {t("FormulaWorkshopView.text_332")}
    let regex = new RegExp(`\\{${v}\\} \\{t\\("[^"]+"\\)\\}`, 'g');
    content = content.replace(regex, `{formatCurrency(${v})}`);
  });
  
  // + for economic profit
  // {calculatedEconomicProfit > 0 ? "+" : ""}{calculatedEconomicProfit.toFixed(1)}M {t("FormulaWorkshopView.text_359")}
  content = content.replace(/\{calculatedEconomicProfit > 0 \? "\+" : ""\}\{formatUsdFromMillions\(calculatedEconomicProfit\)\}/g, 
    '{calculatedEconomicProfit > 0 ? `+${formatUsdFromMillions(calculatedEconomicProfit)}` : formatUsdFromMillions(calculatedEconomicProfit)}');

  fs.writeFileSync(file, content, 'utf-8');
}

clean('src/components/FormulaWorkshopView.tsx');
clean('src/components/FormulaDeepDiveModal.tsx');
