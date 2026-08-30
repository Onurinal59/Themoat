import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  RotateCcw,
  DollarSign,
  TrendingUp,
  Award,
  Layers,
  ArrowUpRight,
  Shield,
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
  Legend,
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { CustomChartTooltip } from "../ChartTooltip";

interface Scenario {
  nameTr: string;
  nameEn: string;
  descTr: string;
  descEn: string;
  wtp: number;
  price: number;
  cost: number;
  wts: number;
}

const PRESET_SCENARIOS: Scenario[] = [
  {
    nameTr: "Lüks & Farklılaşma (Apple iPhone Modeli)",
    nameEn: "Luxury & Differentiation (Apple iPhone Model)",
    descTr: "Yüksek WTP sayesinde fiyatlama gücü ve müşteriye sağlanan algılanan değer. Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir.",
    descEn: "Elevated WTP unlocks pricing power and robust perceived consumer value. Illustrative teaching scenario — figures are not current company estimates or investment views.",
    wtp: 1400,
    price: 1099,
    cost: 520,
    wts: 400,
  },
  {
    nameTr: "Maliyet Liderliği (Costco Toptan Modeli)",
    nameEn: "Cost Leadership (Costco Wholesale Model)",
    descTr: "Düşük WTS ve düşük maliyet ile yüksek sermaye devir hızı. Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir.",
    descEn: "Depressed WTS and lean operating costs maximize consumer surplus and inventory velocity. Illustrative teaching scenario — figures are not current company estimates or investment views.",
    wtp: 120,
    price: 90,
    cost: 82,
    wts: 60,
  },
  {
    nameTr: "Emtia Havayolu (Yoğun Rekabet)",
    nameEn: "Commodity Airline (Severe Competition)",
    descTr: "WTP düşük, tedarikçi ve havalimanı maliyetleri yüksek; şirket kârı çok ince. Öğretim senaryosudur; gerçek sonuçlar değişebilir.",
    descEn: "Low WTP, high supplier airport fees; company captures paper-thin margins. Illustrative scenario; actual outcomes vary.",
    wtp: 250,
    price: 210,
    cost: 200,
    wts: 180,
  },
  {
    nameTr: "Tiffany & Co (Prestij Markası Modeli)",
    nameEn: "Tiffany & Co (Prestige Brand Model)",
    descTr: "Mavi kutu ve marka prestiji ile müşterinin ödeme isteği (WTP) yükselmiştir. Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir.",
    descEn: "Iconic blue box and prestige status lift customer willingness-to-pay. Illustrative teaching scenario — figures are not current company estimates or investment views.",
    wtp: 5000,
    price: 4200,
    cost: 1500,
    wts: 1200,
  },
];

export const ValueStickSim: React.FC = () => {
  const { isEnglish, t , formatPercentagePoints, formatCurrency, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();
  const [wtp, setWtp] = useState<number>(1400);
  const [price, setPrice] = useState<number>(1099);
  const [cost, setCost] = useState<number>(520);
  const [wts, setWts] = useState<number>(400);
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  // Economic calculations (Felix Oberholzer-Gee Value Stick)
  const totalValueCreated = Math.max(0, wtp - wts);
  const customerDelight = Math.max(0, wtp - price); // Consumer surplus (WTP - Price)
  const firmProfit = Math.max(0, price - cost); // Firm margin (Price - Cost)
  const supplierSurplus = Math.max(0, cost - wts); // Supplier surplus (Cost - WTS)

  const customerShare = totalValueCreated > 0 ? (customerDelight / totalValueCreated) * 100 : 0;
  const firmShare = totalValueCreated > 0 ? (firmProfit / totalValueCreated) * 100 : 0;
  const supplierShare = totalValueCreated > 0 ? (supplierSurplus / totalValueCreated) * 100 : 0;

  const handleApplyPreset = (sc: Scenario) => {
    setWtp(sc.wtp);
    setPrice(sc.price);
    setCost(sc.cost);
    setWts(sc.wts);
  };

  const handleReset = () => {
    handleApplyPreset(PRESET_SCENARIOS[0]);
  };

  const levelsChartData = [
    { name: t("ValueStickSim.wtp_customer_ceiling_1312"), value: wtp, fill: "#6366F1" },
    { name: t("ValueStickSim.price_market_price_1313"), value: price, fill: "#10B981" },
    { name: t("ValueStickSim.cost_unit_cost_1314"), value: cost, fill: "#F59E0B" },
    { name: t("ValueStickSim.wts_supplier_floor_1315"), value: wts, fill: "#EC4899" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs" id="valuestick-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {t("ValueStickSim.step_3_interactive_t_1316")}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {t("ValueStickSim.harvard_oberholzer_g_1317")}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {t("ValueStickSim.value_stick_wtp_vs_p_1318")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {t("ValueStickSim.move_the_4_value_lev_1319")}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {t("ValueStickSim.reset_apple_1320")}
        </button>
      </div>

      {/* Preset Scenarios */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {t("ValueStickSim.preset_corporate_arc_1321")}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_SCENARIOS.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(sc)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left text-xs transition-all cursor-pointer hover:border-indigo-300"
            >
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                {isEnglish ? sc.nameEn : sc.nameTr}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {isEnglish ? sc.descEn : sc.descTr}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Terminal Architecture (grid lg:grid-cols-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 4 Strategic Levers (5 cols) */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {t("ValueStickSim.4_value_levers_1322")}
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              {t("audit.total", undefined, { value: formatCurrency(totalValueCreated) })}
            </span>
          </div>

          {/* 1. WTP Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <label
                id="valuestick-slider-wtp-label"
                htmlFor="valuestick-slider-wtp"
                className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 cursor-pointer"
              >
                {t("ValueStickSim.wtp_willingness_to_p_1323")}
              </label>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  type="button"
                  onClick={() => setWtp(Math.max(price, wtp - 50))}
                  aria-label={t("ValueStickSim.decrease_wtp_by_50_1324")}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200 cursor-pointer"
                >
                  -
                </button>
                <span>{formatCurrency(wtp)}</span>
                <button
                  type="button"
                  onClick={() => setWtp(wtp + 50)}
                  aria-label={t("ValueStickSim.increase_wtp_by_50_1325")}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <input
              id="valuestick-slider-wtp"
              type="range"
              min={price}
              max={Math.max(6000, wtp * 1.5)}
              step={10}
              value={wtp}
              aria-labelledby="valuestick-slider-wtp-label"
              aria-valuetext={t("audit.valueStickWtp", undefined, { value: formatCurrency(wtp) })}
              onChange={(e) => setWtp(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 2. Price Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <label
                id="valuestick-slider-price-label"
                htmlFor="valuestick-slider-price"
                className="font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer"
              >
                {t("ValueStickSim.price_selling_price_1326")}
              </label>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  type="button"
                  onClick={() => setPrice(Math.max(cost, price - 50))}
                  aria-label={t("ValueStickSim.decrease_price_by_50_1327")}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200 cursor-pointer"
                >
                  -
                </button>
                <span>{formatCurrency(price)}</span>
                <button
                  type="button"
                  onClick={() => setPrice(Math.min(wtp, price + 50))}
                  aria-label={t("ValueStickSim.increase_price_by_50_1328")}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <input
              id="valuestick-slider-price"
              type="range"
              min={cost}
              max={wtp}
              step={10}
              value={price}
              aria-labelledby="valuestick-slider-price-label"
              aria-valuetext={t("audit.valueStickPrice", undefined, { value: formatCurrency(price) })}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 3. Cost Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <label
                id="valuestick-slider-cost-label"
                htmlFor="valuestick-slider-cost"
                className="font-bold text-amber-600 dark:text-amber-400 cursor-pointer"
              >
                {t("ValueStickSim.cost_unit_production_1329")}
              </label>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  type="button"
                  onClick={() => setCost(Math.max(wts, cost - 25))}
                  aria-label={t("ValueStickSim.decrease_cost_by_25_1330")}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200 cursor-pointer"
                >
                  -
                </button>
                <span>{formatCurrency(cost)}</span>
                <button
                  type="button"
                  onClick={() => setCost(Math.min(price, cost + 25))}
                  aria-label={t("ValueStickSim.increase_cost_by_25_1331")}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <input
              id="valuestick-slider-cost"
              type="range"
              min={wts}
              max={price}
              step={10}
              value={cost}
              aria-labelledby="valuestick-slider-cost-label"
              aria-valuetext={t("audit.valueStickCost", undefined, { value: formatCurrency(cost) })}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 4. WTS Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <label
                id="valuestick-slider-wts-label"
                htmlFor="valuestick-slider-wts"
                className="font-bold text-pink-600 dark:text-pink-400 cursor-pointer"
              >
                {t("ValueStickSim.wts_supplier_opportu_1332")}
              </label>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  type="button"
                  onClick={() => setWts(Math.max(0, wts - 25))}
                  aria-label={t("ValueStickSim.decrease_wts_by_25_1333")}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200 cursor-pointer"
                >
                  -
                </button>
                <span>{formatCurrency(wts)}</span>
                <button
                  type="button"
                  onClick={() => setWts(Math.min(cost, wts + 25))}
                  aria-label={t("ValueStickSim.increase_wts_by_25_1334")}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <input
              id="valuestick-slider-wts"
              type="range"
              min={0}
              max={cost}
              step={10}
              value={wts}
              aria-labelledby="valuestick-slider-wts-label"
              aria-valuetext={t("audit.valueStickWts", undefined, { value: formatCurrency(wts) })}
              onChange={(e) => setWts(Number(e.target.value))}
              className="w-full accent-pink-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Action-Oriented Pedagogical Directive */}
          <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 text-xs text-indigo-950 dark:text-indigo-200">
            <strong className="block font-bold text-indigo-900 dark:text-indigo-300 mb-1">
              💡 {t("ValueStickSim.action_oriented_expe_1335")}
            </strong>
            {t("ValueStickSim.drag_the_wtp_lever_h_1336")}
          </div>
        </div>

        {/* Right Column: Recharts Visual & Glassmorphic Surplus Card (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Recharts Area */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-2">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t("ValueStickSim.economic_surplus_bre_1337")}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                100% = {formatCurrency(totalValueCreated)}
              </span>
            </div>

            <div className="h-56 sm:h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={levelsChartData} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#94A3B8" }} unit="$" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} width={110} />
                  <Tooltip content={<CustomChartTooltip prefix="$" />} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {levelsChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic 3-Way Surplus Allocation Card */}
          <div role="status" aria-live="polite" className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t("ValueStickSim.surplus_allocation_d_1338")}
            </h4>

            <div className="grid grid-cols-3 gap-2.5">
              {/* Customer Surplus */}
              <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 space-y-1">
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 block">
                  {t("ValueStickSim.customer_delight_1339")}
                </span>
                <div className="font-mono font-black text-base sm:text-lg text-indigo-900 dark:text-indigo-100">
                  {formatCurrency(customerDelight)}
                </div>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 block">
                  {formatPercentagePoints(customerShare, 1)} {t("ValueStickSim.share_1340")}
                </span>
              </div>

              {/* Firm Margin */}
              <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 block">
                  {t("ValueStickSim.firm_margin_1341")}
                </span>
                <div className="font-mono font-black text-base sm:text-lg text-emerald-900 dark:text-emerald-100">
                  {formatCurrency(firmProfit)}
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block">
                  {formatPercentagePoints(firmShare, 1)} {t("ValueStickSim.share_1342")}
                </span>
              </div>

              {/* Supplier Surplus */}
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 block">
                  {t("ValueStickSim.supplier_surplus_1343")}
                </span>
                <div className="font-mono font-black text-base sm:text-lg text-amber-900 dark:text-amber-100">
                  {formatCurrency(supplierSurplus)}
                </div>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 block">
                  {formatPercentagePoints(supplierShare, 1)} {t("ValueStickSim.share_1344")}
                </span>
              </div>
            </div>

            {/* Strategic Summary */}
            <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <span>
                {firmShare > 50
                  ? t("ValueStickSim.exceptional_pricing_1345")
                  : customerShare > 50
                  ? t("ValueStickSim.customer_surplus_foc_1346")
                  : t("ValueStickSim.balanced_ecosystem_v_1347")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-valuestick-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {t("ValueStickSim.see_the_calculation_1348")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (t("ValueStickSim.hide_1349")) : (t("ValueStickSim.show_1350"))}</span>
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
              {/* Formula and Interpretation Card */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                <div className="font-mono text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                  <div className="font-bold">
                    {t("audit.valueTotal", undefined, {
                      wtp: formatCurrency(wtp),
                      wts: formatCurrency(wts),
                      total: formatCurrency(totalValueCreated),
                    })}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    {t("audit.valueCustomer", undefined, {
                      wtp: formatCurrency(wtp),
                      price: formatCurrency(price),
                      value: formatCurrency(customerDelight),
                      share: formatPercentagePoints(customerShare, 1),
                    })}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    {t("audit.valueFirm", undefined, {
                      price: formatCurrency(price),
                      cost: formatCurrency(cost),
                      value: formatCurrency(firmProfit),
                      share: formatPercentagePoints(firmShare, 1),
                    })}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    {t("audit.valueSupplier", undefined, {
                      cost: formatCurrency(cost),
                      wts: formatCurrency(wts),
                      value: formatCurrency(supplierSurplus),
                      share: formatPercentagePoints(supplierShare, 1),
                    })}
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-indigo-200/50 dark:border-indigo-800/50">
                  {t("ValueStickSim.oberholzer_gee_value_1351")}
                </p>
              </div>

              {/* Actionable Strategy Guidance */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t("ValueStickSim.pedagogical_lever_ex_1352")}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    👉 <strong className="text-indigo-900 dark:text-indigo-300">{t("ValueStickSim.wtp_expansion_differ_1353")}</strong>{" "}
                    {t("ValueStickSim.increase_wtp_through_1354")}
                  </p>
                  <p>
                    👉 <strong className="text-pink-900 dark:text-pink-300">{t("ValueStickSim.wts_compression_supp_1355")}</strong>{" "}
                    {t("ValueStickSim.lower_supplier_willi_1356")}
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
