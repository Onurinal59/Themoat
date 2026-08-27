const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // ReinvestmentRunwaySim
  if (file.includes('ReinvestmentRunwaySim.tsx')) {
    content = content.replace(/\%\$\{\(compARoic \* \(compAReinvest \/ 100\)\)\.toFixed\(1\)\}\/yıl/g, '${formatPercentagePoints(compARoic * compAReinvest, 1)} / yıl');
    content = content.replace(/\$\$\{finalYear\?\.capA\}M/g, '${formatUsdFromMillions(finalYear?.capA)}');
    content = content.replace(/\$\$\{finalYear\?\.nopatA\}M/g, '${formatUsdFromMillions(finalYear?.nopatA)}');
    
    content = content.replace(/\%\$\{\(compBRoic \* \(compBReinvest \/ 100\)\)\.toFixed\(1\)\}\/yıl/g, '${formatPercentagePoints(compBRoic * compBReinvest, 1)} / yıl');
    content = content.replace(/\$\$\{finalYear\?\.capB\}M/g, '${formatUsdFromMillions(finalYear?.capB)}');
    content = content.replace(/\$\$\{finalYear\?\.nopatB\}M/g, '${formatUsdFromMillions(finalYear?.nopatB)}');
  }

  // ReverseDCFSim
  if (file.includes('ReverseDCFSim.tsx')) {
    content = content.replace(/\%\{nearTermGrowth\}/g, '{formatPercentagePoints(nearTermGrowth, 1)}');
    content = content.replace(/\%\{wacc\.toFixed\(1\)\}/g, '{formatPercentagePoints(wacc, 1)}');
  }
  
  // RoicWaccSim
  if (file.includes('RoicWaccSim.tsx')) {
    content = content.replace(/\%\{wacc\.toFixed\(1\)\}/g, '{formatPercentagePoints(wacc, 1)}');
    content = content.replace(/\%4\.0/g, '{formatPercentagePoints(4, 1)}');
    content = content.replace(/\%13\.0/g, '{formatPercentagePoints(13, 1)}');
    content = content.replace(/\%22\.0/g, '{formatPercentagePoints(22, 1)}');
    content = content.replace(/\%\{roic\.toFixed\(1\)\}/g, '{formatPercentagePoints(roic, 1)}');
    content = content.replace(/\%\{data\.value\}/g, '{formatPercentagePoints(data.value, 1)}');
    
    // Spread = %{roic.toFixed(1)} (ROIC) - %{wacc.toFixed(1)} (WACC) = {spread >= 0 ? `+${spread.toFixed(1)}%` : `${spread.toFixed(1)}%`}
    content = content.replace(/Spread = \%\{roic\.toFixed\(1\)\} \(ROIC\) - \%\{wacc\.toFixed\(1\)\} \(WACC\) = \{spread >= 0 \? \`\+\$\{spread\.toFixed\(1\)\}\%\` : \`\$\{spread\.toFixed\(1\)\}\%\`\}/g, 
      'Spread = {formatPercentagePoints(roic, 1)} (ROIC) - {formatPercentagePoints(wacc, 1)} (WACC) = {spread >= 0 ? `+${formatPercentagePoints(spread, 1)}` : formatPercentagePoints(spread, 1)}');

    // = ${Math.round(economicProfit).toLocaleString()}M
    content = content.replace(/\ = \$\{(Math\.round\(economicProfit\)\.toLocaleString\(\)|Math\.round\(economicProfit\))\}M/g, ' = ${formatUsdFromMillions(economicProfit)}');

    // %${roic.toFixed(1)} and %${wacc.toFixed(1)}
    content = content.replace(/\%\$\{roic\.toFixed\(1\)\}/g, '${formatPercentagePoints(roic, 1)}');
    content = content.replace(/\%\$\{wacc\.toFixed\(1\)\}/g, '${formatPercentagePoints(wacc, 1)}');
  }

  // ValueStickSim
  if (file.includes('ValueStickSim.tsx')) {
    content = content.replace(/\%\{customerShare\.toFixed\(1\)\}/g, '{formatPercentagePoints(customerShare, 1)}');
    content = content.replace(/\%\{firmShare\.toFixed\(1\)\}/g, '{formatPercentagePoints(firmShare, 1)}');
    content = content.replace(/\%\{supplierShare\.toFixed\(1\)\}/g, '{formatPercentagePoints(supplierShare, 1)}');
  }
  
  // Format percentage points
  content = content.replace(/\{formatPercentagePoints\(something, 1\)\}/g, 'something');

  fs.writeFileSync(file, content, 'utf-8');
}

fix('src/components/simulators/ReinvestmentRunwaySim.tsx');
fix('src/components/simulators/ReverseDCFSim.tsx');
fix('src/components/simulators/RoicWaccSim.tsx');
fix('src/components/simulators/ValueStickSim.tsx');

