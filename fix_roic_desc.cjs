const fs = require('fs');

let file = 'src/components/simulators/RoicWaccSim.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(/\(\%8\.0\)/g, '(%8,0)');
content = content.replace(/\(\%25\.0 ROIC\)/g, '(%25,0 ROIC)');
content = content.replace(/\(\%14\.0 ROIC\)/g, '(%14,0 ROIC)');
content = content.replace(/\%10\.5/g, '%10,5');
content = content.replace(/\-4\.4/g, '-4,4');

fs.writeFileSync(file, content, 'utf-8');
