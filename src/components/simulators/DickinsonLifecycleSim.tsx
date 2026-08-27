import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  Activity,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Calculator,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { CustomChartTooltip } from "../ChartTooltip";

type Sign = "+" | "-";

interface StageInfo {
  stage: string;
  stageTr: string;
  stageNum: number;
  color: string;
  badgeBg: string;
  avgRoic: number;
  roicSpread: string;
  descriptionTr: string;
  descriptionEn: string;
  examplesTr: string[];
  examplesEn: string[];
  characteristicTr: string;
  characteristicEn: string;
  distributionShare: number; // % of public firms
  typicalCashFlows: { cfo: number; cfi: number; cff: number };
}

const STAGE_DATABASE: Record<string, StageInfo> = {
  "- - +": {
    stage: "1. Introduction Stage (Introduction)",
    stageTr: "1. Giriş Evresi (Introduction)",
    stageNum: 1,
    color: "#6366F1",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    avgRoic: -2.8,
    roicSpread: "-10.8% ile +5.2%",
    descriptionTr: "Şirket henüz kendi operasyonundan nakit üretemez (Faaliyet -). Sürekli yatırım yapar (Yatırım -) ve hayatını sürdürebilmek için dışarıdan borç veya hissedar sermayesi (Finansman +) bulmak zorundadır.",
    descriptionEn: "The firm cannot yet fund itself from operations (CFO -). It invests heavily in capacity (CFI -) and relies on external debt or equity financing (CFF +) to survive.",
    examplesTr: ["Erken Aşama Biyoteknoloji Girişimleri", "2010 Öncesi Erken SaaS", "1997 Amazon (IPO Dönemi)"],
    examplesEn: ["Early-stage Biotech Startups", "Pre-2010 SaaS Startups", "1997 Amazon (IPO Period)"],
    characteristicTr: "Giriş aşamasında muhasebe kârı değil hayatta kalma ve ürün-pazar uyumu önceliklidir.",
    characteristicEn: "Survival and product-market fit are prioritized over accounting profit.",
    distributionShare: 9.2,
    typicalCashFlows: { cfo: -40, cfi: -60, cff: 100 },
  },
  "+ - +": {
    stage: "2. Growth Stage (Growth)",
    stageTr: "2. Büyüme Evresi (Growth)",
    stageNum: 2,
    color: "#10B981",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    avgRoic: 10.6,
    roicSpread: "+4.1% ile +17.2%",
    descriptionTr: "Şirket artık ana faaliyetinden güçlü nakit üretir (Faaliyet +). Ancak pazar talebi o kadar büyüktür ki hem kendi nakdini yatırıma harcar (Yatırım -) hem de ek borç/sermaye çekerek büyümeyi finanse eder (Finansman +).",
    descriptionEn: "The firm generates healthy operating cash flow (CFO +), but growth opportunities exceed internal cash, prompting heavy reinvestment (CFI -) and debt/equity capital raises (CFF +).",
    examplesTr: ["2016-2021 Tesla", "2008-2015 Netflix", "Büyüyen E-Ticaret Devleri"],
    examplesEn: ["2016-2021 Tesla", "2008-2015 Netflix", "Scaling E-Commerce Platforms"],
    characteristicTr: "Yüksek ciro büyümesi, pazar payı kapma yarışı ve sermaye yoğun kapasite artırımı.",
    characteristicEn: "High revenue growth, land-grab market share race, and capital-intensive scaling.",
    distributionShare: 38.4,
    typicalCashFlows: { cfo: 85, cfi: -120, cff: 45 },
  },
  "+ - -": {
    stage: "3. Maturity Stage (Cash Cow Compounder)",
    stageTr: "3. Olgunluk Evresi (Maturity - Nakit İneği)",
    stageNum: 3,
    color: "#F59E0B",
    badgeBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    avgRoic: 11.2,
    roicSpread: "+5.8% ile +16.5%",
    descriptionTr: "Şirket gerçek bir nakit basma makinesine dönüşmüştür! Faaliyetlerden devasa nakit girer (Faaliyet +). Tüm rutin yatırımlarını kendi nakdiyle karşılar (Yatırım -) ve arta kalan devasa nakitle borç öder veya temettü/hisse geri alımı yapar (Finansman -).",
    descriptionEn: "A bona fide cash-generating compounder. Substantial operating cash (CFO +) easily funds maintenance and growth CapEx (CFI -), leaving huge surplus for dividends, debt paydown, and buybacks (CFF -).",
    examplesTr: ["Apple Inc.", "Coca-Cola Company", "Microsoft", "BİM Birleşik Mağazalar"],
    examplesEn: ["Apple Inc.", "Coca-Cola Company", "Microsoft", "Alphabet (Google)"],
    characteristicTr: "En yüksek ROIC istikrarı, güçlü ekonomik hendek ve devasa serbest nakit akımı (FCF).",
    characteristicEn: "Highest ROIC stability, durable economic moat, and massive Free Cash Flow (FCF).",
    distributionShare: 36.1,
    typicalCashFlows: { cfo: 140, cfi: -40, cff: -90 },
  },
  "- - -": {
    stage: "4. Shake-out Stage (Distressed)",
    stageTr: "4. Sarsıntı Evresi (Shake-Out)",
    stageNum: 4,
    color: "#EA580C",
    badgeBg: "bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    avgRoic: 3.8,
    roicSpread: "-4.2% ile +11.8%",
    descriptionTr: "Sektörde talep aniden durmuştur. İşten nakit gelmez (Faaliyet -), eski yatırımların taksitleri sürer (Yatırım -) ve borç ödemeleri veya temettü taahhütleri şirketi sıkıştırır (Finansman -).",
    descriptionEn: "Industry headwinds squeeze margins. Operating cash turns negative (CFO -), legacy commitments force spending (CFI -), and debt repayments drain liquidity (CFF -).",
    examplesTr: ["Krizdeki Geleneksel Otomotiv", "Durgunluk Dönemindeki Sanayi Tesisleri"],
    examplesEn: ["Cyclical Heavy Manufacturing in Downturn", "Legacy Automotive under Transition Stress"],
    characteristicTr: "Kârlılıkta sert oynaklık, zayıf hendekli şirketlerin elendiği veya satıldığı dönem.",
    characteristicEn: "High earnings volatility; vulnerable non-moat players get weeded out.",
    distributionShare: 11.3,
    typicalCashFlows: { cfo: -25, cfi: -30, cff: -40 },
  },
  "+ + -": {
    stage: "4. Shake-out Stage (Asset Divesting)",
    stageTr: "4. Sarsıntı Evresi (Varlık Satan Büyüme)",
    stageNum: 4,
    color: "#EA580C",
    badgeBg: "bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    avgRoic: 4.5,
    roicSpread: "-2.0% ile +11.0%",
    descriptionTr: "Şirket ana işinden nakit üretirken (Faaliyet +), bazı fabrika veya iştiraklerini satarak nakit yaratır (Yatırım +) ve bu parayla borçlarını kapatır (Finansman -).",
    descriptionEn: "The company generates operating cash (CFO +), divests non-core units or factories (CFI +), and pays down outstanding obligations (CFF -).",
    examplesTr: ["Yeniden Yapılanan Holdingler", "Portföy Sadeleştiren Devler (GE)"],
    examplesEn: ["Restructuring Conglomerates (e.g. GE post-2018)", "Portfolio Streamlining Corporates"],
    characteristicTr: "Şirket stratejisini daraltıp ana karlı çekirdeğine geri döner.",
    characteristicEn: "Refocusing on profitable core units and reducing leverage.",
    distributionShare: 3.2,
    typicalCashFlows: { cfo: 50, cfi: 40, cff: -80 },
  },
  "- + +": {
    stage: "5. Decline Stage (Terminal Decline)",
    stageTr: "5. Düşüş Evresi (Decline)",
    stageNum: 5,
    color: "#E11D48",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    avgRoic: -12.0,
    roicSpread: "-24.0% ile -0.2%",
    descriptionTr: "Şirketin iş modeli çökmüştür. Faaliyetler nakit yakar (Faaliyet -). Şirket hayatta kalmak için fabrikalarını ve gayrimenkullerini satar (Yatırım +) ve acil borç/kredi arar (Finansman +).",
    descriptionEn: "Core business is obsolete and burns cash (CFO -). Management liquidates assets (CFI +) and seeks emergency debt/rescue financing (CFF +).",
    examplesTr: ["2008 Kodak", "2010 Blockbuster", "Batmakta Olan Perakendeciler"],
    examplesEn: ["2008 Kodak", "2010 Blockbuster", "Distressed Brick-and-Mortar Retailers"],
    characteristicTr: "Yıkıcı inovasyon karşısında ezilme, negatif ROIC ve değer erimesi.",
    characteristicEn: "Disrupted by technology; negative economic spread and equity destruction.",
    distributionShare: 5.0,
    typicalCashFlows: { cfo: -70, cfi: 50, cff: 30 },
  },
  "- + -": {
    stage: "5. Decline Stage (Liquidation / Wind-down)",
    stageTr: "5. Düşüş Evresi (Tasfiye ve Kapanış)",
    stageNum: 5,
    color: "#E11D48",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    avgRoic: -14.5,
    roicSpread: "-30.0% ile -2.0%",
    descriptionTr: "Varlıklarını satıp elde ettiği parayla borçlarını ve alacaklılarını ödeyerek piyasadan çekilen şirket tablosudur.",
    descriptionEn: "Selling remaining inventory and assets (CFI +) to settle debts and shut down operations (CFF -).",
    examplesTr: ["İflas ve Tasfiye Sürecindeki İşletmeler"],
    examplesEn: ["Bankrupt Entities in Formal Liquidation"],
    characteristicTr: "Sermaye piyasasından tamamen çıkış.",
    characteristicEn: "Terminal market exit.",
    distributionShare: 1.0,
    typicalCashFlows: { cfo: -50, cfi: 60, cff: -20 },
  },
};

const ALL_STAGES_CHART_DATA = [
  { nameTr: "1. Giriş", nameEn: "1. Intro", key: "- - +", share: 9.2, roic: -2.8, color: "#6366F1" },
  { nameTr: "2. Büyüme", nameEn: "2. Growth", key: "+ - +", share: 38.4, roic: 10.6, color: "#10B981" },
  { nameTr: "3. Olgunluk", nameEn: "3. Maturity", key: "+ - -", share: 36.1, roic: 11.2, color: "#F59E0B" },
  { nameTr: "4. Sarsıntı", nameEn: "4. Shake-out", key: "- - -", share: 11.3, roic: 3.8, color: "#EA580C" },
  { nameTr: "5. Düşüş", nameEn: "5. Decline", key: "- + +", share: 5.0, roic: -12.0, color: "#E11D48" },
];

export const DickinsonLifecycleSim: React.FC = () => {
  const { isEnglish } = useLanguage();
  const [operatingSign, setOperatingSign] = useState<Sign>("+");
  const [investingSign, setInvestingSign] = useState<Sign>("-");
  const [financingSign, setFinancingSign] = useState<Sign>("-");
  const [activeChartTab, setActiveChartTab] = useState<"cashflows" | "distribution">("cashflows");
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  const patternKey = `${operatingSign} ${investingSign} ${financingSign}`;

  const currentStage = STAGE_DATABASE[patternKey] || {
    stage: "Special / Transition Stage",
    stageTr: "Özel Durum / Geçiş Evresi",
    stageNum: 0,
    color: "#64748B",
    badgeBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700",
    avgRoic: 0.0,
    roicSpread: "-5% ile +5%",
    descriptionTr: "Bu kombinasyon nadir görülen ara geçiş dönemlerini veya özel yeniden yapılandırma süreçlerini yansıtır.",
    descriptionEn: "This cash flow combination reflects rare transitional states or unusual restructuring setups.",
    examplesTr: ["Mevsimsel ve döngüsel geçiş şirketleri"],
    examplesEn: ["Cyclical inflection or seasonal anomaly firms"],
    characteristicTr: "Geçici nakit akış anomalisi.",
    characteristicEn: "Temporary cash flow anomaly.",
    distributionShare: 2.0,
    typicalCashFlows: { cfo: operatingSign === "+" ? 30 : -30, cfi: investingSign === "+" ? 20 : -20, cff: financingSign === "+" ? 20 : -20 },
  };

  const handleApplyPresetStage = (op: Sign, inv: Sign, fin: Sign) => {
    setOperatingSign(op);
    setInvestingSign(inv);
    setFinancingSign(fin);
  };

  // Recharts data for the active 3 cash flow vectors
  const cashFlowsChartData = [
    {
      name: isEnglish ? "CFO (Operations)" : "CFO (Faaliyet)",
      value: currentStage.typicalCashFlows.cfo,
      fill: currentStage.typicalCashFlows.cfo >= 0 ? "#10B981" : "#F43F5E",
      sign: operatingSign,
    },
    {
      name: isEnglish ? "CFI (Investing)" : "CFI (Yatırım)",
      value: currentStage.typicalCashFlows.cfi,
      fill: currentStage.typicalCashFlows.cfi < 0 ? "#6366F1" : "#F59E0B",
      sign: investingSign,
    },
    {
      name: isEnglish ? "CFF (Financing)" : "CFF (Finansman)",
      value: currentStage.typicalCashFlows.cff,
      fill: currentStage.typicalCashFlows.cff >= 0 ? "#8B5CF6" : "#06B6D4",
      sign: financingSign,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs" id="dickinson-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/50">
              {isEnglish ? "Step 2 Interactive Terminal" : "2. Adım İnteraktif Terminal"}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Victoria Dickinson Model" : "Victoria Dickinson Modeli"}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            {isEnglish ? "Corporate Lifecycle Diagnostic: 3-Vector Cash Flow X-Ray" : "Şirket Yaşam Döngüsü: 3 Vektörlü Nakit Akış Röntgeni"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            {isEnglish
              ? "Change the 3 cash flow levers on the left; watch the vector dynamics and economic diagnostic update immediately in the visual terminal on the right."
              : "Soldaki 3 nakit akış yönünü değiştirin; sağdaki görsel terminalde nakit vektörlerinin ve ekonomik evre teşhisinin anında nasıl dönüştüğünü izleyin."}
          </p>
        </div>

        <button
          onClick={() => handleApplyPresetStage("+", "-", "-")}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset (Maturity)" : "Sıfırla (Olgunluk)"}
        </button>
      </div>

      {/* Preset Stage Buttons */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {isEnglish ? "Quick Stage Presets:" : "Hızlı Evre Şablonları:"}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => handleApplyPresetStage("-", "-", "+")}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
              patternKey === "- - +"
                ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold ring-1 ring-indigo-400"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
            }`}
          >
            <span className="block text-[10px] text-slate-400 font-mono">[- - +]</span>
            🌱 {isEnglish ? "1. Introduction" : "1. Giriş Evresi"}
          </button>

          <button
            onClick={() => handleApplyPresetStage("+", "-", "+")}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
              patternKey === "+ - +"
                ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-400"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
            }`}
          >
            <span className="block text-[10px] text-slate-400 font-mono">[+ - +]</span>
            🚀 {isEnglish ? "2. Growth" : "2. Büyüme Evresi"}
          </button>

          <button
            onClick={() => handleApplyPresetStage("+", "-", "-")}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
              patternKey === "+ - -"
                ? "bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-900 dark:text-amber-200 font-bold ring-1 ring-amber-400"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
            }`}
          >
            <span className="block text-[10px] text-slate-400 font-mono">[+ - -]</span>
            👑 {isEnglish ? "3. Maturity (Compounder)" : "3. Olgunluk (Nakit İneği)"}
          </button>

          <button
            onClick={() => handleApplyPresetStage("-", "+", "+")}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
              patternKey === "- + +"
                ? "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200 font-bold ring-1 ring-rose-400"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
            }`}
          >
            <span className="block text-[10px] text-slate-400 font-mono">[- + +]</span>
            📉 {isEnglish ? "5. Decline / Distress" : "5. Düşüş / Çöküş"}
          </button>
        </div>
      </div>

      {/* 2-Column Terminal Architecture (grid lg:grid-cols-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Levers & Action Guidance (5 cols) */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {isEnglish ? "Cash Flow Controls:" : "Nakit Akış Kontrolleri:"}
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
              [{patternKey}]
            </span>
          </div>

          {/* 1. Operating Cash Flow */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {isEnglish ? "1. Operating Cash Flow (CFO)" : "1. Faaliyet Nakit Akışı (CFO)"}
              </span>
              <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${operatingSign === "+" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"}`}>
                {operatingSign === "+" ? (isEnglish ? "+ Inflow" : "+ Giriş") : (isEnglish ? "- Outflow" : "- Çıkış")}
              </span>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setOperatingSign("+")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  operatingSign === "+"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {isEnglish ? "+ Generates Cash" : "+ Nakit Üretiyor"}
              </button>
              <button
                onClick={() => setOperatingSign("-")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  operatingSign === "-"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {isEnglish ? "- Burns Cash" : "- Nakit Yakıyor"}
              </button>
            </div>
          </div>

          {/* 2. Investing Cash Flow */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {isEnglish ? "2. Investing Cash Flow (CFI)" : "2. Yatırım Nakit Akışı (CFI)"}
              </span>
              <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${investingSign === "-" ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300" : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"}`}>
                {investingSign === "-" ? (isEnglish ? "- CapEx" : "- Yatırım") : (isEnglish ? "+ Divest" : "+ Satış")}
              </span>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setInvestingSign("-")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  investingSign === "-"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {isEnglish ? "- CapEx Reinvest" : "- Yatırım Yapıyor"}
              </button>
              <button
                onClick={() => setInvestingSign("+")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  investingSign === "+"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {isEnglish ? "+ Selling Assets" : "+ Varlık Satıyor"}
              </button>
            </div>
          </div>

          {/* 3. Financing Cash Flow */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {isEnglish ? "3. Financing Cash Flow (CFF)" : "3. Finansman Nakit Akışı (CFF)"}
              </span>
              <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${financingSign === "-" ? "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300" : "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"}`}>
                {financingSign === "-" ? (isEnglish ? "- Dividend/Debt" : "- Geri Ödeme") : (isEnglish ? "+ Capital Raise" : "+ Borçlanma")}
              </span>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setFinancingSign("+")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  financingSign === "+"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {isEnglish ? "+ Raising Debt/Equity" : "+ Dış Kaynak Çekiyor"}
              </button>
              <button
                onClick={() => setFinancingSign("-")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  financingSign === "-"
                    ? "bg-cyan-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {isEnglish ? "- Dividends & Paydown" : "- Temettü / Borç Ödüyor"}
              </button>
            </div>
          </div>

          {/* Action-Oriented Pedagogical Directive */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong className="block font-bold text-amber-800 dark:text-amber-300 mb-1">
              💡 {isEnglish ? "Action-Oriented Diagnostic:" : "Eyleme Dönük Teşhis Yönergesi:"}
            </strong>
            {isEnglish
              ? "Toggle CFO to (-) and CFF to (+); observe how the company immediately drops into Introduction or Distress, where survival depends entirely on external capital market lifelines."
              : "CFO butonunu (-) ve CFF butonunu (+) yapın; sağdaki grafikte şirketin nasıl bir anda dış kaynak bağımlısı Giriş veya Düşüş evresine yuvarlandığını canlı izleyin."}
          </div>
        </div>

        {/* Right Column: Interactive Recharts Visual & Stage Diagnostic (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Chart Header Tabs */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-2">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {isEnglish ? "Interactive Lifecycle Visualizer" : "İnteraktif Yaşam Döngüsü Grafiği"}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveChartTab("cashflows")}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    activeChartTab === "cashflows"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {isEnglish ? "3-Vector Dynamics" : "3-Vektör Nakit Akışı"}
                </button>
                <button
                  onClick={() => setActiveChartTab("distribution")}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    activeChartTab === "distribution"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {isEnglish ? "Market Stage Spread" : "Piyasa Dağılımı"}
                </button>
              </div>
            </div>

            {/* Recharts Area */}
            <div className="h-56 sm:h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                {activeChartTab === "cashflows" ? (
                  <BarChart data={cashFlowsChartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} unit="M" />
                    <Tooltip
                      content={
                        <CustomChartTooltip
                          unit="M"
                          prefix="$"
                          valueFormatter={(val) => `$${val}M (${val >= 0 ? (isEnglish ? "Inflow" : "Giriş") : (isEnglish ? "Outflow" : "Çıkış")})`}
                        />
                      }
                    />
                    <ReferenceLine y={0} stroke="#94A3B8" strokeWidth={1.5} />
                    <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                      {cashFlowsChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <BarChart data={ALL_STAGES_CHART_DATA} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey={isEnglish ? "nameEn" : "nameTr"} tick={{ fontSize: 10, fill: "#94A3B8" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} unit="%" />
                    <Tooltip
                      content={
                        <CustomChartTooltip
                          unit="%"
                          valueFormatter={(val, name) => `${val}% (${name === "share" ? (isEnglish ? "Market Share" : "Piyasa Payı") : "ROIC"})`}
                        />
                      }
                    />
                    <Bar dataKey="share" radius={[6, 6, 0, 0]}>
                      {ALL_STAGES_CHART_DATA.map((entry, index) => {
                        const isMatch = entry.key === patternKey;
                        return (
                          <Cell
                            key={`dist-${index}`}
                            fill={entry.color}
                            opacity={isMatch ? 1 : 0.45}
                            stroke={isMatch ? "#FFFFFF" : "none"}
                            strokeWidth={isMatch ? 2 : 0}
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic Glassmorphic Diagnosis Card */}
          <div className={`p-5 rounded-2xl border ${currentStage.badgeBg} space-y-3.5 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 block">
                  {isEnglish ? "Dickinson Lifecycle Diagnostic Result" : "Dickinson Yaşam Döngüsü Teşhis Sonucu"}
                </span>
                <h3 className="text-lg sm:text-xl font-black mt-0.5">
                  {isEnglish ? currentStage.stage : currentStage.stageTr}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/40 border border-current/20 shadow-2xs">
                {isEnglish ? `Share: ${currentStage.distributionShare}%` : `Pazar Payı: %${currentStage.distributionShare}`}
              </span>
            </div>

            {/* Quick Metrics Banner */}
            <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-white/85 dark:bg-slate-900/85 border border-current/15 text-slate-900 dark:text-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  {isEnglish ? "Historical Average ROIC" : "Tarihsel Ortalama ROIC"}
                </span>
                <span className={`text-lg font-black font-mono ${currentStage.avgRoic >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  %{currentStage.avgRoic > 0 ? `+${currentStage.avgRoic}` : currentStage.avgRoic}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  {isEnglish ? "ROIC Spread Range" : "ROIC Yayılım Aralığı"}
                </span>
                <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300 mt-1 block">
                  {isEnglish ? currentStage.roicSpread.replace(/\bile\b/g, "to") : currentStage.roicSpread}
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed opacity-95">
              {isEnglish ? currentStage.descriptionEn : currentStage.descriptionTr}
            </p>

            {/* Real World Examples */}
            <div className="pt-2 border-t border-current/15 space-y-1 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold mr-1">{isEnglish ? "Typical Firms:" : "Örnekler:"}</span>
                {(isEnglish ? currentStage.examplesEn : currentStage.examplesTr).map((ex, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 border border-current/20 font-medium">
                    {ex}
                  </span>
                ))}
              </div>
              <p className="text-[10px] opacity-75 italic">
                {isEnglish
                  ? "Illustrative teaching scenario — figures are not current company estimates or investment views."
                  : "Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-dickinson-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {isEnglish ? "See the calculation" : "Hesabı gör"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (isEnglish ? "Hide" : "Gizle") : (isEnglish ? "Show" : "Göster")}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showCalculationDetails ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        <AnimatePresence>
          {showCalculationDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden space-y-4 pt-4"
            >
              {/* Formula and Numerical Proof */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                <div className="font-mono text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                  <div className="font-bold">
                    Pattern: CFO [{operatingSign}] | CFI [{investingSign}] | CFF [{financingSign}] → {isEnglish ? currentStage.stage : currentStage.stageTr}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    Empirical Sample: {currentStage.distributionShare}% of US Non-Financial Public Equities (Dickinson, The Accounting Review 2011)
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    Average Stage ROIC: %{currentStage.avgRoic.toFixed(1)} (Spread: {currentStage.roicSpread})
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-indigo-200/50 dark:border-indigo-800/50">
                  {isEnglish
                    ? `Victoria Dickinson's Research Finding: Cash flow patterns classify firm lifecycle stages far more accurately than firm age or sales growth. Companies in Mature [+ - -] and Growth [+ - +] stages generate the highest sustained economic value and moat resilience.`
                    : `Victoria Dickinson Araştırması: Nakit akış kombinasyonları, şirketlerin yaşam döngüsü evresini şirket yaşı veya ciro büyümesinden çok daha kusursuz sınıflandırır. Olgun [+ - -] ve Büyüme [+ - +] evresindeki şirketler en yüksek ROIC ve hendek dayanıklılığını sergiler.`}
                </p>
              </div>

              {/* Actionable Dickinson Experiments */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{isEnglish ? "Pedagogical Lifecycle Experiments:" : "Terminal Döngü Deneyleri:"}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    👉 <strong className="text-emerald-900 dark:text-emerald-300">{isEnglish ? "Maturity / Free Cash Flow Power (+ - -):" : "Olgunluk / Serbest Nakit Akışı Gücü (+ - -):"}</strong>{" "}
                    {isEnglish
                      ? "CFO is heavily positive, CapEx (CFI) is disciplined, and CFF is negative via share buybacks and dividends. Average ROIC reaches 11.2%."
                      : "Faaliyet nakdi pozitiftir, yatırım harcaması disiplinlidir ve finansman nakdi temettü ve hisse geri alımlarıyla negatiftir. Ortalama ROIC %11.2'ye ulaşır."}
                  </p>
                  <p>
                    👉 <strong className="text-rose-900 dark:text-rose-300">{isEnglish ? "Terminal Decline Distress (- + +):" : "Düşüş & Finansal Sıkıntı (- + +):"}</strong>{" "}
                    {isEnglish
                      ? "Operating cash flow is negative (-), the firm sells assets (+) and raises desperate rescue financing (+). Average ROIC plunges to -12.0%."
                      : "Faaliyet nakdi negatiftir (-), şirket varlıklarını ve fabrikalarını satar (+) ve acil kurtarma borçlanması yapar (+). Ortalama ROIC -%12.0'ye çakılır."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
