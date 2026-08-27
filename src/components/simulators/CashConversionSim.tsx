import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  RotateCcw,
  Clock,
  Layers,
  ArrowRight,
  Shield,
  Zap,
  HelpCircle,
  ChevronDown,
  Calculator,
  Sparkles,
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

interface PresetCycle {
  nameTr: string;
  nameEn: string;
  dio: number;
  dso: number;
  dpo: number;
  descTr: string;
  descEn: string;
}

const PRESET_CYCLES: PresetCycle[] = [
  {
    nameTr: "⚡ Negatif Float (Amazon / Apple Modeli)",
    nameEn: "⚡ Negative Float (Amazon / Apple Model)",
    dio: 29,
    dso: 2,
    dpo: 60,
    descTr: "Müşteriden peşin tahsilat (DSO=2), tedarikçiye 60 gün sonra ödeme (DPO=60). Negatif CCC sermaye üretir. Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir.",
    descEn: "Collects cash instantly (DSO=2) while paying suppliers in 60 days (DPO=60). Negative CCC generates cash. Illustrative teaching scenario — figures are not current company estimates or investment views.",
  },
  {
    nameTr: "🏭 Standart İmalatçı (Pozitif CCC)",
    nameEn: "🏭 Standard Manufacturer (Positive CCC)",
    dio: 65,
    dso: 45,
    dpo: 35,
    descTr: "Hammadde depoda bekler, müşteriye vadeli satılır. +75 gün boyunca işletme sermayesi banka kredisiyle finanse edilir. Öğretim senaryosudur; gerçek sonuçlar değişebilir.",
    descEn: "Long inventory cycle and customer receivables create a +75-day cash gap funded by bank debt or equity. Illustrative scenario; actual outcomes vary.",
  },
  {
    nameTr: "🛒 Costco Toptancı Perakende Modeli",
    nameEn: "🛒 Costco Wholesale Retail Model",
    dio: 31,
    dso: 4,
    dpo: 33,
    descTr: "Mükemmel sıfıra yakın nakit döngüsü. Raftaki mallar tedarikçinin vadesi dolmadan satılıp nakde döner. Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir.",
    descEn: "Near-zero cash conversion cycle. Goods turn over on shelves before supplier invoices mature. Illustrative teaching scenario — figures are not current company estimates or investment views.",
  },
  {
    nameTr: "🚗 Ağır Sanayi / Otomotiv",
    nameEn: "🚗 Heavy Machinery / Automotive",
    dio: 80,
    dso: 60,
    dpo: 50,
    descTr: "Kompleks tedarik zincirleri ve bayi finansmanı yüzünden yüksek nakit kilitlenmesi yaşar. Öğretim senaryosudur; gerçek sonuçlar değişebilir.",
    descEn: "Complex global supply chains and dealer financing lock up working capital for 90 days. Illustrative scenario; actual outcomes vary.",
  },
];

export const CashConversionSim: React.FC = () => {
  const { isEnglish, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();
  const [dio, setDio] = useState<number>(29);
  const [dso, setDso] = useState<number>(2);
  const [dpo, setDpo] = useState<number>(60);
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  // Cash Conversion Cycle Formula: CCC = DIO + DSO - DPO
  const ccc = dio + dso - dpo;
  const isNegative = ccc < 0;

  const handleApplyPreset = (p: PresetCycle) => {
    setDio(p.dio);
    setDso(p.dso);
    setDpo(p.dpo);
  };

  const handleReset = () => {
    handleApplyPreset(PRESET_CYCLES[0]);
  };

  // Recharts Waterfall-like Data
  const chartData = [
    {
      name: t("CashConversionSim.1_dio_inventory_814"),
      days: dio,
      fill: "#6366F1",
    },
    {
      name: t("CashConversionSim.2_dso_receivables_815"),
      days: dso,
      fill: "#10B981",
    },
    {
      name: t("CashConversionSim.3_dpo_payables_816"),
      days: -dpo,
      fill: "#F59E0B",
    },
    {
      name: t("CashConversionSim.net_ccc_cash_cycle_817"),
      days: ccc,
      fill: isNegative ? "#06B6D4" : "#F43F5E",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs" id="cashconversion-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {t("CashConversionSim.step_5_interactive_t_818")}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {t("CashConversionSim.cash_conversion_cycl_819")}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {t("CashConversionSim.cash_conversion_cycl_820")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {t("CashConversionSim.ccc_dio_days_invento_821")}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {t("CashConversionSim.reset_amazon_float_822")}
        </button>
      </div>

      {/* Preset Cycles */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {t("CashConversionSim.preset_industry_work_823")}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_CYCLES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left text-xs transition-all cursor-pointer hover:border-indigo-300"
            >
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                {isEnglish ? p.nameEn : p.nameTr}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {isEnglish ? p.descEn : p.descTr}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Terminal Architecture (grid lg:grid-cols-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 3 Levers (5 cols) */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {t("CashConversionSim.3_working_capital_le_824")}
            </h3>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                isNegative
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                  : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
              }`}
            >
              CCC: {ccc} {t("CashConversionSim.days_825")}
            </span>
          </div>

          {/* 1. DIO Slider */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {t("CashConversionSim.1_dio_days_inventory_826")}
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setDio(Math.max(0, dio - 5))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>{dio} {t("CashConversionSim.days_827")}</span>
                <button
                  onClick={() => setDio(Math.min(180, dio + 5))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t("CashConversionSim.days_inventory_sits_828")}
            </p>
            <input
              type="range"
              min={0}
              max={180}
              step={1}
              value={dio}
              onChange={(e) => setDio(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 2. DSO Slider */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {t("CashConversionSim.2_dso_days_sales_out_829")}
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setDso(Math.max(0, dso - 2))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>{dso} {t("CashConversionSim.days_830")}</span>
                <button
                  onClick={() => setDso(Math.min(90, dso + 2))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t("CashConversionSim.days_to_collect_cash_831")}
            </p>
            <input
              type="range"
              min={0}
              max={90}
              step={1}
              value={dso}
              onChange={(e) => setDso(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 3. DPO Slider */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {t("CashConversionSim.3_dpo_days_payables_832")}
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setDpo(Math.max(0, dpo - 5))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>{dpo} {t("CashConversionSim.days_833")}</span>
                <button
                  onClick={() => setDpo(Math.min(180, dpo + 5))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t("CashConversionSim.days_before_you_must_834")}
            </p>
            <input
              type="range"
              min={0}
              max={180}
              step={1}
              value={dpo}
              onChange={(e) => setDpo(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Action-Oriented Pedagogical Directive */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong className="block font-bold text-amber-800 dark:text-amber-300 mb-1">
              💡 {t("CashConversionSim.action_oriented_floa_835")}
            </strong>
            {t("CashConversionSim.slide_dpo_to_60_days_836")}
          </div>
        </div>

        {/* Right Column: Recharts Chart & Glassmorphic Diagnostic (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Recharts Area */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-2">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t("CashConversionSim.cash_cycle_waterfall_837")}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">
                {t("CashConversionSim.formula_838")}: {dio} + {dso} - {dpo} = {ccc} {t("CashConversionSim.days_839")}
              </span>
            </div>

            <div className="h-56 sm:h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} unit={t("CashConversionSim.d_840")} />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        unit={t("CashConversionSim.days_841")}
                        valueFormatter={(val) => `${val}`}
                      />
                    }
                  />
                  <ReferenceLine y={0} stroke="#94A3B8" strokeWidth={1.5} />
                  <Bar dataKey="days" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic Diagnosis Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {t("CashConversionSim.working_capital_diag_842")}
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  {isNegative
                    ? t("CashConversionSim.negative_working_ca_843")
                    : t("CashConversionSim.positive_working_ca_844")}
                </h4>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  isNegative
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300"
                    : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300"
                }`}
              >
                {isNegative
                  ? t("CashConversionSim.superstar_float_845")
                  : t("CashConversionSim.capital_drain_846")}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {isNegative
                ? isEnglish
                  ? `Spectacular Liquidity Moat: The company generates cash ${Math.abs(ccc)} days before paying suppliers. Every dollar of revenue growth generates instant free liquidity without bank debt!`
                  : `Muazzam Likidite Hendeği: Şirket tedarikçiye ödeme yapmadan tam ${Math.abs(ccc)} gün önce nakdi kasasına koyuyor. Ciro büyüdükçe dış borca ihtiyaç duymadan kendi kendini finanse eder!`
                : isEnglish
                ? `Trapped Capital: The business requires working capital financing for ${ccc} days. Rapid growth may strain liquidity and require credit lines.`
                : `Kilitli Sermaye: Şirketin nakdi ${ccc} gün boyunca stokta veya alacakta kilitli kalıyor. Hızlı büyüme durumunda işletme sermayesi açığı için banka kredisi çekmek zorunda kalır.`}
            </p>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-ccc-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {t("CashConversionSim.see_the_calculation_847")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (t("CashConversionSim.hide_848")) : (t("CashConversionSim.show_849"))}</span>
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
              {/* Formula Breakdown Card */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                <div className="font-mono text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                  <div className="font-bold">
                    CCC = DIO ({dio} gün) + DSO ({dso} gün) - DPO ({dpo} gün) = {ccc} gün
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    {isNegative
                      ? isEnglish
                        ? `Negative Float Advantage: The firm operates with -${Math.abs(ccc)} days of working capital. Suppliers fund daily operations.`
                        : `Negatif Float Avantajı: Şirket -${Math.abs(ccc)} gün negatif işletme sermayesiyle çalışıyor. Tedarikçiler operasyonu bedelsiz finanse ediyor.`
                      : isEnglish
                        ? `Working Capital Drag: The business must fund +${ccc} days of tied-up cash in inventory and receivables.`
                        : `İşletme Sermayesi Yükü: Şirket stokta ve alacakta kilitli kalan +${ccc} günü banka kredisi veya özkaynakla finanse etmek zorundadır.`}
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-indigo-200/50 dark:border-indigo-800/50">
                  {t("CashConversionSim.working_capital_moat_850")}
                </p>
              </div>

              {/* Actionable CCC Experiments */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t("CashConversionSim.pedagogical_float_ex_851")}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    👉 <strong className="text-cyan-900 dark:text-cyan-300">{t("CashConversionSim.amazon_e_commerce_fl_852")}</strong>{" "}
                    {t("CashConversionSim.set_dio_to_29_dso_to_853")}
                  </p>
                  <p>
                    👉 <strong className="text-rose-900 dark:text-rose-300">{t("CashConversionSim.heavy_manufacturing_854")}</strong>{" "}
                    {t("CashConversionSim.set_dio_to_80_dso_to_855")}
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
