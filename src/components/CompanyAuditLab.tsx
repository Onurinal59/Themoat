import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  Plus,
  Trash2,
  Save,
  FileText,
  Calculator,
  Layers,
  Shield,
  Zap,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Copy,
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight,
  Share2,
  FolderKanban,
  ArrowLeft,
  Download,
  Upload,
  RotateCcw,
  ShieldAlert,
  Swords
} from "lucide-react";
import { CompanyAuditDossier } from "../types";
import {
  BALANCE_SHEET_GUIDE,
  INITIAL_PRESET_DOSSIERS,
  MAUBOUSSIN_GUIDED_TEMPLATE,
  STEP_METHODOLOGY_GUIDES,
  calculateFinancialOutputs,
  computeMoatScore,
  getBalanceSheetGuide,
  getInitialPresetDossiers,
  translateMoatDriver,
  translateMoatType,
  translateMoatWidth,
  translateSummaryTag,
  translateCategory
} from "../data/companyAuditData";
import { useLanguage } from "../context/LanguageContext";
import { MyWorkspacesView } from "./MyWorkspacesView";
import { MauboussinMethodologyCoach } from "./MauboussinMethodologyCoach";
import { InvestmentCommitteeModal } from "./InvestmentCommitteeModal";

interface CompanyAuditLabProps {
  onOpenAICoachWithPrompt?: (prompt: string) => void;
  onOpenGlossary?: (termId?: string) => void;
}

export function CompanyAuditLab({ onOpenAICoachWithPrompt, onOpenGlossary }: CompanyAuditLabProps) {
  const { isEnglish, t, formatCurrency, formatPercent, formatNumber } = useLanguage();
  // Modal for Investment Committee Devil's Advocate
  const [isCommitteeModalOpen, setIsCommitteeModalOpen] = useState(false);
  // Saved dossiers in local storage or fallback to presets
  const [dossiers, setDossiers] = useState<CompanyAuditDossier[]>(() => {
    const saved = localStorage.getItem("moat_dossiers");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const valid = parsed.filter(item => item && item.id && item.companyName && item.financials);
          if (valid.length > 0) return valid;
        }
      } catch (e) {
        console.error("Dossiers parse error:", e);
      }
    }
    return getInitialPresetDossiers(isEnglish);
  });

  const [selectedId, setSelectedId] = useState<string>(() => {
    const lastActive = localStorage.getItem("moat_last_selected_id");
    if (lastActive) {
      return lastActive;
    }
    const presets = getInitialPresetDossiers(isEnglish);
    return presets[0].id;
  });

  const [viewMode, setViewMode] = useState<"studio" | "workspaces">("workspaces");
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>(() => new Date().toLocaleTimeString(t("CompanyAuditLab.en_us_11"), { hour: "2-digit", minute: "2-digit" }));
  const [saveFlash, setSaveFlash] = useState(false);

  // Auto-heal: Ensure any new preset dossiers added to the system are available to the user
  useEffect(() => {
    setDossiers((prev) => {
      const presets = getInitialPresetDossiers(isEnglish);
      const existingIds = new Set(prev.map(d => d.id));
      const missingPresets = presets.filter(p => !existingIds.has(p.id));
      
      if (missingPresets.length > 0) {
        return [...prev, ...missingPresets];
      }
      return prev;
    });
  }, []);

  // Sync to local storage whenever dossiers change
  useEffect(() => {
    localStorage.setItem("moat_dossiers", JSON.stringify(dossiers));
    const now = new Date().toLocaleTimeString(t("CompanyAuditLab.en_us_12"), { hour: "2-digit", minute: "2-digit" });
    setLastSavedTime(now);
  }, [dossiers, isEnglish]);

  // Translate preset dossiers when language changes
  useEffect(() => {
    setDossiers((prev) => {
      const presets = getInitialPresetDossiers(isEnglish);
      const presetMap = new Map(presets.map((p) => [p.id, p]));
      
      return prev.map((d) => {
        if (!d.isCustom && presetMap.has(d.id)) {
          const localized = presetMap.get(d.id)!;
          return {
            ...d,
            companyName: localized.companyName,
            industry: localized.industry,
            description: localized.description,
            notes: d.notes === "" || d.notes === "Premier modern example of software-backed high switching costs combined with ecosystem network effects." || d.notes.includes("Michael Mauboussin") ? localized.notes : d.notes,
            industryStructure: {
              ...d.industryStructure,
              profitPoolPosition: localized.industryStructure.profitPoolPosition
            },
            competitiveAdvantage: {
              ...d.competitiveAdvantage,
              pricingPowerEvidence: localized.competitiveAdvantage.pricingPowerEvidence,
              costAdvantageEvidence: localized.competitiveAdvantage.costAdvantageEvidence
            },
            sustainability: {
              ...d.sustainability,
              keyVulnerability: localized.sustainability.keyVulnerability
            }
          };
        }
        return d;
      });
    });
  }, [isEnglish]);

  // Sync selectedId to local storage
  useEffect(() => {
    localStorage.setItem("moat_last_selected_id", selectedId);
  }, [selectedId]);

  const currentDossier = dossiers.find((d) => d.id === selectedId) || dossiers[0] || getInitialPresetDossiers(isEnglish)[0];

  // Whenever selected dossier changes, restore its lastStep
  const handleSelectDossier = (id: string, step?: 1 | 2 | 3 | 4 | 5) => {
    setSelectedId(id);
    const target = dossiers.find((d) => d.id === id);
    if (step) {
      setActiveStep(step);
    } else if (target && target.lastStep) {
      setActiveStep(target.lastStep);
    } else {
      setActiveStep(1);
    }
  };

  const handleStepChange = (newStep: 1 | 2 | 3 | 4 | 5) => {
    setActiveStep(newStep);
    // Persist step into the active dossier
    handleUpdateCurrentDossier({ lastStep: newStep });
  };

  const handleUpdateCurrentDossier = (updated: Partial<CompanyAuditDossier>) => {
    setDossiers((prev) =>
      prev.map((d) =>
        d.id === currentDossier.id
          ? {
              ...d,
              ...updated,
              updatedAt: new Date().toISOString().split("T")[0]
            }
          : d
      )
    );
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 2000);
  };

  const handleFinancialChange = (field: keyof CompanyAuditDossier["financials"], value: number) => {
    handleUpdateCurrentDossier({
      financials: {
        ...currentDossier.financials,
        [field]: value
      }
    });
  };

  const handleAddNewCompany = () => {
    const newId = "dossier-custom-" + Date.now();
    const newDossier: CompanyAuditDossier = {
      id: newId,
      companyName: t("CompanyAuditLab.new_analyzed_company_13"),
      ticker: "TICKER",
      industry: t("CompanyAuditLab.specify_industry_14"),
      description: t("CompanyAuditLab.company_s_core_busin_15"),
      isCustom: true,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      lastStep: 1,
      financials: {
        revenue: 10000,
        operatingIncome: 1500,
        effectiveTaxRate: 22,
        totalAssets: 12000,
        cashAndEquivalents: 2000,
        nonInterestCurrentLiabilities: 2500,
        wacc: 12
      },
      industryStructure: {
        threatOfNewEntrants: "orta",
        supplierPower: "orta",
        buyerPower: "orta",
        threatOfSubstitutes: "düşük",
        industryRivalry: "orta",
        profitPoolPosition: ""
      },
      competitiveAdvantage: {
        primaryType: "tüketici_avantajı",
        subDrivers: [t("CompanyAuditLab.brand_search_costs_16")],
        pricingPowerEvidence: "",
        costAdvantageEvidence: ""
      },
      interactionAndDiscipline: {
        capacityDiscipline: "yüksek",
        priceWarRisk: "düşük",
        managementCapitalAllocation: "mükemmel"
      },
      sustainability: {
        moatWidth: "Dar Hendek (Narrow)",
        estimatedCapYears: 8,
        keyVulnerability: ""
      },
      notes: ""
    };

    setDossiers((prev) => [newDossier, ...prev]);
    setSelectedId(newId);
    setActiveStep(1);
    setViewMode("studio");
  };

  const handleDuplicateDossier = (dossier: CompanyAuditDossier) => {
    const newId = "dossier-custom-" + Date.now();
    const cloned: CompanyAuditDossier = {
      ...dossier,
      id: newId,
      companyName: isEnglish ? `${dossier.companyName} (Copy)` : `${dossier.companyName} (Kopya)`,
      isCustom: true,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      lastStep: 1
    };

    setDossiers((prev) => [cloned, ...prev]);
    setSelectedId(newId);
    setActiveStep(1);
    setViewMode("studio");
  };

  const handleDeleteDossier = (id: string) => {
    if (dossiers.length <= 1) {
      console.warn(t("CompanyAuditLab.at_least_one_dossier_17"));
      return;
    }
    const filtered = dossiers.filter((d) => d.id !== id);
    setDossiers(filtered);
    setSelectedId(filtered[0].id);
    setActiveStep(1);
  };

  const handleImportDossiers = (imported: CompanyAuditDossier[]) => {
    if (!imported || imported.length === 0) return;
    
    // Validate required fields roughly before importing
    const validImports = imported.filter(item => 
      item && item.id && item.companyName && item.financials && 
      typeof item.financials.revenue === 'number' &&
      typeof item.financials.operatingIncome === 'number'
    );
    
    if (validImports.length === 0) return;

    const existingIds = new Set(dossiers.map((d) => d.id));
    const newUnique = validImports.filter((item) => !existingIds.has(item.id));
    if (newUnique.length > 0) {
      setDossiers((prev) => [...newUnique, ...prev]);
      setSelectedId(newUnique[0].id);
    } else {
      setSelectedId(validImports[0].id);
    }
  };

  const handleResetToPresets = () => {
    const presets = getInitialPresetDossiers(isEnglish);
    const customOnes = dossiers.filter((d) => d.isCustom);
    setDossiers([...customOnes, ...presets]);
    setSelectedId(presets[0].id);
  };

  const finCalc = calculateFinancialOutputs(currentDossier.financials);
  const moatScore = computeMoatScore(currentDossier);

  const copyReportToClipboard = () => {
    const reportText = `
=== ${currentDossier.companyName} (${currentDossier.ticker}) MAUBOUSSIN MOAT AUDIT REPORT ===
${t("CompanyAuditLab.industry_18")}: ${currentDossier.industry}
${t("CompanyAuditLab.date_19")}: ${currentDossier.updatedAt}

1. ${t("CompanyAuditLab.financial_x_ray_roic_20")}
- ROIC: %${finCalc.roicPercent} (WACC: %${currentDossier.financials.wacc} | Spread: ${finCalc.spread >= 0 ? "+" : ""}%${finCalc.spread})
- ${t("CompanyAuditLab.value_status_21")}: ${finCalc.isCreatingValue ? (t("CompanyAuditLab.creating_value_22")) : (t("CompanyAuditLab.destroying_value_23"))}
- NOPAT: ${finCalc.nopat} M
- ${t("CompanyAuditLab.invested_capital_24")}: ${finCalc.investedCapital} M
- NOPAT Margin: %${finCalc.nopatMarginPercent}
- Capital Turnover: ${finCalc.capitalTurnover}x
- ${t("CompanyAuditLab.annual_economic_prof_25")}: ${finCalc.economicProfit} M

2. ${t("CompanyAuditLab.industry_structure_f_26")}
- Threat of New Entrants: ${currentDossier.industryStructure.threatOfNewEntrants}
- Supplier Power: ${currentDossier.industryStructure.supplierPower}
- Buyer Power: ${currentDossier.industryStructure.buyerPower}
- Threat of Substitutes: ${currentDossier.industryStructure.threatOfSubstitutes}
- Industry Rivalry: ${currentDossier.industryStructure.industryRivalry}

3. ${t("CompanyAuditLab.competitive_advantag_27")}
- Primary Type: ${currentDossier.competitiveAdvantage.primaryType}
- Sub Drivers: ${currentDossier.competitiveAdvantage.subDrivers.join(", ")}
- Pricing Power: ${currentDossier.competitiveAdvantage.pricingPowerEvidence || (t("CompanyAuditLab.n_a_28"))}
- Cost Advantage: ${currentDossier.competitiveAdvantage.costAdvantageEvidence || (t("CompanyAuditLab.n_a_29"))}

4. ${t("CompanyAuditLab.capital_allocation_g_30")}
- Capacity Discipline: ${currentDossier.interactionAndDiscipline.capacityDiscipline}
- Price War Risk: ${currentDossier.interactionAndDiscipline.priceWarRisk}
- Capital Allocation: ${currentDossier.interactionAndDiscipline.managementCapitalAllocation}

5. ${t("CompanyAuditLab.final_assessment_sus_31")}
- Diagnosed Moat: ${moatScore.diagnosedMoat}
- Moat Score: %${moatScore.scorePercent} / 100
- Estimated CAP: ${currentDossier.sustainability.estimatedCapYears} ${t("CompanyAuditLab.years_32")}
- Key Vulnerability: ${currentDossier.sustainability.keyVulnerability || (t("CompanyAuditLab.n_a_33"))}

${t("CompanyAuditLab.notes_34")}: ${currentDossier.notes || (t("CompanyAuditLab.no_notes_35"))}
=============================================
`;
    navigator.clipboard.writeText(reportText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const askAICoachAboutThisCompany = () => {
    if (!onOpenAICoachWithPrompt) return;
    const prompt = isEnglish
      ? `Can you evaluate this company according to Michael Mauboussin's 'Measuring the Moat' methodology?

Company: ${currentDossier.companyName} (${currentDossier.ticker})
Industry: ${currentDossier.industry}
ROIC: %${finCalc.roicPercent} (WACC: %${currentDossier.financials.wacc}, Spread: %${finCalc.spread})
NOPAT Margin: %${finCalc.nopatMarginPercent}, Capital Turnover: ${finCalc.capitalTurnover}x
Moat Type: ${currentDossier.competitiveAdvantage.primaryType}
Moat Drivers: ${currentDossier.competitiveAdvantage.subDrivers.join(", ")}
Estimated CAP: ${currentDossier.sustainability.estimatedCapYears} years
Key Vulnerability: ${currentDossier.sustainability.keyVulnerability}

What are the critical moat risks and competitive longevity for this business?`
      : `Michael Mauboussin'in "Measuring the Moat" metodolojisine göre bu şirketi değerlendirir misin?

${isEnglish ? "Company" : "Şirket"}: ${currentDossier.companyName} (${currentDossier.ticker})
${isEnglish ? "Industry" : "Sektör"}: ${currentDossier.industry}
ROIC: %${finCalc.roicPercent} (WACC: %${currentDossier.financials.wacc}, Fark: %${finCalc.spread})
NOPAT Marjı: %${finCalc.nopatMarginPercent}, Sermaye Devir Hızı: ${finCalc.capitalTurnover}x
Hendek Türü: ${currentDossier.competitiveAdvantage.primaryType}
Hendek Motorları: ${currentDossier.competitiveAdvantage.subDrivers.join(", ")}
Tahmini CAP Süresi: ${currentDossier.sustainability.estimatedCapYears} yıl
Kırılganlık: ${currentDossier.sustainability.keyVulnerability}

Bu şirketin hendek genişliği, sermaye tahsisi ve uzun vadeli rekabet riski hakkında derinlemesine bir analiz ve öneri verir misin?`;

    onOpenAICoachWithPrompt(prompt);
  };

  const onOpenAICoachWithPromptProxy = (prompt: string) => {
    if (onOpenAICoachWithPrompt) {
      onOpenAICoachWithPrompt(prompt);
    }
  };

  const balanceSheetGuideList = getBalanceSheetGuide(isEnglish);

  return (
    <div className="space-y-6 w-full mx-auto" id="company-audit-laboratory">
      {/* Top Workspace / Studio Toggle Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("workspaces")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              viewMode === "workspaces"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>📁 {isEnglish ? `My Workspaces (${dossiers.length})` : `Çalışmalarım (${dossiers.length})`}</span>
          </button>

          <button
            onClick={() => setViewMode("studio")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              viewMode === "studio"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>🔬 {t("CompanyAuditLab.balance_sheet_moat_s_36")}</span>
          </button>
        </div>

        {/* Live Auto-Save Status Badge */}
        <div className="flex items-center justify-between sm:justify-end gap-3 px-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${saveFlash ? "bg-amber-400 animate-ping" : "bg-emerald-500"}`}></span>
            <span className="font-mono text-[11px]">
              {saveFlash
                ? (t("CompanyAuditLab.saving_37"))
                : isEnglish
                ? `Auto-saved: ${lastSavedTime}`
                : `Otomatik kaydedildi: ${lastSavedTime}`}
            </span>
          </div>

          {viewMode === "studio" && (
            <button
              onClick={() => {
                handleUpdateCurrentDossier({});
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
              title={t("CompanyAuditLab.manually_confirm_cha_38")}
            >
              <Save className="w-3 h-3 text-indigo-500" />
              <span>{t("CompanyAuditLab.save_39")}</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODES WITH SMOOTH TRANSITIONS */}
      <AnimatePresence mode="wait">
        {viewMode === "workspaces" ? (
          <motion.div
            key="workspaces-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <MyWorkspacesView
              dossiers={dossiers}
              activeDossierId={selectedId}
              onSelectDossier={handleSelectDossier}
              onCreateNew={handleAddNewCompany}
              onDuplicateDossier={handleDuplicateDossier}
              onDeleteDossier={handleDeleteDossier}
              onImportDossiers={handleImportDossiers}
              onResetToPresets={handleResetToPresets}
              onOpenAuditStudio={() => setViewMode("studio")}
            />
          </motion.div>
        ) : (
          /* VIEW 2: ACTIVE COMPANY AUDIT STUDIO */
          <motion.div
            key="studio-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Header Banner */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("workspaces")}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> {t("CompanyAuditLab.all_workspaces_40")}
                  </button>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                    {t("CompanyAuditLab.active_file_41")} {currentDossier.companyName} ({currentDossier.ticker})
                  </span>
                  {currentDossier.isCustom && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> {t("CompanyAuditLab.custom_study_42")}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {currentDossier.companyName} ({currentDossier.ticker}) — {t("CompanyAuditLab.moat_diagnosis_43")}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                  {t("CompanyAuditLab.fill_in_the_balance_44")}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const existing = dossiers.find((d) => d.id === MAUBOUSSIN_GUIDED_TEMPLATE.id);
                    if (existing) {
                      handleSelectDossier(existing.id, 1);
                    } else {
                      setDossiers((prev) => [MAUBOUSSIN_GUIDED_TEMPLATE, ...prev]);
                      setSelectedId(MAUBOUSSIN_GUIDED_TEMPLATE.id);
                      setActiveStep(1);
                    }
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                    currentDossier.id === MAUBOUSSIN_GUIDED_TEMPLATE.id
                      ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                      : "bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
                  }`}
                  title={t("CompanyAuditLab.open_mauboussin_meas_45")}
                >
                  <Award className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                  <span>📘 {t("CompanyAuditLab.mauboussin_master_gu_46")}</span>
                </button>
                <button
                  onClick={() => setIsGuideModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  {t("CompanyAuditLab.balance_sheet_guide_47")}
                </button>
                <button
                  onClick={handleAddNewCompany}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  {t("CompanyAuditLab.add_new_company_48")}
                </button>
              </div>
            </div>

            {/* Company Quick-Switch Horizontal Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-start gap-2 flex-wrap pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 shrink-0">
                {t("CompanyAuditLab.switch_dossier_49")}
              </span>
              {dossiers.map((doss) => {
                const isSelected = doss.id === currentDossier.id;
                const isMauboussin = doss.id === MAUBOUSSIN_GUIDED_TEMPLATE.id;
                return (
                  <button
                    key={doss.id}
                    onClick={() => handleSelectDossier(doss.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                    }`}
                  >
                    {isMauboussin && <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    <span>{doss.companyName}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? "bg-indigo-700 text-indigo-100" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"}`}>
                      {doss.ticker}
                    </span>
                  </button>
                );
              })}

              {/* Duplicate & Copy Actions for active dossier */}
              <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-2">
                <button
                  onClick={() => handleDuplicateDossier(currentDossier)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  title={t("CompanyAuditLab.create_a_clone_of_th_50")}
                >
                  <Copy className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{t("CompanyAuditLab.clone_51")}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Master Case Study Active Banner */}
          {currentDossier.id === MAUBOUSSIN_GUIDED_TEMPLATE.id && (
            <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-indigo-500/5 border border-amber-500/30 dark:border-amber-500/20 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                    {t("CompanyAuditLab.master_case_study_mi_52")}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
                    {t("CompanyAuditLab.this_dossier_is_a_pr_53")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDuplicateDossier(currentDossier)}
                className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{t("CompanyAuditLab.copy_template_to_my_54")}</span>
              </button>
            </div>
          )}

          {/* Main Audit Workspace Form & Diagnostics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Interactive 5-Step Process (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step Navigation Tabs */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 flex items-center justify-start gap-1 sm:gap-2 shadow-xs flex-wrap">
                {[
                  { step: 1, title: t("CompanyAuditLab.1_financial_x_ray_ro_55"), icon: Calculator },
                  { step: 2, title: t("CompanyAuditLab.2_industry_profit_po_56"), icon: Layers },
                  { step: 3, title: t("CompanyAuditLab.3_value_stick_moat_57"), icon: Shield },
                  { step: 4, title: t("CompanyAuditLab.4_game_theory_capita_58"), icon: Zap },
                  { step: 5, title: t("CompanyAuditLab.5_assessment_diagnos_59"), icon: Award }
                ].map((st) => {
                  const IconComp = st.icon;
                  const isActive = activeStep === st.step;
                  return (
                    <button
                      key={st.step}
                      onClick={() => handleStepChange(st.step as any)}
                      className={`flex-1 min-w-[120px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{st.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mauboussin Methodology Coach Guide for the Active Step */}
              <MauboussinMethodologyCoach
                activeStep={activeStep}
                isTemplateDossier={currentDossier.id === MAUBOUSSIN_GUIDED_TEMPLATE.id}
                onAskAICoach={askAICoachAboutThisCompany}
                onOpenGlossary={onOpenGlossary}
              />

              {/* ANIMATED STEP CONTENT CONTAINER */}
              <AnimatePresence mode="wait">
                {/* STEP 1: FINANCIAL INPUTS & ROIC / DUPONT */}
                {activeStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs"
                  >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    {t("CompanyAuditLab.step_1_financial_x_r_60")}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {t("CompanyAuditLab.enter_the_7_critical_61")}
                  </p>
                </div>
                <button
                  onClick={() => setIsGuideModalOpen(true)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> {t("CompanyAuditLab.where_to_find_62")}
                </button>
              </div>

              {/* Company Info Header */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t("CompanyAuditLab.company_name_63")}</label>
                  <input
                    type="text"
                    value={currentDossier.companyName}
                    onChange={(e) => handleUpdateCurrentDossier({ companyName: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t("CompanyAuditLab.ticker_symbol_64")}</label>
                  <input
                    type="text"
                    value={currentDossier.ticker}
                    onChange={(e) => handleUpdateCurrentDossier({ ticker: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-mono text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t("CompanyAuditLab.industry_sector_65")}</label>
                  <input
                    type="text"
                    value={currentDossier.industry}
                    onChange={(e) => handleUpdateCurrentDossier({ industry: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Number Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t("CompanyAuditLab.1_annual_revenue_66")}
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">{t("CompanyAuditLab.million_usd_local_67")}</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.revenue}
                    onChange={(e) => handleFinancialChange("revenue", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t("CompanyAuditLab.top_line_on_the_inco_68")}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t("CompanyAuditLab.2_operating_income_e_69")}
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">{t("CompanyAuditLab.million_usd_local_70")}</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.operatingIncome}
                    onChange={(e) => handleFinancialChange("operatingIncome", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t("CompanyAuditLab.operating_profit_bef_71")}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t("CompanyAuditLab.3_effective_tax_rate_72")}
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">%</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.effectiveTaxRate}
                    onChange={(e) => handleFinancialChange("effectiveTaxRate", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t("CompanyAuditLab.tax_expense_pre_tax_73")}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t("CompanyAuditLab.4_total_assets_74")}
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">{t("CompanyAuditLab.million_usd_local_75")}</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.totalAssets}
                    onChange={(e) => handleFinancialChange("totalAssets", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t("CompanyAuditLab.total_assets_on_the_76")}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t("CompanyAuditLab.5_cash_cash_equivale_77")}
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">{t("CompanyAuditLab.million_usd_local_78")}</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.cashAndEquivalents}
                    onChange={(e) => handleFinancialChange("cashAndEquivalents", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t("CompanyAuditLab.excess_idle_cash_and_79")}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t("CompanyAuditLab.6_non_interest_beari_80")}
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">{t("CompanyAuditLab.million_usd_local_81")}</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.nonInterestCurrentLiabilities}
                    onChange={(e) => handleFinancialChange("nonInterestCurrentLiabilities", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t("CompanyAuditLab.accounts_payable_to_82")}
                  </p>
                </div>

                <div className="sm:col-span-2 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                      {t("CompanyAuditLab.7_cost_of_capital_wa_83")}
                    </label>
                    <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400">%{currentDossier.financials.wacc}</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={45}
                    value={currentDossier.financials.wacc}
                    onChange={(e) => handleFinancialChange("wacc", Number(e.target.value))}
                    className="w-full h-2 bg-indigo-200 dark:bg-indigo-900/60 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300">
                    {t("CompanyAuditLab.minimum_hurdle_rate_84")}
                  </p>
                </div>
              </div>

              {/* Next Step Action */}
              <div className="pt-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {t("CompanyAuditLab.proceed_to_step_2_in_85")} <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: INDUSTRY STRUCTURE & PROFIT POOL */}
          {activeStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs"
            >
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  {t("CompanyAuditLab.step_2_industry_stru_86")}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {t("CompanyAuditLab.as_michael_porter_an_87")}
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "threatOfNewEntrants",
                    label: t("CompanyAuditLab.1_threat_of_new_entr_88"),
                    desc: t("CompanyAuditLab.can_a_new_rival_ente_89"),
                    goodIsLow: true
                  },
                  {
                    key: "supplierPower",
                    label: t("CompanyAuditLab.2_bargaining_power_o_90"),
                    desc: t("CompanyAuditLab.can_key_input_suppli_91"),
                    goodIsLow: true
                  },
                  {
                    key: "buyerPower",
                    label: t("CompanyAuditLab.3_bargaining_power_o_92"),
                    desc: t("CompanyAuditLab.can_buyers_exert_lev_93"),
                    goodIsLow: true
                  },
                  {
                    key: "threatOfSubstitutes",
                    label: t("CompanyAuditLab.4_threat_of_substitu_94"),
                    desc: t("CompanyAuditLab.can_customers_switch_95"),
                    goodIsLow: true
                  },
                  {
                    key: "industryRivalry",
                    label: t("CompanyAuditLab.5_industry_rivalry_i_96"),
                    desc: t("CompanyAuditLab.do_competitors_engag_97"),
                    goodIsLow: true
                  }
                ].map((item) => {
                  const val = currentDossier.industryStructure[item.key as keyof CompanyAuditDossier["industryStructure"]];
                  return (
                    <div key={item.key} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.label}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {(["düşük", "orta", "yüksek"] as const).map((level) => {
                          const isSelected = val === level;
                          const isFavorable = (level === "düşük" && item.goodIsLow) || (level === "yüksek" && !item.goodIsLow);
                          const levelLabels = {
                            düşük: t("CompanyAuditLab.low_98"),
                            orta: t("CompanyAuditLab.medium_99"),
                            yüksek: t("CompanyAuditLab.high_100")
                          };
                          return (
                            <button
                              key={level}
                              onClick={() => {
                                handleUpdateCurrentDossier({
                                  industryStructure: {
                                    ...currentDossier.industryStructure,
                                    [item.key]: level
                                  }
                                });
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                                isSelected
                                  ? isFavorable
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                    : "bg-rose-600 text-white border-rose-600 shadow-xs"
                                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                              }`}
                            >
                              {levelLabels[level]}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {t("CompanyAuditLab.industry_profit_pool_101")}
                  </label>
                  <textarea
                    rows={2}
                    value={currentDossier.industryStructure.profitPoolPosition}
                    onChange={(e) =>
                      handleUpdateCurrentDossier({
                        industryStructure: {
                          ...currentDossier.industryStructure,
                          profitPoolPosition: e.target.value
                        }
                      })
                    }
                    placeholder={t("CompanyAuditLab.which_segment_in_the_102")}
                    className="mt-1.5 w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  {t("CompanyAuditLab.back_to_financials_103")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {t("CompanyAuditLab.proceed_to_step_3_mo_104")} <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: VALUE STICK & COMPETITIVE ADVANTAGE DRIVERS */}
          {activeStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs"
            >
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  {t("CompanyAuditLab.step_3_value_stick_s_105")}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {t("CompanyAuditLab.where_does_the_econo_106")}
                </p>
              </div>

              {/* Primary Advantage Radio */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t("CompanyAuditLab.primary_competitive_107")}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: "tüketici_avantajı",
                      title: t("CompanyAuditLab.consumer_advantage_w_108"),
                      desc: t("CompanyAuditLab.high_pricing_power_b_109")
                    },
                    {
                      id: "üretim_avantajı",
                      title: t("CompanyAuditLab.production_process_a_110"),
                      desc: t("CompanyAuditLab.secret_recipe_patent_111")
                    },
                    {
                      id: "ölçek_avantajı",
                      title: t("CompanyAuditLab.scale_advantage_unit_112"),
                      desc: t("CompanyAuditLab.lowest_unit_cost_ena_113")
                    }
                  ].map((t) => {
                    const isSelected = currentDossier.competitiveAdvantage.primaryType === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          handleUpdateCurrentDossier({
                            competitiveAdvantage: {
                              ...currentDossier.competitiveAdvantage,
                              primaryType: t.id as any
                            }
                          });
                        }}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-50/70 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-500"
                            : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-indigo-200"
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{t.title}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{t.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Moat Sub-driver checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t("CompanyAuditLab.active_moat_sub_driv_114")}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "Ölçek Ekonomisi", labelTr: "Ölçek Ekonomisi", labelEn: "Economies of Scale" },
                    { id: "Geçiş Maliyeti", labelTr: "Geçiş Maliyeti", labelEn: "Switching Costs" },
                    { id: "Süreç Üstünlüğü", labelTr: "Süreç Üstünlüğü", labelEn: "Process Advantage" },
                    { id: "Nitelikli Tedarikçi Pazarlığı", labelTr: "Nitelikli Tedarikçi Pazarlığı", labelEn: "Supplier Bargaining Power" },
                    { id: "Marka/Arama Maliyeti", labelTr: "Marka/Arama Maliyeti", labelEn: "Brand and Search Costs" },
                    { id: "Ağ Etkisi", labelTr: "Ağ Etkisi", labelEn: "Network Effects" },
                    { id: "Patent/Lisans", labelTr: "Patent/Lisans", labelEn: "Patents / Licenses" }
                  ].map((subObj) => {
                    const targetEn = translateMoatDriver(subObj.id, true);
                    const currentSubs = currentDossier.competitiveAdvantage.subDrivers;
                    const hasSub = currentSubs.some((s) => translateMoatDriver(s, true) === targetEn);
                    const displayLabel = isEnglish ? subObj.labelEn : subObj.labelTr;

                    return (
                      <button
                        key={subObj.id}
                        onClick={() => {
                          const newSubs = hasSub
                            ? currentSubs.filter((s) => translateMoatDriver(s, true) !== targetEn)
                            : [...currentSubs, isEnglish ? subObj.labelEn : subObj.labelTr];
                          handleUpdateCurrentDossier({
                            competitiveAdvantage: {
                              ...currentDossier.competitiveAdvantage,
                              subDrivers: newSubs
                            }
                          });
                        }}
                        className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all cursor-pointer ${
                          hasSub
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700"
                            : "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <span>{displayLabel}</span>
                        {hasSub ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Evidence Text areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {t("CompanyAuditLab.pricing_power_eviden_115")}
                  </label>
                  <textarea
                    rows={2}
                    value={currentDossier.competitiveAdvantage.pricingPowerEvidence}
                    onChange={(e) =>
                      handleUpdateCurrentDossier({
                        competitiveAdvantage: {
                          ...currentDossier.competitiveAdvantage,
                          pricingPowerEvidence: e.target.value
                        }
                      })
                    }
                    placeholder={t("CompanyAuditLab.did_the_company_rais_116")}
                    className="mt-1 w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {t("CompanyAuditLab.cost_process_advanta_117")}
                  </label>
                  <textarea
                    rows={2}
                    value={currentDossier.competitiveAdvantage.costAdvantageEvidence}
                    onChange={(e) =>
                      handleUpdateCurrentDossier({
                        competitiveAdvantage: {
                          ...currentDossier.competitiveAdvantage,
                          costAdvantageEvidence: e.target.value
                        }
                      })
                    }
                    placeholder={t("CompanyAuditLab.operating_expenses_c_118")}
                    className="mt-1 w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  {t("CompanyAuditLab.back_to_industry_119")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {t("CompanyAuditLab.proceed_to_step_4_ga_120")} <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: INTERACTION, GAME THEORY & CAPITAL ALLOCATION */}
          {activeStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs"
            >
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  {t("CompanyAuditLab.step_4_dynamic_inter_121")}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {t("CompanyAuditLab.probability_of_destr_122")}
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t("CompanyAuditLab.1_capacity_disciplin_123")}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t("CompanyAuditLab.is_there_a_risk_of_i_124")}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(["yüksek", "orta", "düşük"] as const).map((lvl) => {
                      const lvlLabels = {
                        yüksek: t("CompanyAuditLab.high_125"),
                        orta: t("CompanyAuditLab.medium_126"),
                        düşük: t("CompanyAuditLab.low_127")
                      };
                      return (
                        <button
                          key={lvl}
                          onClick={() =>
                            handleUpdateCurrentDossier({
                              interactionAndDiscipline: {
                                ...currentDossier.interactionAndDiscipline,
                                capacityDiscipline: lvl
                              }
                            })
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                            currentDossier.interactionAndDiscipline.capacityDiscipline === lvl
                              ? lvl === "yüksek"
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {lvlLabels[lvl]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t("CompanyAuditLab.2_price_war_risk_pri_128")}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t("CompanyAuditLab.do_competitors_engag_129")}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(["düşük", "orta", "yüksek"] as const).map((lvl) => {
                      const lvlLabels = {
                        düşük: t("CompanyAuditLab.low_130"),
                        orta: t("CompanyAuditLab.medium_131"),
                        yüksek: t("CompanyAuditLab.high_132")
                      };
                      return (
                        <button
                          key={lvl}
                          onClick={() =>
                            handleUpdateCurrentDossier({
                              interactionAndDiscipline: {
                                ...currentDossier.interactionAndDiscipline,
                                priceWarRisk: lvl
                              }
                            })
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                            currentDossier.interactionAndDiscipline.priceWarRisk === lvl
                              ? lvl === "düşük"
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-rose-600 text-white border-rose-600"
                              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {lvlLabels[lvl]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t("CompanyAuditLab.3_management_capital_133")}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t("CompanyAuditLab.does_management_rein_134")}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(["mükemmel", "ortalama", "kötü"] as const).map((lvl) => {
                      const lvlLabels = {
                        mükemmel: t("CompanyAuditLab.excellent_135"),
                        ortalama: t("CompanyAuditLab.average_136"),
                        kötü: t("CompanyAuditLab.poor_137")
                      };
                      return (
                        <button
                          key={lvl}
                          onClick={() =>
                            handleUpdateCurrentDossier({
                              interactionAndDiscipline: {
                                ...currentDossier.interactionAndDiscipline,
                                managementCapitalAllocation: lvl
                              }
                            })
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                            currentDossier.interactionAndDiscipline.managementCapitalAllocation === lvl
                              ? lvl === "mükemmel"
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-amber-600 text-white border-amber-600"
                              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {lvlLabels[lvl]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  {t("CompanyAuditLab.back_to_moat_driver_138")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(5)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {t("CompanyAuditLab.final_step_generate_139")} <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: SUSTAINABILITY & FULL DOSSIER REPORT */}
          {activeStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    {t("CompanyAuditLab.step_5_final_moat_di_140")}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {t("CompanyAuditLab.economic_moat_summar_141")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyReportToClipboard}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedNotification ? (t("CompanyAuditLab.copied_142")) : t("CompanyAuditLab.copy_report_143")}
                  </button>
                  <button
                    onClick={askAICoachAboutThisCompany}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-indigo-200 dark:border-indigo-800"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {t("CompanyAuditLab.review_with_ai_coach_144")}
                  </button>
                </div>
              </div>

              {/* Final Verdict Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {t("CompanyAuditLab.diagnosed_moat_width_145")}
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-2">
                    {translateMoatWidth(moatScore.diagnosedMoat, isEnglish)}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {moatScore.summaryTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50"
                      >
                        {translateSummaryTag(tag, isEnglish)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs shrink-0 w-full md:w-auto">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{t("CompanyAuditLab.mauboussin_moat_scor_146")}</div>
                  <div className="text-3xl font-mono font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                    %{moatScore.scorePercent}
                  </div>
                  <div className="text-[10px] text-slate-400">{t("CompanyAuditLab.out_of_100_147")}</div>
                </div>
              </div>

              {/* Sustainability Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t("CompanyAuditLab.estimated_competitiv_148")}
                    </label>
                    <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {currentDossier.sustainability.estimatedCapYears} {t("CompanyAuditLab.years_149")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={currentDossier.sustainability.estimatedCapYears}
                    onChange={(e) =>
                      handleUpdateCurrentDossier({
                        sustainability: {
                          ...currentDossier.sustainability,
                          estimatedCapYears: Number(e.target.value)
                        }
                      })
                    }
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t("CompanyAuditLab.estimated_number_of_150")}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {t("CompanyAuditLab.key_moat_threat_vuln_151")}
                  </label>
                  <input
                    type="text"
                    value={currentDossier.sustainability.keyVulnerability}
                    onChange={(e) =>
                      handleUpdateCurrentDossier({
                        sustainability: {
                          ...currentDossier.sustainability,
                          keyVulnerability: e.target.value
                        }
                      })
                    }
                    placeholder={t("CompanyAuditLab.e_g_regulatory_scrut_152")}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Final Notes */}
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t("CompanyAuditLab.personal_investment_153")}
                </label>
                <textarea
                  rows={3}
                  value={currentDossier.notes}
                  onChange={(e) => handleUpdateCurrentDossier({ notes: e.target.value })}
                  placeholder={t("CompanyAuditLab.why_does_this_compan_154")}
                  className="mt-1 w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Challenge Your Thesis: Investment Committee (Devil's Advocate) Callout */}
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-gradient-to-r dark:from-slate-900 dark:to-indigo-950 text-slate-800 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-3 border border-amber-200/80 dark:border-indigo-900/50 shadow-xs dark:shadow-md">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                      {t("CompanyAuditLab.investment_committee_155")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg">
                    {t("CompanyAuditLab.stress_test_your_the_156")}
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCommitteeModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>{t("CompanyAuditLab.present_to_committee_157")}</span>
                </motion.button>
              </div>

              {/* Dossier Danger Zone / Delete */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleDeleteDossier(currentDossier.id)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> {t("CompanyAuditLab.delete_this_study_158")}
                </button>
                <span className="text-[11px] text-slate-400">{isEnglish ? `Last Updated: ${currentDossier.updatedAt}` : `Son Güncelleme: ${currentDossier.updatedAt}`}</span>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>

        {/* Right Column: Live Diagnostic Dashboard & DuPont Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main Financial Health Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t("CompanyAuditLab.live_roic_diagnosis_159")}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                  finCalc.isCreatingValue
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                }`}
              >
                {finCalc.isCreatingValue ? (t("CompanyAuditLab.creating_value_160")) : t("CompanyAuditLab.destroying_value_161")}
              </span>
            </div>

            {/* Big ROIC vs WACC Spread */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center space-y-1">
              <div className="text-xs text-slate-500 dark:text-slate-400">{t("CompanyAuditLab.roic_return_on_inves_162")}</div>
              <div
                className={`text-3xl sm:text-4xl font-mono font-black ${
                  finCalc.roicPercent >= currentDossier.financials.wacc
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                %{finCalc.roicPercent}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 font-mono">
                WACC: %{currentDossier.financials.wacc} | {t("CompanyAuditLab.spread_163")}:{" "}
                <strong className={finCalc.spread >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                  {finCalc.spread > 0 ? `+${finCalc.spread}%` : `${finCalc.spread}%`}
                </strong>
              </div>
            </div>

            {/* DuPont Breakdown */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t("CompanyAuditLab.mauboussin_dupont_de_164")}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">{t("CompanyAuditLab.nopat_margin_profita_165")}</div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    %{finCalc.nopatMarginPercent}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">{t("CompanyAuditLab.capital_turnover_eff_166")}</div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {finCalc.capitalTurnover}x
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                ROIC = %{finCalc.nopatMarginPercent} × {finCalc.capitalTurnover}x = %{finCalc.roicPercent}
              </p>
            </div>

            {/* Financial Intermediate Details */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>{t("CompanyAuditLab.nopat_net_operating_167")}</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{finCalc.nopat} {t("CompanyAuditLab.million_168")}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>{t("CompanyAuditLab.invested_capital_ic_169")}</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{finCalc.investedCapital} {t("CompanyAuditLab.million_170")}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>{t("CompanyAuditLab.annual_economic_prof_171")}</span>
                <span className={`font-bold ${finCalc.economicProfit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {finCalc.economicProfit >= 0 ? `+${finCalc.economicProfit}` : finCalc.economicProfit} {t("CompanyAuditLab.million_172")}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Learning Callout */}
          <div className="p-5 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              {t("CompanyAuditLab.market_analyst_insig_173")}
            </div>
            <p className="text-xs text-indigo-900/80 dark:text-indigo-300/90 leading-relaxed">
              {t("CompanyAuditLab.revenue_growth_alone_174")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {/* MODAL: Balance Sheet & 10-K Field Guide */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  {t("CompanyAuditLab.balance_sheet_x_ray_175")}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {t("CompanyAuditLab.field_guide_for_extr_176")}
                </p>
              </div>
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {balanceSheetGuideList.map((guide) => (
                <div
                  key={guide.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{guide.metricName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                      {guide.formula}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/70">
                      <strong className="text-indigo-600 dark:text-indigo-400 block mb-0.5">🇹🇷 KAP / BIST'te Nerede?</strong>
                      <span className="text-slate-600 dark:text-slate-300">{guide.whereToFindTr}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/70">
                      <strong className="text-indigo-600 dark:text-indigo-400 block mb-0.5">🇺🇸 SEC 10-K / US'te Nerede?</strong>
                      <span className="text-slate-600 dark:text-slate-300">{guide.whereToFindUs}</span>
                    </div>
                  </div>

                  <div className="pt-1 text-slate-700 dark:text-slate-300">
                    <strong>{t("CompanyAuditLab.practical_meaning_177")}</strong> {guide.practicalMeaning}
                  </div>
                  <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-900/50">
                    💡 <strong>{t("CompanyAuditLab.common_trap_warning_178")}</strong> {guide.warningTip}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs cursor-pointer hover:bg-indigo-700 transition-colors"
              >
                {t("CompanyAuditLab.got_it_return_to_aud_179")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Investment Committee Devil's Advocate */}
      <InvestmentCommitteeModal
        isOpen={isCommitteeModalOpen}
        onClose={() => setIsCommitteeModalOpen(false)}
        dossier={currentDossier}
        onAskAICoach={onOpenAICoachWithPromptProxy}
      />
    </div>
  );
}
