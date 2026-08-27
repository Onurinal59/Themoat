const fs = require('fs');
const content = fs.readFileSync('src/data/companyAuditData.ts', 'utf8');
console.log(content.includes('JSON.parse(JSON.stringify('));
