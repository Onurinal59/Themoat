const fs = require('fs');

let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

// Update LanguageContextType
const newInterface = `export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isEnglish: boolean;
  t: (key: string, defaultText?: string) => string;
  getModules: () => LearningModule[];
  getGlossaryTerms: () => GlossaryTerm[];
  getFormulaGuides: () => FormulaGuide[];
  getChecklistItems: () => ChecklistItem[];
  getFlashcards: () => Flashcard[];
  getInitialDossiers: () => CompanyAuditDossier[];
  getStepMethodologyGuides: () => StepMethodologyGuide[];
  getBalanceSheetGuide: () => Record<string, string>;
  getMasterTemplate: () => CompanyAuditDossier;
  formatPercent: (value: number, fractionDigits?: number) => string;
  formatCurrency: (value: number) => string;
  formatNumber: (value: number, fractionDigits?: number) => string;
  formatDuration: (minutes: number) => string;
  
  // New ones
  formatPercentagePoints: (value: number, maximumFractionDigits?: number) => string;
  formatUsdFromMillions: (valueInMillions: number, maximumFractionDigits?: number) => string;
  formatUsdFromBillions: (valueInBillions: number, maximumFractionDigits?: number) => string;
  formatMultiplier: (value: number, maximumFractionDigits?: number) => string;
  formatDurationYears: (value: number) => string;
}`;

content = content.replace(/export interface LanguageContextType \{[\s\S]*?\}/, newInterface);

// Add imports
content = `import { formatPercentagePoints as fpp, formatUsdFromMillions as fumm, formatUsdFromBillions as fubb, formatMultiplier as fmul, formatDurationYears as fdy } from '../utils/formatters';\n` + content;

// Update Provider values
const providerAdditions = `
  const formatPercentagePoints = (value: number, maxFD?: number) => fpp(value, language, maxFD);
  const formatUsdFromMillions = (value: number, maxFD?: number) => fumm(value, language, maxFD);
  const formatUsdFromBillions = (value: number, maxFD?: number) => fubb(value, language, maxFD);
  const formatMultiplier = (value: number, maxFD?: number) => fmul(value, language, maxFD);
  const formatDurationYears = (value: number) => fdy(value, language);
`;

const retRegex = /return \(\s*<LanguageContext.Provider\s*value=\{\{([\s\S]*?)\}\}\s*>/;
const match = content.match(retRegex);
if (match) {
  content = content.replace('  const formatDuration = (minutes: number): string => {\n    return `${minutes} min`;\n  };', '  const formatDuration = (minutes: number): string => {\n    return `${minutes} min`;\n  };\n' + providerAdditions);
  
  const newVal = match[1] + `,\n    formatPercentagePoints,\n    formatUsdFromMillions,\n    formatUsdFromBillions,\n    formatMultiplier,\n    formatDurationYears`;
  content = content.replace(match[0], `return (\n    <LanguageContext.Provider value={{${newVal}}}>`);
}

fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
