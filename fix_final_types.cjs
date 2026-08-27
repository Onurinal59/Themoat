const fs = require('fs');
let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');

const typesCode = `
export interface LanguageContextType {
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
}
`;

content = content.replace('export type Language = "tr" | "en";', 'export type Language = "tr" | "en";\n' + typesCode);
fs.writeFileSync('src/context/LanguageContext.tsx', content, 'utf-8');
console.log("Restored types finally");
