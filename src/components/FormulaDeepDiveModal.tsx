import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FormulaGuide } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { MathFormula } from "./MathFormula";
import {
  Calculator,
  X,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Layers,
  Percent,
  DollarSign,
  Building2,
  ChevronRight,
  BookOpen,
} from "lucide-react";

interface FormulaDeepDiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  formulaId?: string | null;
  initialFormulaId?: string | null;
  onSelectFormula?: (id: string) => void;
  onOpenFullPage?: (formulaId: string) => void;
}

export const FormulaDeepDiveModal: React.FC<FormulaDeepDiveModalProps> = ({
  isOpen,
  onClose,
  formulaId,
  initialFormulaId,
  onSelectFormula,
  onOpenFullPage,
}) => {
  const { getFormulaGuides, isEnglish } = useLanguage();
  const formulaGuides = getFormulaGuides();
  const [activeId, setActiveId] = useState<string>("wacc");

  const effectiveFormulaId = formulaId || initialFormulaId;

  useEffect(() => {
    if (effectiveFormulaId && formulaGuides[effectiveFormulaId]) {
      setActiveId(effectiveFormulaId);
    }
  }, [effectiveFormulaId, formulaGuides]);

  const currentGuide: FormulaGuide =
    formulaGuides[activeId] || formulaGuides["wacc"] || Object.values(formulaGuides)[0];


  // Interactive Live Calculator States
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

  // 5. DuPont & CCC State
  const [dpRev, setDpRev] = useState(1000);
  const [dpNopat, setDpNopat] = useState(150);
  const [dpCapital, setDpCapital] = useState(500);
  const [cccDio, setCccDio] = useState(35);
  const [cccDso, setCccDso] = useState(15);
  const [cccDpo, setCccDpo] = useState(65);

  // 6. Reverse DCF State
  const [dcfPrice, setDcfPrice] = useState(250);
  const [dcfNopat, setDcfNopat] = useState(10);
  const [dcfWacc, setDcfWacc] = useState(9);
  const [dcfRoic, setDcfRoic] = useState(18);

  // Calculations
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

  // Value Stick
  const consumerSurplus = Math.max(0, vsWtp - vsPrice);
  const firmMargin = Math.max(0, vsPrice - vsCost);
  const supplierSurplus = Math.max(0, vsCost - vsWts);
  const totalValueCreated = Math.max(0, vsWtp - vsWts);

  // Dickinson Stage diagnosis
  const getDickinsonStage = () => {
    const key = `${dickCfo}${dickCfi}${dickCff}`;
    switch (key) {
      case "--+":
        return {
          stage: isEnglish ? "1. Introduction Stage" : "1. Giriş Evresi (Introduction)",
          color: "text-amber-500",
          desc: isEnglish
            ? "High cash burn, dependent on external capital and debt financing."
            : "Nakit yakımı yüksek, dış sermayeye ve borca bağımlı başlangıç.",
        };
      case "+-+":
        return {
          stage: isEnglish ? "2. Growth Stage" : "2. Büyüme Evresi (Growth)",
          color: "text-indigo-500",
          desc: isEnglish
            ? "Operations are profitable, aggressive expansion via heavy investment and debt."
            : "Operasyon kârda, yoğun yatırım ve borçlanma ile agresif genişleme.",
        };
      case "+--":
        return {
          stage: isEnglish ? "3. Mature / Cash Cow" : "3. Olgunluk / Nakit İneği (Mature)",
          color: "text-emerald-500",
          desc: isEnglish
            ? "The strongest stage! Huge operating cash flow, zero reliance on external debt, and solid dividends."
            : "En güçlü evre! Devasa operasyonel nakit, sıfır dış borç ihtiyacı ve temettü.",
        };
      case "---":
      case "-+-":
      case "-++":
        return {
          stage: isEnglish ? "4. Decline & Asset Liquidation" : "4. Düşüş & Varlık Satışı (Decline)",
          color: "text-rose-500",
          desc: isEnglish
            ? "Operations burn cash; the company survives by selling off assets and plants."
            : "Operasyonlar nakit yakıyor, şirket fabrikalarını satarak ayakta kalıyor.",
        };
      default:
        return {
          stage: isEnglish ? "Shakeout / Restructuring" : "Sarsıntı / Yeniden Yapılanma (Shakeout)",
          color: "text-purple-500",
          desc: isEnglish
            ? "Volatile cash flows, restructuring and crisis management."
            : "Dengesiz nakit akışları, kriz yönetimi.",
        };
    }
  };

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="relative z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 text-slate-800 dark:text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-600/80 text-indigo-600 dark:text-white border border-indigo-200 dark:border-indigo-400/40 shadow-xs">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-50 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-400/30 uppercase tracking-wider">
                      {currentGuide.badge}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-indigo-300 font-medium">
                      {isEnglish ? "Step-by-Step Formula & Calculation Workshop" : "Adım Adım Formül & Hesaplama Atölyesi"}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
                    {currentGuide.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {onOpenFullPage && (
                  <button
                    onClick={() => {
                      onOpenFullPage(activeId);
                      onClose();
                    }}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    title={isEnglish ? "Open in Full Page Workshop" : "Tam Sayfa Formül Atölyesi Olarak Aç"}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isEnglish ? "Open in Full Page" : "Tam Sayfada Aç"}</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-white text-xs font-semibold transition-colors cursor-pointer border border-slate-200 dark:border-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{isEnglish ? "Return to Module" : "Modüle Geri Dön"}</span>
                  <span className="sm:hidden">{isEnglish ? "Back" : "Geri"}</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Switch Formula Bar - Modern Pill Navigation with wrap */}
            <div className="sticky top-0 z-20 px-3 sm:px-5 py-3 bg-slate-100/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-2 shadow-2xs shrink-0">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider shrink-0 mr-1 hidden sm:inline">
                {isEnglish ? "Formulas:" : "Formüller:"}
              </span>
              {Object.values(formulaGuides).map((g: any, idx) => {
                const isSelected = g.id === activeId;
                const shortNames: Record<string, string> = {
                  "wacc": "1. WACC",
                  "roic": "2. ROIC",
                  "value-stick": isEnglish ? "3. Value Stick" : "3. Değer Çubuğu",
                  "dickinson": isEnglish ? "4. Dickinson Cash Flow" : "4. Dickinson Nakit",
                  "profit-pool": isEnglish ? "5. Profit Pool" : "5. Sektör Kârı",
                  "footnote": isEnglish ? "6. 10-K Footnotes" : "6. 10-K Dipnotları",
                  "dupont-ccc": "7. DuPont & CCC",
                  "reverse-dcf": isEnglish ? "8. Reverse DCF" : "8. Tersine DCF",
                };
                const label = shortNames[g.id] || `${idx + 1}. ${g.title.split("(")[0].trim()}`;
                return (
                  <button
                    key={g.id}
                    onClick={() => {
                      setActiveId(g.id);
                      if (onSelectFormula) onSelectFormula(g.id);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 ring-1 ring-indigo-500/50"
                        : "bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/70 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-300/60 dark:hover:border-slate-700/60"
                    }`}
                  >
                    <Percent className={`w-3 h-3 ${isSelected ? "text-indigo-200" : "text-slate-400"}`} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Scrollable Body */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 bg-slate-50/40 dark:bg-slate-950/40">
              {/* Formula Main Equation Hero */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {isEnglish ? "Core Mathematical Equation" : "Temel Matematiksel Eşitlik"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {currentGuide.subtitle}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-indigo-700 dark:text-amber-400 uppercase tracking-wider px-1">
                    {isEnglish ? "Core Mathematical Equation" : "Temel Matematiksel Eşitlik"}
                  </span>
                  <MathFormula equation={currentGuide.coreEquation} size="md" />
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentGuide.plainLanguageSummary}
                </p>
              </div>

              {/* LIVE INTERACTIVE CALCULATOR (KENDİN DENE & TEST ET) */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                      {isEnglish ? "Live Interactive Formula Lab" : "Canlı İnteraktif Formül Laboratuvarı"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isEnglish
                        ? "Adjust numbers to see real-time impact and understand the underlying dynamics."
                        : "Sayıları değiştirin, formülün nasıl tepki verdiğini ve sonucun neden değiştiğini anında görün."}
                    </p>
                  </div>
                </div>

                {/* 1. WACC Interactive Panel */}
                {currentGuide.calculatorType === "wacc" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                          <span>{isEnglish ? "Cost of Debt (Kd):" : "Brüt Kredi Faizi (Kd):"}</span>
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
                          <span>{isEnglish ? "Tax Rate (t):" : "Vergi Oranı (t):"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            %{waccTax} (Net Kd: %{netKd.toFixed(1)})
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

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-indigo-300 font-bold uppercase tracking-wider">
                          {isEnglish
                            ? "Calculated Weighted Average Cost of Capital (WACC)"
                            : "Hesaplanan Ağırlıklı Ortalama Sermaye Maliyeti (WACC)"}
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                          %{calculatedWacc.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-xs text-indigo-200/90 max-w-sm leading-relaxed text-right sm:text-left">
                        {isEnglish
                          ? `Equity Contribution: %${(weightE * calculatedKe).toFixed(1)} + Net Debt Contribution: %${(weightD * netKd).toFixed(1)}. Firm must earn at least %${calculatedWacc.toFixed(1)} per $100 capital.`
                          : `Özsermaye Katkısı: %${(weightE * calculatedKe).toFixed(1)} + Net Borç Katkısı: %${(weightD * netKd).toFixed(1)}. Şirket her 100 TL için yıllık %${calculatedWacc.toFixed(1)} getiri üretmek zorundadır.`}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. ROIC Interactive Panel */}
                {currentGuide.calculatorType === "roic" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                          <span>{isEnglish ? "Tax Rate:" : "Vergi Oranı:"}</span>
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
                          <span>{isEnglish ? "Working Capital (NWC):" : "İşletme Sermayesi (NWC):"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {roicNwc}M {isEnglish ? "$" : "TL"}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="500"
                          step="10"
                          value={roicNwc}
                          onChange={(e) => setRoicNwc(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{isEnglish ? "Fixed Assets (PP&E):" : "Duran Varlıklar (PP&E):"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {roicPpe}M {isEnglish ? "$" : "TL"}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="1500"
                          step="50"
                          value={roicPpe}
                          onChange={(e) => setRoicPpe(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                          {isEnglish ? "Net Operating Profit After Tax (NOPAT) / Invested Capital = ROIC" : "Net Faaliyet Kârı (NOPAT) / Yatırılan Sermaye = ROIC"}
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                          %{calculatedRoic.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-xs text-emerald-200/90 max-w-sm leading-relaxed text-right sm:text-left">
                        {isEnglish
                          ? `NOPAT = $${calculatedNopat.toFixed(0)}M | Invested Capital = $${totalInvestedCapital}M. The firm generates $${calculatedRoic.toFixed(1)} pure cash return per $100 capital deployed.`
                          : `NOPAT = ${calculatedNopat.toFixed(0)}M TL | Yatırılan Sermaye = ${totalInvestedCapital}M TL. Şirket bağladığı her 100 TL sermaye ile yılda ${calculatedRoic.toFixed(1)} TL saf nakit getiri üretmektedir.`}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Value Stick Interactive Panel */}
                {currentGuide.calculatorType === "value-stick" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{isEnglish ? "Willingness to Pay (WTP):" : "Ödeme İsteği (WTP):"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {vsWtp}$
                          </span>
                        </div>
                        <input
                          type="range"
                          min="800"
                          max="2000"
                          step="50"
                          value={vsWtp}
                          onChange={(e) => setVsWtp(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{isEnglish ? "Price (P):" : "Satış Fiyatı (P):"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {vsPrice}$
                          </span>
                        </div>
                        <input
                          type="range"
                          min="500"
                          max="1800"
                          step="50"
                          value={vsPrice}
                          onChange={(e) => setVsPrice(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{isEnglish ? "Cost (C):" : "Birim Maliyet (C):"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {vsCost}$
                          </span>
                        </div>
                        <input
                          type="range"
                          min="300"
                          max="1200"
                          step="50"
                          value={vsCost}
                          onChange={(e) => setVsCost(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{isEnglish ? "Willingness to Sell (WTS):" : "Tedarikçi Tabanı (WTS):"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {vsWts}$
                          </span>
                        </div>
                        <input
                          type="range"
                          min="200"
                          max="800"
                          step="50"
                          value={vsWts}
                          onChange={(e) => setVsWts(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center">
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                        <div className="text-[10px] text-blue-700 dark:text-blue-300 font-bold uppercase">{isEnglish ? "Consumer Surplus (WTP - P)" : "Tüketici Artığı (WTP - P)"}</div>
                        <div className="text-lg font-black text-blue-900 dark:text-blue-200">{consumerSurplus}$</div>
                      </div>
                      <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                        <div className="text-[10px] text-indigo-700 dark:text-indigo-300 font-bold uppercase">{isEnglish ? "Firm Profit Margin (P - C)" : "Şirket Kâr Marjı (P - C)"}</div>
                        <div className="text-lg font-black text-indigo-900 dark:text-indigo-200">{firmMargin}$</div>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                        <div className="text-[10px] text-amber-700 dark:text-amber-300 font-bold uppercase">{isEnglish ? "Supplier Surplus (C - WTS)" : "Tedarikçi Artığı (C - WTS)"}</div>
                        <div className="text-lg font-black text-amber-900 dark:text-amber-200">{supplierSurplus}$</div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                        <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase">{isEnglish ? "Total Value Created (WTP - WTS)" : "Toplam Pasta (WTP - WTS)"}</div>
                        <div className="text-lg font-black text-emerald-900 dark:text-emerald-200">{totalValueCreated}$</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Dickinson Interactive Panel */}
                {currentGuide.calculatorType === "dickinson" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                        <div className="text-xs font-semibold">{isEnglish ? "1. Operating Cash Flow (CFO)" : "1. Faaliyet Nakit Akışı (CFO)"}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setDickCfo("+")}
                            className={`flex-1 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                              dickCfo === "+"
                                ? "bg-emerald-600 text-white"
                                : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {isEnglish ? "+ Positive (Profitable)" : "+ Pozitif (Kârda)"}
                          </button>
                          <button
                            onClick={() => setDickCfo("-")}
                            className={`flex-1 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                              dickCfo === "-"
                                ? "bg-rose-600 text-white"
                                : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {isEnglish ? "- Negative (Burning)" : "- Negatif (Yakıyor)"}
                          </button>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                        <div className="text-xs font-semibold">{isEnglish ? "2. Investing Cash Flow (CFI)" : "2. Yatırım Nakit Akışı (CFI)"}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setDickCfi("-")}
                            className={`flex-1 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                              dickCfi === "-"
                                ? "bg-indigo-600 text-white"
                                : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {isEnglish ? "- Investing (Capex)" : "- Yatırım Yapıyor"}
                          </button>
                          <button
                            onClick={() => setDickCfi("+")}
                            className={`flex-1 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                              dickCfi === "+"
                                ? "bg-amber-600 text-white"
                                : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {isEnglish ? "+ Selling Assets" : "+ Varlık Satıyor"}
                          </button>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                        <div className="text-xs font-semibold">{isEnglish ? "3. Financing Cash Flow (CFF)" : "3. Finansman Nakit Akışı (CFF)"}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setDickCff("-")}
                            className={`flex-1 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                              dickCff === "-"
                                ? "bg-emerald-600 text-white"
                                : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {isEnglish ? "- Dividend / Debt Payoff" : "- Temettü / Borç Ödeme"}
                          </button>
                          <button
                            onClick={() => setDickCff("+")}
                            className={`flex-1 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                              dickCff === "+"
                                ? "bg-indigo-600 text-white"
                                : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {isEnglish ? "+ New Debt / Equity" : "+ Yeni Borç / Sermaye"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {(() => {
                      const diag = getDickinsonStage();
                      return (
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                          <div>
                            <div className="text-xs text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider">
                              {isEnglish ? `Diagnosed Dickinson Stage (${dickCfo} , ${dickCfi} , ${dickCff})` : `Teşhis Edilen Dickinson Evresi (${dickCfo} , ${dickCfi} , ${dickCff})`}
                            </div>
                            <div className={`text-xl sm:text-2xl font-black mt-0.5 ${diag.color}`}>
                              {diag.stage}
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed text-right sm:text-left">
                            {diag.desc}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 5. DuPont & CCC Panel */}
                {currentGuide.calculatorType === "dupont-ccc" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{isEnglish ? "Days Inventory (DIO):" : "Stok Günü (DIO):"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{cccDio} {isEnglish ? "Days" : "Gün"}</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="120"
                          step="1"
                          value={cccDio}
                          onChange={(e) => setCccDio(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{isEnglish ? "Days Sales (DSO):" : "Tahsilat Günü (DSO):"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{cccDso} {isEnglish ? "Days" : "Gün"}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="90"
                          step="1"
                          value={cccDso}
                          onChange={(e) => setCccDso(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{isEnglish ? "Days Payable (DPO):" : "Tedarikçi Ödeme (DPO):"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{cccDpo} {isEnglish ? "Days" : "Gün"}</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="150"
                          step="1"
                          value={cccDpo}
                          onChange={(e) => setCccDpo(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-purple-300 font-bold uppercase tracking-wider">
                          {isEnglish ? "Cash Conversion Cycle (CCC = DIO + DSO - DPO)" : "Nakit Dönüşüm Süresi (CCC = DIO + DSO - DPO)"}
                        </div>
                        <div className={`text-2xl sm:text-3xl font-black mt-0.5 ${calculatedCcc < 0 ? "text-emerald-400" : "text-amber-300"}`}>
                          {calculatedCcc} {isEnglish ? "Days" : "Gün"} {calculatedCcc < 0 ? (isEnglish ? "(Negative - Supplier Financed!)" : "(Negatif - Tedarikçi Finansmanı!)") : (isEnglish ? "(Positive)" : "(Pozitif)")}
                        </div>
                      </div>
                      <p className="text-xs text-purple-200/90 max-w-sm leading-relaxed text-right sm:text-left">
                        {calculatedCcc < 0
                          ? (isEnglish
                              ? "The firm collects cash upfront from customers and pays suppliers months later. It expands using supplier capital interest-free!"
                              : "Şirket müşteriden parayı peşin alıp tedarikçiye aylar sonra ödüyor. Tedarikçinin parasıyla faizsiz büyüyor!")
                          : (isEnglish
                              ? "Cash is locked in warehouses and receivables; requires working capital funding."
                              : "Şirketin parası depolarda ve alacaklarda bağlı kalıyor; işletme sermayesi fonlaması gerektiriyor.")}
                      </p>
                    </div>
                  </div>
                )}

                {/* 6. Reverse DCF Panel */}
                {currentGuide.calculatorType === "reverse-dcf" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{isEnglish ? "Share Price:" : "Hisse Fiyatı:"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{dcfPrice} {isEnglish ? "$" : "TL"}</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="1000"
                          step="10"
                          value={dcfPrice}
                          onChange={(e) => setDcfPrice(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{isEnglish ? "NOPAT per Share:" : "Hisse Başı NOPAT:"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{dcfNopat} {isEnglish ? "$" : "TL"}</span>
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
                          <span>{isEnglish ? "Cost of Capital (WACC):" : "WACC Sermaye Maliyeti:"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">%{dcfWacc}</span>
                        </div>
                        <input
                          type="range"
                          min="6"
                          max="15"
                          step="0.5"
                          value={dcfWacc}
                          onChange={(e) => setDcfWacc(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{isEnglish ? "Expected ROIC:" : "Beklenen ROIC:"}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">%{dcfRoic}</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="40"
                          step="1"
                          value={dcfRoic}
                          onChange={(e) => setDcfRoic(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-blue-300 font-bold uppercase tracking-wider">
                          {isEnglish ? "Market-Implied Competitive Advantage Period (CAP)" : "Piyasa Fiyatının İma Ettiği Hendek Süresi (CAP)"}
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                          ~{impliedCapYears} {isEnglish ? "Years" : "Yıl"} ({isEnglish ? `${futureSharePct}% of price relies on future growth` : `Fiyatın %${futureSharePct}'si Geleceğe Bağlı`})
                        </div>
                      </div>
                      <p className="text-xs text-blue-200/90 max-w-sm leading-relaxed text-right sm:text-left">
                        {isEnglish
                          ? `Zero-Growth Value: $${steadyStateVal.toFixed(1)}. To justify this stock price, the firm must sustain ROIC > WACC without conceding market share for a full ${impliedCapYears} years!`
                          : `Sıfır Büyüme Değeri: ${steadyStateVal.toFixed(1)} TL. Bu fiyatı haklı çıkarmak için şirketin tam ${impliedCapYears} yıl boyunca rakiplere pazar kaptırmadan ROIC > WACC farkını koruması şarttır!`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* WHY THIS FORMULA EXISTS (SIFIRDAN MANTIK) */}
              <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-950 dark:text-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                  <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{isEnglish ? "For Beginners: Why This Formula Exists & What Problem It Solves" : "Sıfırdan Başlayanlar İçin: Bu Formül Neden Var ve Neyi Çözüyor?"}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                  {currentGuide.whyThisFormulaExists}
                </p>
              </div>

              {/* VARIABLES DICTIONARY */}
              <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    {isEnglish ? "Variables Glossary & Where to Find on Balance Sheet / Market" : "Değişkenler Sözlüğü & Bilançoda / Borsada Nerede Bulunur?"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentGuide.variables.map((v, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md font-mono text-xs font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          {v.symbol}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                          {v.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {v.description}
                      </p>
                      <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold pt-1">
                        {isEnglish ? "📍 How to Find: " : "📍 Nasıl Bulunur: "}{v.howToFindIt}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP BY STEP GUIDELINES */}
              <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    {isEnglish ? `Step-by-Step Calculation Order (${currentGuide.steps.length} Steps)` : `Adım Adım Hesaplama Sırası (${currentGuide.steps.length} Adım)`}
                  </h3>
                </div>

                <div className="space-y-3">
                  {currentGuide.steps.map((s) => (
                    <div
                      key={s.stepNumber}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-start gap-4"
                    >
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        0{s.stepNumber}
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                            {s.title}
                          </h4>
                          <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                            {s.formula}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {s.explanation}
                        </p>
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 inline-block">
                          {isEnglish ? "Example: " : "Örnek: "}{s.exampleValues}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* REAL WORLD VAKA ANALİZİ */}
              <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    {isEnglish ? `Real-World Case Study: ${currentGuide.realWorldExample.company}` : `Gerçek Dünya Vaka Analizi: ${currentGuide.realWorldExample.company}`}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentGuide.realWorldExample.scenario}
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 font-mono text-xs">
                  {currentGuide.realWorldExample.calculationSteps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>{isEnglish ? "Strategic Takeaway:" : "Stratejik Çıkarım:"}</strong> {currentGuide.realWorldExample.resultInterpretation}
                  </div>
                </div>
              </div>

              {/* COMMON PITFALLS & TUZAKLAR */}
              <div className="p-5 sm:p-6 rounded-3xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-950 dark:text-rose-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-900 dark:text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>{isEnglish ? "Critical Calculation Pitfalls Analysts Frequently Fall Into:" : "Analistlerin En Sık Düştüğü Kritik Hesaplama Tuzakları:"}</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {currentGuide.commonPitfalls.map((pitfall, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="font-bold text-rose-600 dark:text-rose-400">•</span>
                      <span>{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Return Button */}
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {isEnglish
                  ? "Once you understand the formula and mechanics, you can resume reading the module."
                  : "Formülü ve mantığını kavradıysanız okumaya devam edebilirsiniz."}
              </div>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs hover:scale-102 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isEnglish ? "Got It, Return to Where I Left Off" : "Öğrendim, Modüldeki Kaldığım Yere Geri Dön"}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
