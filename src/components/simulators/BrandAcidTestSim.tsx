import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Shield,
  DollarSign,
  Award,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  TrendingUp,
  Percent,
  Layers,
  ArrowRight,
  Calculator,
  ChevronDown,
  BookOpen
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";

interface BrandPreset {
  id: string;
  nameTr: string;
  nameEn: string;
  badgeTr: string;
  badgeEn: string;
  price: number;
  cogs: number;
  cac: number;
  adSpendPercent: number;
  elasticity: number; // Price elasticity (< 1 = inelastic/pricing power)
  descTr: string;
  descEn: string;
  moatVerdict: "true-moat" | "lifestyle" | "commodity";
}

const BRAND_PRESETS: BrandPreset[] = [
  {
    id: "tiffany",
    nameTr: "💎 Tiffany / Apple / Hermès",
    nameEn: "💎 Tiffany / Apple / Hermès",
    badgeTr: "Fiyatlama Gücü (Gerçek Hendek)",
    badgeEn: "True Moat (Pricing Power)",
    price: 1000,
    cogs: 250,
    cac: 60,
    adSpendPercent: 6,
    elasticity: 0.35, // Inelastic: customers don't leave when prices rise
    descTr: "Mavi kutu ve statü etkisi sayesinde %10 zam yapıldığında müşteri kaçışı neredeyse sıfırdır; arama maliyeti ve CAC düşüktür.",
    descEn: "Customers gladly accept price hikes; low price elasticity (0.35) delivers massive gross margins without churn.",
    moatVerdict: "true-moat"
  },
  {
    id: "cpg",
    nameTr: "🥤 Klasik Tüketim Markası (CPG)",
    nameEn: "🥤 Consumer Packaged Brand (CPG)",
    badgeTr: "Dar / Kırılgan Hendek",
    badgeEn: "Narrow / Fragile Moat",
    price: 100,
    cogs: 50,
    cac: 15,
    adSpendPercent: 14,
    elasticity: 1.10, // Unit elastic
    descTr: "Tanınan bir markadır ancak markette özel markalı (private label) ucuz muadiller çıktığında pazar payını korumak için yoğun reklam harcaması gerekir.",
    descEn: "Recognized name, but vulnerable to private-label store brands unless heavy advertising is continuously spent.",
    moatVerdict: "lifestyle"
  },
  {
    id: "commodity-brand",
    nameTr: "⚡ Reklamla Yaşatılan Marka",
    nameEn: "⚡ Ad-Dependent Commodity",
    badgeTr: "Hendeksiz (Pahalı İllüzyon)",
    badgeEn: "No Moat (Ad Cost Trap)",
    price: 80,
    cogs: 45,
    cac: 28,
    adSpendPercent: 25,
    elasticity: 2.20, // Highly elastic: price hike causes massive volume loss
    descTr: "Logosu bilinir ama müşteri fiyata aşırı duyarlıdır. Şirket reklamı kestiği anda satışlar çöker (reklam kârı yutar).",
    descEn: "Famous logo, but high price sensitivity means cutting ad spend immediately triggers catastrophic sales drop.",
    moatVerdict: "commodity"
  }
];

export const BrandAcidTestSim: React.FC = () => {
  const { isEnglish, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();

  const [price, setPrice] = useState<number>(500);
  const [cogs, setCogs] = useState<number>(180);
  const [cac, setCac] = useState<number>(40);
  const [adSpendPercent, setAdSpendPercent] = useState<number>(8);
  const [elasticity, setElasticity] = useState<number>(0.5); // Price elasticity
  const [priceHikePercent, setPriceHikePercent] = useState<number>(10); // Simulated +% price hike
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  // Base calculation
  const baseGrossProfit = price - cogs;
  const baseAdCost = price * (adSpendPercent / 100);
  const baseOperatingProfit = baseGrossProfit - baseAdCost - cac;
  const baseMarginPercent = ((baseOperatingProfit / price) * 100);

  // Shock (+priceHikePercent)
  const newPrice = price * (1 + priceHikePercent / 100);
  const volumeChangePercent = -elasticity * priceHikePercent; // % drop in volume
  const volumeMultiplier = Math.max(0.1, 1 + volumeChangePercent / 100);

  const newGrossProfitPerUnit = newPrice - cogs;
  const newAdCostPerUnit = newPrice * (adSpendPercent / 100);
  const newOperatingProfitPerUnit = newGrossProfitPerUnit - newAdCostPerUnit - cac;
  
  // Total profit index (Base = 100 units)
  const baseTotalProfit = 100 * baseOperatingProfit;
  const newTotalProfit = 100 * volumeMultiplier * newOperatingProfitPerUnit;
  const profitChangePercent = ((newTotalProfit - baseTotalProfit) / Math.abs(baseTotalProfit)) * 100;

  const applyPreset = (preset: BrandPreset) => {
    setPrice(preset.price);
    setCogs(preset.cogs);
    setCac(preset.cac);
    setAdSpendPercent(preset.adSpendPercent);
    setElasticity(preset.elasticity);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-slate-900/10 border border-pink-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 font-black text-xs uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              {t("BrandAcidTestSim.the_brand_acid_test_748")}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("BrandAcidTestSim.when_is_a_brand_a_mo_749")}
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {t("BrandAcidTestSim.a_famous_brand_is_no_750")}
            </p>
          </div>
        </div>
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BRAND_PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => applyPreset(p)}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500 transition-all text-left group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {isEnglish ? p.badgeEn : p.badgeTr}
                </span>
                <span className="text-xs font-mono font-bold text-pink-500">
                  e: {p.elasticity}
                </span>
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-base mb-1 group-hover:text-pink-500 transition-colors">
                {isEnglish ? p.nameEn : p.nameTr}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isEnglish ? p.descEn : p.descTr}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-pink-600 dark:text-pink-400">
              <span>{t("BrandAcidTestSim.test_archetype_751")}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Controls & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-pink-500" />
            {t("BrandAcidTestSim.brand_economics_752")}
          </div>

          {/* Price Elasticity */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {t("BrandAcidTestSim.price_elasticity_of_753")}
              </span>
              <span className="font-black text-pink-500 font-mono">
                {elasticity} {elasticity < 1 ? (t("BrandAcidTestSim.inelastic_pricing_p_754")) : (t("BrandAcidTestSim.elastic_fragile_755"))}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.5"
              step="0.05"
              value={elasticity}
              onChange={(e) => setElasticity(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          {/* Ad Spend % */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {t("BrandAcidTestSim.ad_brand_maintenance_756")}
              </span>
              <span className="font-black text-slate-900 dark:text-white font-mono">
                %{adSpendPercent}
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="30"
              step="1"
              value={adSpendPercent}
              onChange={(e) => setAdSpendPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-600"
            />
          </div>

          {/* Price Hike Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {t("BrandAcidTestSim.test_price_hike_incr_757")}
              </span>
              <span className="font-black text-emerald-600 dark:text-emerald-400 font-mono">
                +%{priceHikePercent}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={priceHikePercent}
              onChange={(e) => setPriceHikePercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        {/* Results / Diagnosis Box */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-base">
              {t("BrandAcidTestSim.price_hike_economic_758")}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t("BrandAcidTestSim.comparing_pre_hike_v_759")}
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 font-bold block">
                {t("BrandAcidTestSim.volume_impact_760")}
              </span>
              <span className={`text-xl font-black font-mono ${volumeChangePercent >= 0 ? "text-slate-900 dark:text-white" : "text-rose-500"}`}>
                {volumeChangePercent.toFixed(1)}%
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                {t("BrandAcidTestSim.drop_in_unit_volume_761")}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 font-bold block">
                {t("BrandAcidTestSim.per_unit_margin_762")}
              </span>
              <span className="text-xl font-black font-mono text-emerald-500">
                %{((newOperatingProfitPerUnit / newPrice) * 100).toFixed(1)}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                {isEnglish ? `Up from %${baseMarginPercent.toFixed(1)}` : `Eski oran: %${baseMarginPercent.toFixed(1)}`}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${profitChangePercent >= 0 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-500"}`}>
              <span className="text-xs font-bold block">
                {t("BrandAcidTestSim.total_profit_change_763")}
              </span>
              <span className="text-xl font-black font-mono">
                {profitChangePercent >= 0 ? "+" : ""}{profitChangePercent.toFixed(1)}%
              </span>
              <p className="text-[11px] mt-1 opacity-80">
                {profitChangePercent >= 0
                  ? t("BrandAcidTestSim.pricing_power_create_764")
                  : t("BrandAcidTestSim.volume_loss_destroye_765")}
              </p>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-4">
            <div className={`p-2.5 rounded-xl shrink-0 ${elasticity < 0.8 ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500"}`}>
              {elasticity < 0.8 ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm">
                {elasticity < 0.8
                  ? t("BrandAcidTestSim.durable_brand_moat_p_766")
                  : t("BrandAcidTestSim.vulnerable_cosmetic_767")}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {elasticity < 0.8
                  ? t("BrandAcidTestSim.because_elasticity_i_768")
                  : t("BrandAcidTestSim.warning_when_prices_769")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-brand-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {t("BrandAcidTestSim.see_the_calculation_770")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (t("BrandAcidTestSim.hide_771")) : (t("BrandAcidTestSim.show_772"))}</span>
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
              id="brand-sim-calculation-breakdown"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-3 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-5"
            >
              {/* Formula Blueprint */}
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{t("BrandAcidTestSim.brand_pricing_power_773")}</span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-indigo-950 dark:text-indigo-100 font-bold bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/80">
                  <span>{t("BrandAcidTestSim.volume_change_price_774")}</span>
                  <br />
                  <span>{t("BrandAcidTestSim.unit_margin_new_pric_775")}</span>
                  <br />
                  <span>{t("BrandAcidTestSim.total_profit_new_cus_776")}</span>
                </div>
              </div>

              {/* Step-by-Step Diagnostic Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t("BrandAcidTestSim.step_by_step_numeric_777")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block font-bold mb-1">
                      {t("BrandAcidTestSim.1_baseline_unit_econ_778")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {isEnglish
                        ? `Price: $${price} | COGS: $${cogs} | Ad Spend: $${baseAdCost.toFixed(1)} | CAC: $${cac} -> Base Profit: $${baseOperatingProfit.toFixed(1)}/unit`
                        : `Fiyat: $${price} | COGS: $${cogs} | Reklam: $${baseAdCost.toFixed(1)} | CAC: $${cac} -> Taban Kâr: $${baseOperatingProfit.toFixed(1)}/birim`}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block font-bold mb-1">
                      {t("BrandAcidTestSim.2_price_shock_priceh_779")} {priceHikePercent}%)
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {isEnglish
                        ? `New Price: $${newPrice.toFixed(1)} | Volume Defection: ${volumeChangePercent.toFixed(1)}% | Retained Units: ${(100 * volumeMultiplier).toFixed(1)}`
                        : `Yeni Fiyat: $${newPrice.toFixed(1)} | Kaybedilen Hacim: %${Math.abs(volumeChangePercent).toFixed(1)} | Kalan Birim: ${(100 * volumeMultiplier).toFixed(1)}`}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block font-bold mb-1">
                      {t("BrandAcidTestSim.3_net_operating_prof_780")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {isEnglish
                        ? `Total Post-Hike Profit: $${newTotalProfit.toFixed(1)} vs Pre-Hike: $${baseTotalProfit.toFixed(1)} (${profitChangePercent >= 0 ? "+" : ""}${profitChangePercent.toFixed(1)}%)`
                        : `Zam Sonrası Toplam Kâr: $${newTotalProfit.toFixed(1)} vs Zam Öncesi: $${baseTotalProfit.toFixed(1)} (${profitChangePercent >= 0 ? "+" : ""}${profitChangePercent.toFixed(1)}%)`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
