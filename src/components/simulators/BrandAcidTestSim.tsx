import React, { useState } from "react";
import { motion } from "motion/react";
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
  ArrowRight
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
  const { isEnglish } = useLanguage();

  const [price, setPrice] = useState<number>(500);
  const [cogs, setCogs] = useState<number>(180);
  const [cac, setCac] = useState<number>(40);
  const [adSpendPercent, setAdSpendPercent] = useState<number>(8);
  const [elasticity, setElasticity] = useState<number>(0.5); // Price elasticity
  const [priceHikePercent, setPriceHikePercent] = useState<number>(10); // Simulated +% price hike

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
              {isEnglish ? "The Brand Acid Test" : "Marka Hendek Asit Testi"}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isEnglish ? "When is a Brand a Moat vs. an Advertising Expense?" : "Marka Ne Zaman Bir Hendektir, Ne Zaman Reklam Masrafıdır?"}
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {isEnglish
                ? "A famous brand is not automatically a moat. A brand creates economic value ONLY if it delivers pricing power (low price elasticity) or lower customer acquisition costs without requiring exorbitant advertising to defend market share."
                : "Bilinir olmak tek başına bir hendek değildir. Bir marka ancak fiyatlama gücü (düşük esneklik) yaratarak ya da müşteri edinme maliyetini (CAC) düşürerek gelir tablosunda somut kâra dönüştüğünde hendek sayılır."}
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
              <span>{isEnglish ? "Test Archetype" : "Profili Yükle"}</span>
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
            {isEnglish ? "Brand Economics" : "Marka Finansal Parametreleri"}
          </div>

          {/* Price Elasticity */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? "Price Elasticity of Demand" : "Fiyat Talep Esnekliği (e)"}
              </span>
              <span className="font-black text-pink-500 font-mono">
                {elasticity} {elasticity < 1 ? (isEnglish ? "(Inelastic - Pricing Power)" : "(Fiyatlama Gücü)") : (isEnglish ? "(Elastic - Fragile)" : "(Hassas)")}
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
                {isEnglish ? "Ad / Brand Maintenance (% Rev)" : "Reklam & Marka Savunma Bütçesi"}
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
                {isEnglish ? "Test Price Hike (% Increase)" : "Simüle Edilen Fiyat Zammı"}
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
              {isEnglish ? "Price Hike Economic Reaction Shock" : "Fiyat Zammı Sonrası Net Kâr Tepkisi"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEnglish
                ? "Comparing pre-hike vs post-hike total operating profit across 100 customer base"
                : "100 birimlik müşteri tabanında zam öncesi ve sonrası toplam faaliyet kârı değişimi"}
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 font-bold block">
                {isEnglish ? "Volume Impact" : "Satış Hacmi Değişimi"}
              </span>
              <span className={`text-xl font-black font-mono ${volumeChangePercent >= 0 ? "text-slate-900 dark:text-white" : "text-rose-500"}`}>
                {volumeChangePercent.toFixed(1)}%
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                {isEnglish ? "Drop in unit volume sold" : "Kayıp müşteri / adet oranı"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 font-bold block">
                {isEnglish ? "Per-Unit Margin" : "Birim Faaliyet Marjı"}
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
                {isEnglish ? "Total Profit Change" : "Toplam Kâr Değişimi"}
              </span>
              <span className="text-xl font-black font-mono">
                {profitChangePercent >= 0 ? "+" : ""}{profitChangePercent.toFixed(1)}%
              </span>
              <p className="text-[11px] mt-1 opacity-80">
                {profitChangePercent >= 0
                  ? isEnglish ? "Pricing power creates wealth!" : "Fiyatlama gücü kârı artırdı!"
                  : isEnglish ? "Volume loss destroyed profit!" : "Müşteri kaybı kârı eritti!"}
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
                  ? isEnglish ? "True Economic Brand Moat" : "Hakiki Ekonomik Marka Hendeği"
                  : isEnglish ? "Vulnerable / Cosmetic Brand" : "Kırılgan / Yalnızca Kozmetik Marka"}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {elasticity < 0.8
                  ? isEnglish
                    ? "Because elasticity is low, the price hike immediately flows straight to the bottom line without causing customer churn. The brand acts as an authentic pricing power shield."
                    : "Müşteri esnekliği düşük olduğu için yapılan zam doğrudan net kâra yansır ve pazar payı kaybına yol açmaz. Bu marka gerçek bir ekonomik hendektir."
                  : isEnglish
                    ? "Warning: When prices rise, customers rapidly defect to competitors or private labels. The brand requires continuous high advertising spend just to stay alive."
                    : "Uyarı: Fiyat yükseldiğinde müşteriler hızla muadillere kaçmaktadır. Bu şirketin markası bir hendek değil; sadece ayakta kalmak için ödenen yüksek bir reklam masrafıdır."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
