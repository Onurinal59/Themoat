const fs = require('fs');

let file = 'src/components/simulators/ReverseDCFSim.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Fix `Current FCF / NOPAT`
content = content.replace(/\$\{currentFCF\}M/g, '{formatUsdFromMillions(currentFCF)}');
// And what about Market Cap?
content = content.replace(/\$\{marketCap\}M/g, '{formatUsdFromBillions(marketCap / 1000, 1)}'); // Wait, the UI uses formatCurrency(marketCap * 1000000) or similar? Let's check how marketCap is displayed.
// Wait, I already fixed marketCap earlier by `{formatUsdFromBillions(marketCap / 1000, 1)}`. 
// Let's check if there are other `${marketCap}M`.
// Let me just replace the YAxis and Tooltip.

content = content.replace(/<YAxis tick=\{\{ fontSize: 10, fill: "#94A3B8" \}\} unit="M" \/>/g, 
  '<YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} tickFormatter={(val) => formatUsdFromMillions(val, 0)} />');

// Tooltip fix
const tooltipOld = `<CustomChartTooltip
                        prefix={isEnglish ? "$" : ""} unit={isEnglish ? "M" : " Mn $"}
                        valueFormatter={(val, name) => {
                          const label = name === "fcf"
                            ? (t("ReverseDCFSim.projected_fcf_1253"))
                            : (t("ReverseDCFSim.discounted_pv_1254"));
                          return isEnglish ? \`$\${val}M (\${label})\` : \`\${val} Mn $ (\${label})\`;
                        }}
                      />`;
const tooltipNew = `<CustomChartTooltip
                        prefix="" unit=""
                        valueFormatter={(val, name) => {
                          const label = name === "fcf"
                            ? (t("ReverseDCFSim.projected_fcf_1253"))
                            : (t("ReverseDCFSim.discounted_pv_1254"));
                          return \`\${formatUsdFromMillions(Number(val))} (\${label})\`;
                        }}
                      />`;
content = content.replace(tooltipOld, tooltipNew);

// Are there any other $...M ?
content = content.replace(/\$\$\{val\}M/g, ' {formatUsdFromMillions(val)}'); // Just in case it's missed

fs.writeFileSync(file, content, 'utf-8');
