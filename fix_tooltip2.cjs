const fs = require('fs');

let file = 'src/components/simulators/ReverseDCFSim.tsx';
let content = fs.readFileSync(file, 'utf-8');

const targetStr = `return isEnglish ? \`$$\${val}M (\${label})\` : \`\${val} Mn $ (\${label})\`;`;
content = content.replace(targetStr, 'return `${formatUsdFromMillions(Number(val))} (${label})`;');

fs.writeFileSync(file, content, 'utf-8');
