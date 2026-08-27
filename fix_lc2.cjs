const fs = require('fs');
let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

const providerAdditions = `
  const formatPercentagePoints = (value: number, maxFD?: number) => fpp(value, language, maxFD);
  const formatUsdFromMillions = (value: number, maxFD?: number) => fumm(value, language, maxFD);
  const formatUsdFromBillions = (value: number, maxFD?: number) => fubb(value, language, maxFD);
  const formatMultiplier = (value: number, maxFD?: number) => fmul(value, language, maxFD);
  const formatDurationYears = (value: number) => fdy(value, language);
`;

content = content.replace('  return (', providerAdditions + '\n  return (');
fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
