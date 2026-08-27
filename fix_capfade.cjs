const fs = require('fs');

let file = 'src/components/simulators/CapFadeRateSim.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(/ROIC: \%\{p\.initialRoic\}/g, 'ROIC: {formatPercentagePoints(p.initialRoic, 0)}');
content = content.replace(/ROIC: \%\{d\.roic\}/g, 'ROIC: {formatPercentagePoints(d.roic, 1)}');
content = content.replace(/\$\{initialRoic\}/g, '{formatPercentagePoints(initialRoic, 0)}'); // From an earlier error
content = content.replace(/ROIC \%\$\{initialRoic\}/g, 'ROIC ${formatPercentagePoints(initialRoic, 0)}');

fs.writeFileSync(file, content, 'utf-8');
