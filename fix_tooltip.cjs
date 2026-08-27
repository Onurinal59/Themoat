const fs = require('fs');

let file = 'src/components/simulators/ReverseDCFSim.tsx';
let content = fs.readFileSync(file, 'utf-8');

// A more robust replacement
content = content.replace(/prefix=\{isEnglish \? "\$" : ""\} unit=\{isEnglish \? "M" : " Mn \$"\}/g, 'prefix="" unit=""');

content = content.replace(/return isEnglish \? \`\\\$\\\$\\{val\\}M \\\(\\$\\{label\\}\\\)\` : \`\\\$\\{val\\} Mn \\\$ \\\(\\$\\{label\\}\\\)\`;/g, 
  'return `${formatUsdFromMillions(Number(val))} (${label})`;');

// Let's just do a simpler search/replace
content = content.replace(/return isEnglish \? `\$\$\{val\}M \(\$\{label\}\)` : `\$\{val\} Mn \$ \(\$\{label\}\)`;/g, 'return `${formatUsdFromMillions(Number(val))} (${label})`;');

fs.writeFileSync(file, content, 'utf-8');
