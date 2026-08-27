import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FormulaGuide } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { MathFormula } from "./MathFormula";
import {
  Calculator,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Percent,
  Layers,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  FlaskConical,
  Scale,
  RefreshCw,
  Zap,
  Info,
  ChevronRight,
} from "lucide-react";

interface FormulaWorkshopViewProps {
  selectedFormulaId?: string | null;
  onSelectFormula?: (id: string) => void;
  onNavigateToModule?: (moduleId: number) => void;
  onNavigateToSim?: (simId: string) => void;
}

export const FormulaWorkshopView: React.FC<FormulaWorkshopViewProps> = ({
  selectedFormulaId,
  onSelectFormula,
  onNavigateToModule,
  onNavigateToSim,
}) => {
  const { getFormulaGuides, isEnglish } = useLanguage();
  const formulaGuides = getFormulaGuides();
  const [activeId, setActiveId] = useState<string>(selectedFormulaId || "wacc");

  useEffect(() => {
    if (selectedFormulaId && formulaGuides[selectedFormulaId]) {
      setActiveId(selectedFormulaId);
    }
  }, [selectedFormulaId, formulaGuides]);

  const handleFormulaChange = (id: string) => {
    setActiveId(id);
    if (onSelectFormula) onSelectFormula(id);
  };

  const currentGuide: FormulaGuide =
    formulaGuides[activeId] || formulaGuides["wacc"] || Object.values(formulaGuides)[0];


  // ==========================================
  // Interactive Live Calculator States
  // ==========================================

  // 1. WACC State
  const [waccEquity, setWaccEquity] = useState(700);
  const [waccDebt, setWaccDebt] = useState(300);
  const [waccRf, setWaccRf] = useState(10);
  const [waccBeta, setWaccBeta] = useState(1.2);
  const [waccErp, setWaccErp] = useState(5);
  const [waccKd, setWaccKd] = useState(12);
  const [waccTax, setWaccTax] = useState(25);

  // 2. ROIC State
  const [roicEbit, setRoicEbit] = useState(200);
  const [roicTax, setRoicTax] = useState(25);
  const [roicNwc, setRoicNwc] = useState(100);
  const [roicPpe, setRoicPpe] = useState(400);

  // 3. Value Stick State
  const [vsWtp, setVsWtp] = useState(1400);
  const [vsPrice, setVsPrice] = useState(1100);
  const [vsCost, setVsCost] = useState(500);
  const [vsWts, setVsWts] = useState(400);

  // 4. Dickinson State
  const [dickCfo, setDickCfo] = useState<"+" | "-">("+");
  const [dickCfi, setDickCfi] = useState<"+" | "-">("-");
  const [dickCff, setDickCff] = useState<"+" | "-">("-");

  // 5. Profit Pool State
  const [ppSegmentCap, setPpSegmentCap] = useState(450);
  const [ppRoic, setPpRoic] = useState(22);
  const [ppWacc, setPpWacc] = useState(11);

  // 6. Footnote State
  const [fnReportedEbit, setFnReportedEbit] = useState(500);
  const [fnRdExpense, setFnRdExpense] = useState(300);
  const [fnRdAmort, setFnRdAmort] = useState(100);
  const [fnTax, setFnTax] = useState(25);

  // 7. DuPont & CCC State
  const [dpRev, setDpRev] = useState(1000);
  const [dpNopat, setDpNopat] = useState(150);
  const [dpCapital, setDpCapital] = useState(500);
  const [cccDio, setCccDio] = useState(35);
  const [cccDso, setCccDso] = useState(15);
  const [cccDpo, setCccDpo] = useState(65);

  // 8. Reverse DCF State
  const [dcfPrice, setDcfPrice] = useState(250);
  const [dcfNopat, setDcfNopat] = useState(10);
  const [dcfWacc, setDcfWacc] = useState(9);
  const [dcfRoic, setDcfRoic] = useState(18);

  // ==========================================
  // Calculations
  // ==========================================
  // WACC
  const totalV = waccEquity + waccDebt || 1;
  const weightE = waccEquity / totalV;
  const weightD = waccDebt / totalV;
  const calculatedKe = waccRf + waccBeta * waccErp;
  const netKd = waccKd * (1 - waccTax / 100);
  const calculatedWacc = weightE * calculatedKe + weightD * netKd;

  // ROIC
  const calculatedNopat = roicEbit * (1 - roicTax / 100);
  const totalInvestedCapital = roicNwc + roicPpe || 1;
  const calculatedRoic = (calculatedNopat / totalInvestedCapital) * 100;
  const roicSpread = calculatedRoic - calculatedWacc;

  // Value Stick
  const consumerSurplus = Math.max(0, vsWtp - vsPrice);
  const firmMargin = Math.max(0, vsPrice - vsCost);
  const supplierSurplus = Math.max(0, vsCost - vsWts);
  const totalValueCreated = Math.max(0, vsWtp - vsWts);

  // Dickinson Diagnosis
  const getDickinsonStage = () => {
    const key = `${dickCfo}${dickCfi}${dickCff}`;
    switch (key) {
      case "--+":
        return {
          stage: isEnglish ? "1. Introduction Stage (Introduction)" : "1. Giriş Evresi (Introduction)",
          color: "text-amber-500",
          badgeBg: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300",
          desc: isEnglish
            ? "High cash burn, dependent on external debt and equity raises."
            : "Nakit yakımı yüksek, dış sermayeye ve borca bağımlı başlangıç.",
        };
      case "+-+":
        return {
          stage: isEnglish ? "2. Growth Stage (Growth)" : "2. Büyüme Evresi (Growth)",
          color: "text-indigo-500",
          badgeBg: "bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300",
          desc: isEnglish
            ? "Operating cash positive, aggressive expansion funded by reinvestment and leverage."
            : "Operasyon kârda, yoğun yatırım ve borçlanma ile agresif genişleme.",
        };
      case "+--":
        return {
          stage: isEnglish ? "3. Maturity / Cash Cow Compounder (Mature)" : "3. Olgunluk / Nakit İneği (Mature)",
          color: "text-emerald-500",
          badgeBg: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300",
          desc: isEnglish
            ? "Prime compounder! Abundant operating cash, self-funding with dividends and buybacks."
            : "En güçlü evre! Devasa operasyonel nakit, sıfır dış borç ihtiyacı ve düzenli temettü.",
        };
      case "---":
      case "-+-":
      case "-++":
        return {
          stage: isEnglish ? "4. Decline & Asset Divestment (Decline)" : "4. Düşüş & Varlık Satışı (Decline)",
          color: "text-rose-500",
          badgeBg: "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300",
          desc: isEnglish
            ? "Operating cash flow is burning, liquidating assets to stay afloat."
            : "Operasyonlar nakit yakıyor, şirket fabrikalarını satarak ayakta kalıyor.",
        };
      default:
        return {
          stage: isEnglish ? "Shakeout / Restructuring (Shakeout)" : "Sarsıntı / Yeniden Yapılanma (Shakeout)",
          color: "text-purple-500",
          badgeBg: "bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300",
          desc: isEnglish
            ? "Volatile cash flows, industry consolidation, and turnaround restructuring."
            : "Dengesiz nakit akışları, piyasa konsolidasyonu ve kriz yönetimi.",
        };
    }
  };

  // Profit Pool
  const calculatedEconomicProfit = ppSegmentCap * ((ppRoic - ppWacc) / 100);

  // Footnote
  const adjustedEbit = fnReportedEbit + (fnRdExpense - fnRdAmort);
  const adjustedNopat = adjustedEbit * (1 - fnTax / 100);

  // DuPont & CCC
  const nopatMargin = (dpNopat / (dpRev || 1)) * 100;
  const capitalTurnover = dpRev / (dpCapital || 1);
  const dupontRoic = nopatMargin * capitalTurnover;
  const calculatedCcc = cccDio + cccDso - cccDpo;

  // Reverse DCF
  const steadyStateVal = (dcfNopat / (dcfWacc / 100)) || 1;
  const futureGrowthVal = Math.max(0, dcfPrice - steadyStateVal);
  const futureSharePct = Math.min(100, Math.round((futureGrowthVal / (dcfPrice || 1)) * 100));
  const impliedCapYears = Math.max(
    1,
    Math.round((futureGrowthVal / steadyStateVal) * 12 + 2)
  );

  const ALL_FORMULA_KEYS = Object.keys(formulaGuides);

  // Mapping formula ID to relevant module ID
  const FORMULA_TO_MODULE_MAP: Record<string, { moduleId: number; nameTr: string; nameEn: string }> = {
    wacc: { moduleId: 1, nameTr: "Modül 1: ROIC & WACC Temelleri", nameEn: "Module 1: ROIC & WACC Foundations" },
    roic: { moduleId: 1, nameTr: "Modül 1: NOPAT ve Sermaye Tabanı", nameEn: "Module 1: NOPAT & Invested Capital" },
    dickinson: { moduleId: 2, nameTr: "Modül 2: Nakit Akışı Yaşam Döngüsü", nameEn: "Module 2: Cash Flow Lifecycle" },
    "value-stick": { moduleId: 3, nameTr: "Modül 3: Değer Çubuğu & Hendek", nameEn: "Module 3: Value Stick & Moat Dynamics" },
    "profit-pool": { moduleId: 4, nameTr: "Modül 4: Sektör Kâr Havuzları", nameEn: "Module 4: Industry Profit Pools" },
    footnote: { moduleId: 5, nameTr: "Modül 5: 10-K & Ar-Ge Düzeltmeleri", nameEn: "Module 5: 10-K & R&D Adjustments" },
    "dupont-ccc": { moduleId: 7, nameTr: "Modül 7: DuPont & CCC Ayrıştırması", nameEn: "Module 7: DuPont & CCC Breakdown" },
    "reverse-dcf": { moduleId: 8, nameTr: "Modül 8: Tersine DCF & Hendek Süresi", nameEn: "Module 8: Reverse DCF & Implied CAP" },
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl text-slate-800 dark:text-white border border-slate-200/50 dark:border-indigo-900/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-400/30 text-xs font-black uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>{isEnglish ? "Full-Screen Formula & Diagnostic Lab" : "Tam Ekran Formül & Röntgen Atölyesi"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {isEnglish ? "Financial Math & Valuation Formulas" : "Finansal Matematik & Değerleme Formülleri"}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEnglish
                ? "8 fundamental economic moat and corporate finance formulas used by Michael Mauboussin and Morgan Stanley. Test the formulas directly and observe real-time impacts on capital returns and stock valuation."
                : "Michael Mauboussin ve Morgan Stanley analizlerinde kullanılan 8 temel ekonomik hendek formülü. Formülleri doğrudan test edin, sayıları değiştirerek sermaye getirisi ve hisse değerlemesi üzerindeki etkisini canlı izleyin."}
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xs">
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">8</div>
              <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 mt-0.5">{isEnglish ? "Corporate Formulas" : "Kurumsal Formül"}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xs">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">100%</div>
              <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 mt-0.5">{isEnglish ? "Interactive Sandbox" : "İnteraktif Simülatör"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Sidebar Selector + Right Comprehensive Formula Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Formula Selector List (4 Cols on LG) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="px-1 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isEnglish ? `Formulas (${ALL_FORMULA_KEYS.length})` : `Formül Seçimi (${ALL_FORMULA_KEYS.length})`}
            </span>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
              {isEnglish ? "Live Interactive" : "Canlı Hesaplamalı"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {ALL_FORMULA_KEYS.map((key, idx) => {
              const guide = formulaGuides[key];
              const isSelected = activeId === key;
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleFormulaChange(key)}
                  className={`p-3.5 rounded-2xl text-left transition-all border flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/25 ring-2 ring-indigo-400/40"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          isSelected
                            ? "bg-indigo-700/80 text-white"
                            : "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300"
                        }`}
                      >
                        {guide.badge}
                      </span>
                      <span
                        className={`text-[11px] font-mono font-bold ${
                          isSelected ? "text-indigo-200" : "text-slate-400"
                        }`}
                      >
                        #{idx + 1}
                      </span>
                    </div>
                    <div className="font-bold text-sm truncate">{guide.title}</div>
                    <div
                      className={`text-xs truncate ${
                        isSelected ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {guide.subtitle}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 mt-2 transition-transform ${
                      isSelected ? "text-white translate-x-1" : "text-slate-400"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Formula Deep Dive Workspace (8 Cols on LG) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Main Equation & Summary Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-indigo-200/50 dark:border-indigo-900/60 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                  {currentGuide.badge}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
                  {currentGuide.title}
                </h2>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {currentGuide.subtitle}
              </div>
            </div>

            {/* Core Equation Box */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-black uppercase text-indigo-700 dark:text-amber-400 tracking-wider px-1">
                {isEnglish ? "CORE MATHEMATICAL EQUATION" : "MATEMATİKSEL TEMEL EŞİTLİK"}
              </div>
              <MathFormula equation={currentGuide.coreEquation} size="lg" />
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {currentGuide.plainLanguageSummary}
            </p>
          </div>

          {/* Interactive Calculator Workspace */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-6">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {isEnglish ? "Live Interactive Calculator" : "Canlı İnteraktif Hesaplayıcı"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isEnglish
                      ? "Adjust values dynamically to observe formula sensitivity and outcome changes."
                      : "Değerleri değiştirerek formülün anında nasıl tepki verdiğini ve sonucunu izleyin."}
                  </p>
                </div>
              </div>
            </div>

            {/* 1. WACC Panel */}
            {currentGuide.calculatorType === "wacc" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Equity (E):" : "Özsermaye (E):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {waccEquity}M {isEnglish ? "$" : "TL"} ({Math.round(weightE * 100)}%)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="50"
                      value={waccEquity}
                      onChange={(e) => setWaccEquity(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Total Debt (D):" : "Toplam Borç (D):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {waccDebt}M {isEnglish ? "$" : "TL"} ({Math.round(weightD * 100)}%)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      step="50"
                      value={waccDebt}
                      onChange={(e) => setWaccDebt(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Equity Beta (β):" : "Hisse Betası (β):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {waccBeta.toFixed(2)}x (Ke = %{calculatedKe.toFixed(1)})
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={waccBeta}
                      onChange={(e) => setWaccBeta(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Pre-tax Cost of Debt (Kd):" : "Brüt Kredi Faizi (Kd):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        %{waccKd}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={waccKd}
                      onChange={(e) => setWaccKd(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Effective Tax Rate (t):" : "Vergi Oranı (t):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        %{waccTax} ({isEnglish ? "After-tax Kd" : "Net Kd"}: %{netKd.toFixed(1)})
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="35"
                      step="1"
                      value={waccTax}
                      onChange={(e) => setWaccTax(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Risk-Free Rate (Rf):" : "Risksiz Faiz (Rf):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        %{waccRf}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="20"
                      step="1"
                      value={waccRf}
                      onChange={(e) => setWaccRf(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-slate-800/90 text-slate-900 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-indigo-200 dark:border-indigo-800/80 shadow-xs">
                  <div>
                    <div className="text-xs text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider">
                      {isEnglish ? "Calculated Cost of Capital (WACC)" : "Hesaplanan Sermaye Maliyeti (WACC)"}
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-amber-300 font-mono mt-0.5">
                      %{calculatedWacc.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-indigo-200 leading-relaxed max-w-md text-right sm:text-left">
                    {isEnglish
                      ? `Equity Contribution: %${(weightE * calculatedKe).toFixed(1)} + After-tax Debt: %${(weightD * netKd).toFixed(1)}. The firm must earn at least %${calculatedWacc.toFixed(1)} NOPAT per $100 of invested capital to preserve economic value.`
                      : `Özsermaye Katkısı: %${(weightE * calculatedKe).toFixed(1)} + Net Borç Katkısı: %${(weightD * netKd).toFixed(1)}. Şirket her 100 TL için yıllık en az %${calculatedWacc.toFixed(1)} NOPAT üretmelidir.`}
                  </div>
                </div>
              </div>
            )}

            {/* 2. ROIC Panel */}
            {currentGuide.calculatorType === "roic" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Operating Profit (EBIT):" : "Faaliyet Kârı (EBIT):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {roicEbit}M {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="1000"
                      step="20"
                      value={roicEbit}
                      onChange={(e) => setRoicEbit(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Tax Rate (t):" : "Vergi Oranı (t):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        %{roicTax}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="35"
                      step="1"
                      value={roicTax}
                      onChange={(e) => setRoicTax(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Net Working Capital (NWC):" : "İşletme Sermayesi (NWC):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {roicNwc}M {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={roicNwc}
                      onChange={(e) => setRoicNwc(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Fixed Assets (PP&E):" : "Maddi Duran Varlık (PP&E):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {roicPpe}M {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="2000"
                      step="50"
                      value={roicPpe}
                      onChange={(e) => setRoicPpe(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-slate-800/90 text-slate-900 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-200 dark:border-emerald-800/80 shadow-xs">
                  <div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider">
                      {isEnglish ? "Calculated ROIC" : "Hesaplanan ROIC Getirisi"}
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                      %{calculatedRoic.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md text-right sm:text-left">
                    {isEnglish
                      ? `NOPAT: $${calculatedNopat.toFixed(1)}M | Invested Capital: $${totalInvestedCapital}M. The firm generates $${calculatedRoic.toFixed(1)} of pure cash return per $100 of invested capital.`
                      : `Net Faaliyet Kârı (NOPAT): ${calculatedNopat.toFixed(1)}M TL | Bağlanan Sermaye: ${totalInvestedCapital}M TL. Şirket bağladığı her 100 TL ile net ${calculatedRoic.toFixed(1)} TL kâr üretmektedir.`}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Value Stick Panel */}
            {currentGuide.calculatorType === "value-stick" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Willingness to Pay (WTP):" : "Ödemeye İsteklilik (WTP):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {vsWtp} {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="600"
                      max="2000"
                      step="50"
                      value={vsWtp}
                      onChange={(e) => setVsWtp(Math.max(vsPrice, Number(e.target.value)))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Selling Price (P):" : "Satış Fiyatı (P):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {vsPrice} {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="400"
                      max="1800"
                      step="50"
                      value={vsPrice}
                      onChange={(e) => setVsPrice(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Unit Cost (C):" : "Birim Maliyet (C):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {vsCost} {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="1200"
                      step="25"
                      value={vsCost}
                      onChange={(e) => setVsCost(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Willingness to Sell (WTS):" : "Satmaya İsteklilik (WTS):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {vsWts} {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="800"
                      step="25"
                      value={vsWts}
                      onChange={(e) => setVsWts(Math.min(vsCost, Number(e.target.value)))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                {/* Value Stick Graphical Distribution */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isEnglish
                      ? `Value Appropriation Distribution (Total: $${totalValueCreated} Surplus)`
                      : `Değer Paylaşımı Dağılımı (Toplam: ${totalValueCreated} TL Refah)`}
                  </div>
                  <div className="flex h-9 rounded-xl overflow-hidden shadow-inner text-xs font-black text-white text-center leading-9">
                    <div
                      style={{ width: `${(consumerSurplus / (totalValueCreated || 1)) * 100}%` }}
                      className="bg-indigo-500 truncate px-2"
                    >
                      {isEnglish ? "Customer" : "Tüketici"}: {consumerSurplus} {isEnglish ? "$" : "TL"} ({Math.round((consumerSurplus / (totalValueCreated || 1)) * 100)}%)
                    </div>
                    <div
                      style={{ width: `${(firmMargin / (totalValueCreated || 1)) * 100}%` }}
                      className="bg-emerald-500 truncate px-2"
                    >
                      {isEnglish ? "Firm Margin" : "Şirket Kârı"}: {firmMargin} {isEnglish ? "$" : "TL"} ({Math.round((firmMargin / (totalValueCreated || 1)) * 100)}%)
                    </div>
                    <div
                      style={{ width: `${(supplierSurplus / (totalValueCreated || 1)) * 100}%` }}
                      className="bg-amber-500 truncate px-2"
                    >
                      {isEnglish ? "Supplier" : "Tedarikçi"}: {supplierSurplus} {isEnglish ? "$" : "TL"} ({Math.round((supplierSurplus / (totalValueCreated || 1)) * 100)}%)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Dickinson Panel */}
            {currentGuide.calculatorType === "dickinson" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isEnglish ? "Operating Cash Flow (CFO)" : "Faaliyet Nakit Akışı (CFO)"}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDickCfo("+")}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          dickCfo === "+"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                        }`}
                      >
                        {isEnglish ? "Positive (+)" : "Pozitif (+)"}
                      </button>
                      <button
                        onClick={() => setDickCfo("-")}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          dickCfo === "-"
                            ? "bg-rose-600 text-white shadow-xs"
                            : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                        }`}
                      >
                        {isEnglish ? "Negative (-)" : "Negatif (-)"}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isEnglish ? "Investing Cash Flow (CFI)" : "Yatırım Nakit Akışı (CFI)"}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDickCfi("+")}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          dickCfi === "+"
                            ? "bg-rose-600 text-white shadow-xs"
                            : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                        }`}
                      >
                        {isEnglish ? "Positive (+) [Divest]" : "Pozitif (+) [Varlık Satışı]"}
                      </button>
                      <button
                        onClick={() => setDickCfi("-")}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          dickCfi === "-"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                        }`}
                      >
                        {isEnglish ? "Negative (-) [CapEx]" : "Negatif (-) [Yatırım]"}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isEnglish ? "Financing Cash Flow (CFF)" : "Finansman Nakit Akışı (CFF)"}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDickCff("+")}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          dickCff === "+"
                            ? "bg-indigo-600 text-white shadow-xs"
                            : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                        }`}
                      >
                        {isEnglish ? "Positive (+) [Debt/Equity]" : "Pozitif (+) [Borçlanma]"}
                      </button>
                      <button
                        onClick={() => setDickCff("-")}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          dickCff === "-"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                        }`}
                      >
                        {isEnglish ? "Negative (-) [Dividend/Repay]" : "Negatif (-) [Temettü]"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Diagnosis Box */}
                {(() => {
                  const diag = getDickinsonStage();
                  return (
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${diag.badgeBg}`}>
                          {diag.stage}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {diag.desc}
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 5. Profit Pool Panel */}
            {currentGuide.calculatorType === "profit-pool" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Segment Capital:" : "Segment Sermayesi:"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {ppSegmentCap}M {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="1500"
                      step="50"
                      value={ppSegmentCap}
                      onChange={(e) => setPpSegmentCap(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Segment ROIC:" : "Segment ROIC:"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        %{ppRoic}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      step="1"
                      value={ppRoic}
                      onChange={(e) => setPpRoic(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Cost of Capital (WACC):" : "Sermaye Maliyeti (WACC):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        %{ppWacc}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="1"
                      value={ppWacc}
                      onChange={(e) => setPpWacc(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-slate-800/90 text-slate-900 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-indigo-200 dark:border-indigo-800/80 shadow-xs">
                  <div>
                    <div className="text-xs text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider">
                      {isEnglish ? "Segment Economic Profit (Box Area)" : "Segment Ekonomik Kârı (Kutu Alanı)"}
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-amber-300 font-mono mt-0.5">
                      {calculatedEconomicProfit > 0 ? "+" : ""}{calculatedEconomicProfit.toFixed(1)}M {isEnglish ? "$" : "TL"}
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md text-right sm:text-left">
                    {isEnglish
                      ? `Economic Spread: %${(ppRoic - ppWacc).toFixed(1)}. ${calculatedEconomicProfit >= 0 ? "The segment creates industry wealth!" : "Value destruction occurring!"}`
                      : `Ekonomik Yayılım: %${(ppRoic - ppWacc).toFixed(1)}. ${calculatedEconomicProfit >= 0 ? "Şirket sektörel refah yaratıyor!" : "Şirket değer yakıyor (Value destruction)!"}`}
                  </div>
                </div>
              </div>
            )}

            {/* 6. Footnote Panel */}
            {currentGuide.calculatorType === "footnote" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Reported EBIT:" : "Raporlanan EBIT:"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {fnReportedEbit}M {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="1500"
                      step="50"
                      value={fnReportedEbit}
                      onChange={(e) => setFnReportedEbit(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Current R&D Expense:" : "Cari Ar-Ge Harcaması:"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {fnRdExpense}M {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="800"
                      step="25"
                      value={fnRdExpense}
                      onChange={(e) => setFnRdExpense(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Annual R&D Amortization:" : "Yıllık Ar-Ge İtfası:"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {fnRdAmort}M {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="400"
                      step="10"
                      value={fnRdAmort}
                      onChange={(e) => setFnRdAmort(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Tax Rate (t):" : "Vergi Oranı (t):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        %{fnTax}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="35"
                      step="1"
                      value={fnTax}
                      onChange={(e) => setFnTax(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50 dark:bg-slate-800/90 text-slate-900 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-purple-200 dark:border-purple-800/80 shadow-xs">
                  <div>
                    <div className="text-xs text-purple-700 dark:text-purple-300 font-bold uppercase tracking-wider">
                      {isEnglish ? "Adjusted Operating Profit (Adjusted NOPAT)" : "Düzeltilmiş Faaliyet Kârı (Adjusted NOPAT)"}
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-300 font-mono mt-0.5">
                      {adjustedNopat.toFixed(1)}M {isEnglish ? "$" : "TL"}
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md text-right sm:text-left">
                    {isEnglish
                      ? `Reported EBIT: $${fnReportedEbit}M → Adjusted EBIT: $${adjustedEbit}M (+$${fnRdExpense - fnRdAmort}M net R&D capitalization impact).`
                      : `Raporlanan EBIT: ${fnReportedEbit}M TL → Düzeltilmiş EBIT: ${adjustedEbit}M TL (+${fnRdExpense - fnRdAmort}M TL net Ar-Ge aktifleştirme katkısı).`}
                  </div>
                </div>
              </div>
            )}

            {/* 7. DuPont & CCC Panel */}
            {currentGuide.calculatorType === "dupont-ccc" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Net Sales (Revenue):" : "Net Satışlar (Ciro):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {dpRev}M {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="3000"
                      step="50"
                      value={dpRev}
                      onChange={(e) => setDpRev(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "NOPAT Profit:" : "NOPAT Kârı:"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {dpNopat}M {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="800"
                      step="10"
                      value={dpNopat}
                      onChange={(e) => setDpNopat(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Invested Capital:" : "Yatırılan Sermaye:"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {dpCapital}M {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="50"
                      value={dpCapital}
                      onChange={(e) => setDpCapital(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-around gap-4 text-center">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase">{isEnglish ? "1. NOPAT Margin" : "1. NOPAT Marjı"}</div>
                    <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      %{nopatMargin.toFixed(1)}
                    </div>
                  </div>
                  <div className="text-slate-400 font-black">×</div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase">{isEnglish ? "2. Capital Turnover" : "2. Sermaye Devri"}</div>
                    <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {capitalTurnover.toFixed(2)}x
                    </div>
                  </div>
                  <div className="text-slate-400 font-black">=</div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase">DuPont ROIC</div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      %{dupontRoic.toFixed(1)}
                    </div>
                  </div>
                </div>

                {/* CCC Sub-calculator */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
                  <div className="text-xs font-bold text-indigo-900 dark:text-indigo-300">
                    {isEnglish
                      ? `Cash Conversion Cycle (CCC): DIO (${cccDio} days) + DSO (${cccDso} days) - DPO (${cccDpo} days)`
                      : `Nakit Dönüşüm Süresi (CCC) Simülatörü: DIO (${cccDio} gün) + DSO (${cccDso} gün) - DPO (${cccDpo} gün)`}
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {calculatedCcc} {isEnglish ? "Days" : "Gün"}
                    </div>
                    <div className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed max-w-sm">
                      {calculatedCcc < 0
                        ? (isEnglish ? "🚀 Negative CCC: Funded by suppliers' cash (Amazon model)!" : "🚀 Negatif CCC: Şirket tedarikçinin parasıyla büyüyor (Amazon modeli)!")
                        : (isEnglish ? "⏳ Positive CCC: Working capital tied up in inventory & receivables." : "⏳ Pozitif CCC: Şirket stok ve alacakta nakit bağlıyor.")}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 8. Reverse DCF Panel */}
            {currentGuide.calculatorType === "reverse-dcf" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Current Stock Price:" : "Cari Hisse Fiyatı:"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {dcfPrice} {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="1000"
                      step="10"
                      value={dcfPrice}
                      onChange={(e) => setDcfPrice(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "NOPAT per Share:" : "Hisse Başına NOPAT:"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {dcfNopat} {isEnglish ? "$" : "TL"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      value={dcfNopat}
                      onChange={(e) => setDcfNopat(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Cost of Capital (WACC):" : "Sermaye Maliyeti (WACC):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        %{dcfWacc}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="18"
                      step="0.5"
                      value={dcfWacc}
                      onChange={(e) => setDcfWacc(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isEnglish ? "Return on Capital (ROIC):" : "Sermaye Getirisi (ROIC):"}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        %{dcfRoic}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="35"
                      step="1"
                      value={dcfRoic}
                      onChange={(e) => setDcfRoic(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 dark:bg-slate-800/90 text-slate-900 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-200 dark:border-amber-800/80 shadow-xs">
                  <div>
                    <div className="text-xs text-amber-700 dark:text-amber-300 font-bold uppercase tracking-wider">
                      {isEnglish ? "Market-Implied Competitive Advantage Period (CAP)" : "Piyasanın Fiyatladığı Hendek Süresi (İma Edilen CAP)"}
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                      ~{impliedCapYears} {isEnglish ? "Years" : "Yıl"}
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md text-right sm:text-left">
                    {isEnglish
                      ? `Steady State Value: $${steadyStateVal.toFixed(0)} (%${100 - futureSharePct}) | Future Growth Expectation: $${futureGrowthVal.toFixed(0)} (%${futureSharePct}).`
                      : `Sıfır Büyüme Değeri: ${steadyStateVal.toFixed(0)} TL (%${100 - futureSharePct}) | Gelecek Büyüme Beklentisi: ${futureGrowthVal.toFixed(0)} TL (%${futureSharePct}).`}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Parameters / Variables Breakdown Grid */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{isEnglish ? "Formula Variables & Balance Sheet Extraction" : "Formül Değişkenleri & Bilançodan Çıkarılışı"}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentGuide.variables.map((v, vIdx) => (
                <div
                  key={vIdx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono font-black text-xs border border-indigo-200 dark:border-indigo-800/60">
                      {v.symbol}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {v.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {v.description}
                  </p>
                  <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                    📂 {v.howToFindIt}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step by Step Numerical Case Math */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl text-slate-900 dark:text-slate-100 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-5">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-sans font-bold text-amber-600 dark:text-amber-400 text-xs uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{isEnglish ? "Step-by-Step Numerical Procedure & Case Study" : "Adım Adım Hesaplama Prosedürü & Gerçek Şirket Örneği"}</span>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {currentGuide.realWorldExample.company}
              </span>
            </div>

            {/* Real World Scenario */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentGuide.realWorldExample.scenario}
              </div>

              {/* Step pills */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/80">
                {currentGuide.realWorldExample.calculationSteps.map((stepStr, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-amber-300 font-mono text-xs leading-relaxed shadow-2xs"
                  >
                    {stepStr}
                  </div>
                ))}
              </div>

              {/* Result Interpretation */}
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-300 text-xs leading-relaxed font-sans font-medium">
                💡 <strong>{isEnglish ? "Analysis Takeaway:" : "Analiz Sonucu:"}</strong> {currentGuide.realWorldExample.resultInterpretation}
              </div>
            </div>
          </div>

          {/* Practical Intuition & Mauboussin Moat Rule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{isEnglish ? "Why This Formula Exists" : "Neden Bu Formül Var?"}</span>
              </div>
              <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                {currentGuide.whyThisFormulaExists}
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>{isEnglish ? "Common Traps & Pitfalls" : "Sık Yapılan Hatalar & Tuzaklar"}</span>
              </div>
              <ul className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1.5 list-disc list-inside">
                {currentGuide.commonPitfalls.map((pitfall, pIdx) => (
                  <li key={pIdx}>{pitfall}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="p-5 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {isEnglish ? "Associated Academy Module" : "Bu Formülü İçeren Akademi Modülü"}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {FORMULA_TO_MODULE_MAP[activeId]
                  ? (isEnglish ? FORMULA_TO_MODULE_MAP[activeId].nameEn : FORMULA_TO_MODULE_MAP[activeId].nameTr)
                  : (isEnglish ? "Related Theory & Case Study" : "İlgili Teori ve Vaka İncelemesi")}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {onNavigateToModule && FORMULA_TO_MODULE_MAP[activeId] && (
                <button
                  onClick={() => onNavigateToModule(FORMULA_TO_MODULE_MAP[activeId].moduleId)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-102"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{isEnglish ? "Read & Test Module" : "Modülü Oku & Test Et"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
  );
};
