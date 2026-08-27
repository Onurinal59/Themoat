import React, { createContext, useContext, useState, useEffect } from "react";
import { LearningModule, GlossaryTerm, FormulaGuide, ChecklistItem, Flashcard, CompanyAuditDossier, StepMethodologyGuide } from "../types";
import { MODULES_DATA } from "../data/modulesData";
import { MODULES_DATA_EN } from "../data/modulesDataEn";
import { GLOSSARY_TERMS } from "../data/glossaryData";
import { GLOSSARY_TERMS_EN } from "../data/glossaryDataEn";
import { FORMULA_GUIDES_DATA } from "../data/formulaGuidesData";
import { FORMULA_GUIDES_DATA_EN } from "../data/formulaGuidesDataEn";
import { CHECKLIST_ITEMS, CHECKLIST_ITEMS_EN } from "../data/checklistData";
import { INITIAL_FLASHCARDS, INITIAL_FLASHCARDS_EN } from "../data/flashcardsData";
import {
  INITIAL_PRESET_DOSSIERS,
  MAUBOUSSIN_GUIDED_TEMPLATE,
  STEP_METHODOLOGY_GUIDES,
  BALANCE_SHEET_GUIDE,
  getInitialPresetDossiers,
} from "../data/companyAuditData";
import {
  INITIAL_PRESET_DOSSIERS_EN,
  MAUBOUSSIN_GUIDED_TEMPLATE_EN,
  STEP_METHODOLOGY_GUIDES_EN,
  BALANCE_SHEET_GUIDE_EN,
} from "../data/companyAuditDataEn";

export type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isEnglish: boolean;
  t: (key: string, defaultText?: string) => string;
  getModules: () => LearningModule[];
  getGlossaryTerms: () => GlossaryTerm[];
  getFormulaGuides: () => Record<string, FormulaGuide>;
  getChecklistItems: () => ChecklistItem[];
  getFlashcards: () => Flashcard[];
  getStepMethodologyGuides: () => Record<number, StepMethodologyGuide>;
  getInitialDossiers: () => CompanyAuditDossier[];
  getBalanceSheetGuide: () => any[];
  getMasterTemplate: () => CompanyAuditDossier;
}

const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  tr: {
    // Navigation
    "nav.academy": "Akademi",
    "nav.formulas": "Formüller",
    "nav.lab": "Laboratuvar",
    "nav.companyAudit": "Şirket Röntgeni",
    "nav.moatDuel": "Hendek Düellosu",
    "nav.spacedRepetition": "Aralıklı Tekrarlama",
    "nav.searchPlaceholder": "Terim, formül veya vaka ara... (Cmd+K)",
    "nav.glossary": "Sözlük",
    "nav.guide": "Rehber",
    "nav.aiCoach": "Sokratik AI Koçu",
    "nav.toggleTheme": "Tema Değiştir",
    "nav.switchLanguage": "Dili Değiştir (Language)",
    "nav.quickStats": "Hızlı İlerleme",

    // Workspaces / Portföy
    "workspaces.badge": "Çalışmalarım & Portföyüm",
    "workspaces.localStorageSafe": "Tarayıcıda Güvende (LocalStorage)",
    "workspaces.title": "Kayıtlı Şirket Hendek Analizlerim",
    "workspaces.subtitle": "Borsa İstanbul ve dünya piyasalarında incelediğiniz tüm hisselerin bilanço röntgenlerini, WTP/WTS hendek motorlarını ve notlarını burada saklayın; kaldığınız adımdan anında devam edin!",
    "workspaces.uploadBackup": "Yedekten Yükle (.json)",
    "workspaces.backupAll": "Tümünü Yedekle",
    "workspaces.startNew": "Yeni Şirket Analizi Başlat",
    "workspaces.totalFiles": "Toplam Dosya",
    "workspaces.companies": "şirket",
    "workspaces.myStudies": "Kendi Çalışmalarım",
    "workspaces.customAnalyses": "özgün analiz",
    "workspaces.positiveValue": "Pozitif Değer Yaratan",
    "workspaces.wideMoatCount": "Geniş Hendekli",
    "workspaces.highProtected": "yüksek korumalı",
    "workspaces.masterBannerBadge": "Michael J. Mauboussin Metodolojisi",
    "workspaces.masterTemplateBadge": "Rehberli Örnek Vaka Taslağı",
    "workspaces.masterBannerTitle": "\"Measuring the Moat\" Ustalık Taslağı ile Gerçek Vaka Analizi Yapın",
    "workspaces.masterBannerDesc": "Costco & BİM perakende modelleri üzerinden ROIC & DuPont ayrıştırması, negatif işletme sermayesi, WTP/WTS değer çubuğu ve 20 yıllık CAP ömrü analizini adım adım inceleyin; ister şablonu inceleyin, ister anında kendi şirketiniz için kopyalayın!",
    "workspaces.openGuidedTemplate": "Rehberli Şablonu Aç",
    "workspaces.startFromTemplate": "Bu Şablondan Yeni Başlat",
    "workspaces.searchPlaceholder": "Şirket adı, hisse kodu veya sektör ara...",
    "workspaces.clear": "Temizle",
    "workspaces.filterAll": "Tümü",
    "workspaces.filterTemplate": "Rehber Taslak",
    "workspaces.filterCustom": "Özgün Çalışmalarım",
    "workspaces.filterPresets": "Hazır Vakalar",
    "workspaces.filterWide": "Geniş Hendek",
    "workspaces.filterValueCreating": "Değer Yaratan",
    "workspaces.sortBy": "Sırala:",
    "workspaces.sortUpdated": "Son Düzenlenen",
    "workspaces.sortRoic": "En Yüksek ROIC (%)",
    "workspaces.sortMoatScore": "En Yüksek Hendek Skoru",
    "workspaces.sortName": "Şirket Adı (A-Z)",
    "workspaces.noResultsTitle": "Aramanızla Eşleşen Çalışma Bulunamadı",
    "workspaces.noResultsDesc": "Filtreleri sıfırlayabilir veya hemen yeni bir şirket analizi başlatabilirsiniz.",
    "workspaces.clearFilters": "Filtreleri Temizle",
    "workspaces.addNew": "Yeni Şirket Ekle",
    "workspaces.caseStudy": "Vaka Örneği",
    "workspaces.customAnalysisBadge": "Özgün Analiz",
    "workspaces.moat": "Hendek",
    "workspaces.spread": "Yayılım",
    "workspaces.moatDrivers": "Hendek Motorları:",
    "workspaces.currentStep": "Kaldığın Adım:",
    "workspaces.resumeButton": "Kaldığın Yerden Devam Et",
    "workspaces.resetPresets": "Örnek Vakaları Sıfırla",

    // Hero / Header
    "hero.badge": "Michael J. Mauboussin Metodolojisi",
    "hero.title": "Ekonomik Hendek & ROIC Röntgeni",
    "hero.subtitle": "Sürdürülebilir rekabet avantajını, sermaye getirilerini (ROIC) ve kurumsal değer yaratma mekanizmalarını interaktif simülatörlerle keşfedin.",
    "hero.startJourney": "Öğrenim Yolculuğuna Başla",
    "hero.openFormulas": "Formül Röntgen Atölyesi",

    // Tabs
    "tab.roadmap": "Yol Haritası",
    "tab.formulas": "Formül Atölyesi",
    "tab.simulators": "11 İnteraktif Laboratuvar",
    "tab.companyAudit": "Şirket Röntgeni & KAP",
    "tab.moatDuel": "Hendek Düellosu",
    "tab.spacedRepetition": "Aralıklı Tekrarlama (SM-2)",

    // Roadmap View
    "roadmap.title": "8 Aşamalı Mauboussin Öğrenim Yol Haritası",
    "roadmap.subtitle": "Sıfır finans bilgisiyle başlayıp, profesyonel bir fon yöneticisi gibi şirket analizi yapmayı öğrenin.",
    "roadmap.progress": "Müfredat İlerlemesi",
    "roadmap.completed": "Tamamlandı",
    "roadmap.startModule": "Modüle Başla",
    "roadmap.continueModule": "Devam Et",
    "roadmap.reviewModule": "Tekrar İncele",
    "roadmap.estMinutes": "dk",

    // Module Reader
    "reader.backToRoadmap": "Yol Haritasına Dön",
    "reader.takeaway": "Anahtar Çıkarım",
    "reader.analogy": "Gündelik Hayat Benzetmesi",
    "reader.stepMath": "Adım Adım Hesaplama Örneği",
    "reader.formulaWorkshop": "Canlı Formül Röntgeninde Aç",
    "reader.quizTitle": "Modül Anlama & Pekiştirme Testi",
    "reader.completeModule": "Modülü Tamamla ve İlerle",
    "reader.nextModule": "Sonraki Modül",
    "reader.prevModule": "Önceki Modül",

    // Formula Workshop
    "formulas.title": "Formül & Finansal Röntgen Atölyesi",
    "formulas.subtitle": "Michael Mauboussin'in değerleme matematiği: Parametreleri değiştirin, ROIC, WACC, DuPont ve Tersine DCF dinamiklerini canlı görün.",
    "formulas.selectFormula": "Formül Seçin",
    "formulas.coreEquation": "Temel Denklem",
    "formulas.howItWorks": "Mantığı ve Çıkış Sebebi",
    "formulas.interactiveInputs": "İnteraktif Parametreler",
    "formulas.stepByStep": "Adım Adım Çözüm",
    "formulas.mauboussinRule": "Mauboussin İlkesi",

    // Simulators
    "sim.title": "11 İnteraktif Strateji & Değerleme Laboratuvarı",
    "sim.subtitle": "Rekabet dinamiklerini, mahkumlar ikilemini, değer çubuğunu ve tersine DCF beklentilerini simüle edin.",
    "sim.reset": "Sıfırla",
    "sim.preset": "Örnek Senaryo",

    // Company Audit
    "audit.title": "Şirket Analiz Stüdyosu (10-K & KAP Röntgeni)",
    "audit.subtitle": "Bilanço ve gelir tablosu verilerini girerek düzeltilmiş NOPAT, Yatırılan Sermaye, ROIC ve 5 Adımlı Hendek Değerlendirmesini çıkarın.",
    "audit.selectSample": "Örnek Şirket Seçin",
    "audit.customCompany": "Özel Şirket Analizi",
    "audit.balanceSheet": "Bilanço & Gelir Tablosu Girdileri",
    "audit.forensicAdjustments": "Adli Muhasebe & Düzeltmeler",
    "audit.results": "Analiz Röntgen Sonuçları",
    "audit.verdict": "Nihai Hendek Değerlendirmesi",

    // Moat Duel
    "duel.title": "Şirket Hendek Düellosu",
    "duel.subtitle": "İki şirketi kafa kafaya karşılaştırın: ROIC, fiyatlama gücü, geçiş maliyetleri ve rekabet üstünlüğünü analiz edin.",
    "duel.companyA": "1. Şirket",
    "duel.companyB": "2. Şirket",
    "duel.compare": "Düelloyu Başlat",

    // Spaced Repetition
    "sr.title": "Aralıklı Tekrarlama Laboratuvarı (SuperMemo-2)",
    "sr.subtitle": "Öğrendiğiniz hendek kavramlarını unutma eğrisine meydan okuyarak uzun vadeli hafızanıza kazıyın.",
    "sr.showAnswer": "Cevabı Göster",
    "sr.again": "Tekrar (1 Gün)",
    "sr.hard": "Zor (3 Gün)",
    "sr.good": "İyi (6 Gün)",
    "sr.easy": "Kolay (14 Gün)",
    "sr.allReviewed": "Bugünkü tüm tekrarlar tamamlandı!",

    // Modals
    "glossary.title": "Kapsamlı Finans & Hendek Sözlüğü",
    "glossary.search": "Terim veya anahtar kelime ara...",
    "glossary.allCategories": "Tüm Kategoriler",

    "guide.title": "Ekonomik Hendek Akademisi Kullanım Rehberi",
    "guide.close": "Anladım, Başla",

    "aiCoach.title": "Sokratik Hendek Koçu",
    "aiCoach.placeholder": "Bir şirket, sektör veya finansal kavram hakkında soru sorun...",
    "aiCoach.send": "Gönder",

    // Footer
    "footer.tagline": "Sürdürülebilir Rekabet Avantajı & Kurumsal Değerleme Rehberi",
    "footer.description": "Michael J. Mauboussin ve Dan Callahan'ın dünyaca ünlü araştırmalarını temel alan, hissedarlar ve finansal analistler için tasarlanmış interaktif strateji, ROIC röntgeni ve rekabet avantajı simülasyon platformu.",
    "footer.creator": "Platform Yapımcısı & Geliştirici",
    "footer.contact": "Soru, geri bildirim veya iş birliği önerileriniz için LinkedIn üzerinden doğrudan iletişime geçebilirsiniz.",
    "footer.education": "Eğitim & Modüller",
    "footer.tools": "Laboratuvar & Araçlar",
    "footer.disclaimer": "Bu platform yalnızca finansal analiz, eğitim ve metodolojik öğrenim amaçlıdır; herhangi bir yatırım tavsiyesi (YTD) niteliği taşımaz.",
    "footer.copyright": "© 2026 Ekonomik Hendek Akademisi",
    "footer.author": "Yapımcı: Onur İnal",
  },
  en: {
    // Navigation
    "nav.academy": "Academy",
    "nav.formulas": "Formulas",
    "nav.lab": "Laboratory",
    "nav.companyAudit": "Company X-Ray",
    "nav.moatDuel": "Moat Duel",
    "nav.spacedRepetition": "Spaced Repetition",
    "nav.searchPlaceholder": "Search terms, formulas, or cases... (Cmd+K)",
    "nav.glossary": "Glossary",
    "nav.guide": "User Guide",
    "nav.aiCoach": "Socratic AI Coach",
    "nav.toggleTheme": "Toggle Theme",
    "nav.switchLanguage": "Dil / Language",
    "nav.quickStats": "Quick Progress",

    // Workspaces / Portföy
    "workspaces.badge": "My Workspaces & Portfolio",
    "workspaces.localStorageSafe": "Safely Stored (LocalStorage)",
    "workspaces.title": "Saved Company Moat Studies",
    "workspaces.subtitle": "Keep all balance sheet audits, WTP/WTS moat drivers, and analytical memos in one place; resume instantly from your last audited step!",
    "workspaces.uploadBackup": "Import Backup (.json)",
    "workspaces.backupAll": "Backup All",
    "workspaces.startNew": "Start New Audit",
    "workspaces.totalFiles": "Total Dossiers",
    "workspaces.companies": "companies",
    "workspaces.myStudies": "My Custom Analyses",
    "workspaces.customAnalyses": "custom analyses",
    "workspaces.positiveValue": "Value Creating",
    "workspaces.wideMoatCount": "Wide Moat",
    "workspaces.highProtected": "wide moat",
    "workspaces.masterBannerBadge": "Michael J. Mauboussin Methodology",
    "workspaces.masterTemplateBadge": "Guided Master Case Template",
    "workspaces.masterBannerTitle": "Analyze Real Cases with the \"Measuring the Moat\" Master Template",
    "workspaces.masterBannerDesc": "Explore step-by-step ROIC & DuPont decomposition, negative working capital, WTP/WTS value sticks, and 20-year CAP duration across Costco & retail models; inspect the template or clone it for your target firm!",
    "workspaces.openGuidedTemplate": "Open Guided Template",
    "workspaces.startFromTemplate": "Start Fresh from Template",
    "workspaces.searchPlaceholder": "Search company name, ticker or sector...",
    "workspaces.clear": "Clear",
    "workspaces.filterAll": "All",
    "workspaces.filterTemplate": "Guided Template",
    "workspaces.filterCustom": "My Analyses",
    "workspaces.filterPresets": "Preset Cases",
    "workspaces.filterWide": "Wide Moat",
    "workspaces.filterValueCreating": "Value Creating",
    "workspaces.sortBy": "Sort by:",
    "workspaces.sortUpdated": "Recently Updated",
    "workspaces.sortRoic": "Highest ROIC (%)",
    "workspaces.sortMoatScore": "Highest Moat Score",
    "workspaces.sortName": "Company Name (A-Z)",
    "workspaces.noResultsTitle": "No Matching Analyses Found",
    "workspaces.noResultsDesc": "Reset your active filters or create a new company analysis immediately.",
    "workspaces.clearFilters": "Clear Filters",
    "workspaces.addNew": "Add New Company",
    "workspaces.caseStudy": "Case Study",
    "workspaces.customAnalysisBadge": "Custom Analysis",
    "workspaces.moat": "Moat",
    "workspaces.spread": "Spread",
    "workspaces.moatDrivers": "Moat Drivers:",
    "workspaces.currentStep": "Current Step:",
    "workspaces.resumeButton": "Resume Analysis",
    "workspaces.resetPresets": "Reset Preset Cases",

    // Hero / Header
    "hero.badge": "Michael J. Mauboussin Methodology",
    "hero.title": "Economic Moat & ROIC X-Ray",
    "hero.subtitle": "Explore sustainable competitive advantages, returns on invested capital (ROIC), and corporate value creation mechanics through interactive simulators.",
    "hero.startJourney": "Start Learning Journey",
    "hero.openFormulas": "Formula X-Ray Studio",

    // Tabs
    "tab.roadmap": "Roadmap",
    "tab.formulas": "Formula Workshop",
    "tab.simulators": "11 Interactive Labs",
    "tab.companyAudit": "Company X-Ray & 10-K",
    "tab.moatDuel": "Moat Duel",
    "tab.spacedRepetition": "Spaced Repetition (SM-2)",

    // Roadmap View
    "roadmap.title": "8-Step Mauboussin Learning Curriculum",
    "roadmap.subtitle": "Start from zero financial background and learn to audit corporate moats and returns like an elite fund manager.",
    "roadmap.progress": "Curriculum Progress",
    "roadmap.completed": "Completed",
    "roadmap.startModule": "Start Module",
    "roadmap.continueModule": "Continue",
    "roadmap.reviewModule": "Review Module",
    "roadmap.estMinutes": "min",

    // Module Reader
    "reader.backToRoadmap": "Back to Roadmap",
    "reader.takeaway": "Key Takeaway",
    "reader.analogy": "Everyday Analogy",
    "reader.stepMath": "Step-by-Step Mathematical Proof",
    "reader.formulaWorkshop": "Open in Live Formula Workshop",
    "reader.quizTitle": "Module Retention & Mastery Quiz",
    "reader.completeModule": "Complete Module & Advance",
    "reader.nextModule": "Next Module",
    "reader.prevModule": "Previous Module",

    // Formula Workshop
    "formulas.title": "Formula & Financial X-Ray Workshop",
    "formulas.subtitle": "Michael Mauboussin's valuation math: Adjust live parameters to see real-time shifts in ROIC, WACC, DuPont, and Reverse DCF dynamics.",
    "formulas.selectFormula": "Select Formula",
    "formulas.coreEquation": "Core Equation",
    "formulas.howItWorks": "Economic Logic & Origins",
    "formulas.interactiveInputs": "Interactive Parameters",
    "formulas.stepByStep": "Step-by-Step Breakdown",
    "formulas.mauboussinRule": "Mauboussin Principle",

    // Simulators
    "sim.title": "11 Interactive Strategy & Valuation Labs",
    "sim.subtitle": "Simulate competitive dynamics, prisoner's dilemmas, value sticks, and market-implied reverse DCF expectations.",
    "sim.reset": "Reset",
    "sim.preset": "Preset Scenario",

    // Company Audit
    "audit.title": "Company Audit Studio (10-K & SEC Röntgen)",
    "audit.subtitle": "Input balance sheet and income statement items to compute adjusted NOPAT, Invested Capital, ROIC, and 5-Step Moat Evaluation.",
    "audit.selectSample": "Select Sample Case",
    "audit.customCompany": "Custom Audit",
    "audit.balanceSheet": "Balance Sheet & Income Statement Inputs",
    "audit.forensicAdjustments": "Forensic Accounting & Adjustments",
    "audit.results": "Audit Röntgen Results",
    "audit.verdict": "Final Moat Assessment",

    // Moat Duel
    "duel.title": "Company Moat Duel",
    "duel.subtitle": "Head-to-head corporate comparison: benchmark ROIC, pricing power, customer lock-in, and competitive dominance.",
    "duel.companyA": "Company A",
    "duel.companyB": "Company B",
    "duel.compare": "Launch Duel",

    // Spaced Repetition
    "sr.title": "Spaced Repetition Laboratory (SuperMemo-2)",
    "sr.subtitle": "Defeat the forgetting curve and lock essential financial strategy principles into permanent long-term memory.",
    "sr.showAnswer": "Show Answer",
    "sr.again": "Again (1 Day)",
    "sr.hard": "Hard (3 Days)",
    "sr.good": "Good (6 Days)",
    "sr.easy": "Easy (14 Days)",
    "sr.allReviewed": "All scheduled reviews completed for today!",

    // Modals
    "glossary.title": "Comprehensive Finance & Moat Glossary",
    "glossary.search": "Search terms or keywords...",
    "glossary.allCategories": "All Categories",

    "guide.title": "Economic Moat Academy User Guide",
    "guide.close": "Got it, Start",

    "aiCoach.title": "Socratic Moat Coach",
    "aiCoach.placeholder": "Ask a question about a company, industry, or financial concept...",
    "aiCoach.send": "Send",

    // Footer
    "footer.tagline": "Sustainable Competitive Advantage & Valuation Guide",
    "footer.description": "An interactive strategy, ROIC X-ray, and competitive advantage simulation platform based on the pioneering research of Michael J. Mauboussin and Dan Callahan.",
    "footer.creator": "Platform Creator & Developer",
    "footer.contact": "Feel free to reach out via LinkedIn for questions, feedback, or collaborations.",
    "footer.education": "Curriculum & Modules",
    "footer.tools": "Labs & Tools",
    "footer.disclaimer": "This platform is built strictly for financial analysis, educational, and methodological learning purposes; it does not constitute financial or investment advice.",
    "footer.copyright": "© 2026 Economic Moat Academy",
    "footer.author": "Created by: Onur İnal",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("economic_moat_language");
      if (saved === "tr" || saved === "en") return saved;
      
      // Auto-detect browser language
      const browserLang = typeof window !== "undefined" && (window.navigator.language || (window.navigator.languages && window.navigator.languages[0]));
      if (browserLang && browserLang.toLowerCase().startsWith('tr')) {
        return "tr";
      }
      
      return "en";
    } catch {
      return "tr";
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("economic_moat_language", lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.warn("Could not save language preference", e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "tr" ? "en" : "tr");
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, defaultText?: string): string => {
    const langDict = UI_TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return defaultText || key;
  };

  const getModules = (): LearningModule[] => {
    return language === "en" ? MODULES_DATA_EN : MODULES_DATA;
  };

  const getGlossaryTerms = (): GlossaryTerm[] => {
    return language === "en" ? GLOSSARY_TERMS_EN : GLOSSARY_TERMS;
  };

  const getFormulaGuides = (): Record<string, FormulaGuide> => {
    if (language === "en") {
      return { ...FORMULA_GUIDES_DATA, ...FORMULA_GUIDES_DATA_EN };
    }
    return FORMULA_GUIDES_DATA;
  };

  const getChecklistItems = (): ChecklistItem[] => {
    return language === "en" ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS;
  };

  const getFlashcards = (): Flashcard[] => {
    return language === "en" ? INITIAL_FLASHCARDS_EN : INITIAL_FLASHCARDS;
  };

  const getStepMethodologyGuides = (): Record<number, StepMethodologyGuide> => {
    return language === "en" ? STEP_METHODOLOGY_GUIDES_EN : STEP_METHODOLOGY_GUIDES;
  };

  const getInitialDossiers = (): CompanyAuditDossier[] => {
    return getInitialPresetDossiers(language === "en");
  };

  const getBalanceSheetGuide = (): any[] => {
    return language === "en" ? BALANCE_SHEET_GUIDE_EN : BALANCE_SHEET_GUIDE;
  };

  const getMasterTemplate = (): CompanyAuditDossier => {
    return language === "en" ? MAUBOUSSIN_GUIDED_TEMPLATE_EN : MAUBOUSSIN_GUIDED_TEMPLATE;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isEnglish: language === "en",
        t,
        getModules,
        getGlossaryTerms,
        getFormulaGuides,
        getChecklistItems,
        getFlashcards,
        getStepMethodologyGuides,
        getInitialDossiers,
        getBalanceSheetGuide,
        getMasterTemplate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

