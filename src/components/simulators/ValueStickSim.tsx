import React, { useState } from "react";
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
  const { isEnglish } = useLanguage();
  const [wtp, setWtp] = useState<number>(1400);
  const [price, setPrice] = useState<number>(1099);
  const [cost, setCost] = useState<number>(520);
  const [wts, setWts] = useState<number>(400);

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
    { name: isEnglish ? "WTP (Customer Ceiling)" : "WTP (Müşteri Tavanı)", value: wtp, fill: "#6366F1" },
    { name: isEnglish ? "Price (Market Price)" : "Fiyat (Satış Fiyatı)", value: price, fill: "#10B981" },
    { name: isEnglish ? "Cost (Unit Cost)" : "Maliyet (Birim Maliyet)", value: cost, fill: "#F59E0B" },
    { name: isEnglish ? "WTS (Supplier Floor)" : "WTS (Tedarikçi Tabanı)", value: wts, fill: "#EC4899" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs" id="valuestick-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Step 3 Interactive Terminal" : "3. Adım İnteraktif Terminal"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Harvard / Oberholzer-Gee Value Stick" : "Harvard / Oberholzer-Gee Değer Çubuğu"}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "Value Stick: WTP vs Price vs Cost vs WTS" : "Etkileşimli Değer Çubuğu: WTP, Fiyat, Maliyet, WTS"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isEnglish
              ? "Move the 4 value levers on the left. Observe on the right how total value (WTP - WTS) is partitioned among Customer, Firm, and Supplier."
              : "Soldaki 4 değer kolunu kaydırın. Sağdaki görsel terminalde yaratılan toplam değerin (WTP - WTS) müşteri, şirket ve tedarikçi arasında nasıl bölüşüldüğünü canlı izleyin."}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset (Apple)" : "Sıfırla (Apple)"}
        </button>
      </div>

      {/* Preset Scenarios */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {isEnglish ? "Preset Corporate Archetypes:" : "Kurumsal Strateji Şablonları:"}
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
              {isEnglish ? "4 Value Levers:" : "4 Stratejik Değer Kolu:"}
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              Total: ${totalValueCreated}
            </span>
          </div>

          {/* 1. WTP Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                {isEnglish ? "WTP (Willingness to Pay)" : "WTP (Müşteri Ödeme İsteği)"}
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setWtp(Math.max(price, wtp - 50))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>${wtp}</span>
                <button
                  onClick={() => setWtp(wtp + 50)}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <input
              type="range"
              min={price}
              max={Math.max(6000, wtp * 1.5)}
              step={10}
              value={wtp}
              onChange={(e) => setWtp(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 2. Price Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {isEnglish ? "Price (Selling Price)" : "Fiyat (Satış Fiyatı)"}
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setPrice(Math.max(cost, price - 50))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>${price}</span>
                <button
                  onClick={() => setPrice(Math.min(wtp, price + 50))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <input
              type="range"
              min={cost}
              max={wtp}
              step={10}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 3. Cost Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {isEnglish ? "Cost (Unit Production Cost)" : "Maliyet (Birim Maliyet)"}
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setCost(Math.max(wts, cost - 25))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>${cost}</span>
                <button
                  onClick={() => setCost(Math.min(price, cost + 25))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <input
              type="range"
              min={wts}
              max={price}
              step={10}
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 4. WTS Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-pink-600 dark:text-pink-400">
                {isEnglish ? "WTS (Supplier Opportunity Cost)" : "WTS (Tedarikçi Satış Tabanı)"}
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setWts(Math.max(0, wts - 25))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>${wts}</span>
                <button
                  onClick={() => setWts(Math.min(cost, wts + 25))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={cost}
              step={10}
              value={wts}
              onChange={(e) => setWts(Number(e.target.value))}
              className="w-full accent-pink-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Action-Oriented Pedagogical Directive */}
          <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 text-xs text-indigo-950 dark:text-indigo-200">
            <strong className="block font-bold text-indigo-900 dark:text-indigo-300 mb-1">
              💡 {isEnglish ? "Action-Oriented Experiment:" : "Eyleme Dönük Değer Deneyi:"}
            </strong>
            {isEnglish
              ? "Drag the WTP lever higher; see how Customer Delight surges without shrinking firm profit. Now raise Cost toward Price; see how Firm Margin vanishes instantly into Supplier Surplus."
              : "WTP sürgüsünü yukarı çekin; sağdaki grafikte mavi Müşteri Rantının şirket kârını ezmeden nasıl devasa büyüdüğünü görün. Ardından Maliyet sürgüsünü Fiyata yaklaştırın; yeşil Firma Kârının nasıl sıfıra indiğini anında teşhis edin."}
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
                  {isEnglish ? "Economic Surplus Breakdown (Oberholzer-Gee)" : "Ekonomik Değer Paylaşımı (Harvard Value Stick)"}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                100% = ${totalValueCreated}
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
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isEnglish ? "Surplus Allocation Distribution:" : "3 Taraflı Refah Dağılımı:"}
            </h4>

            <div className="grid grid-cols-3 gap-2.5">
              {/* Customer Surplus */}
              <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 space-y-1">
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 block">
                  {isEnglish ? "Customer Delight" : "Müşteri Rantı"}
                </span>
                <div className="font-mono font-black text-base sm:text-lg text-indigo-900 dark:text-indigo-100">
                  ${customerDelight}
                </div>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 block">
                  %{customerShare.toFixed(1)} {isEnglish ? "share" : "pay"}
                </span>
              </div>

              {/* Firm Margin */}
              <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 block">
                  {isEnglish ? "Firm Margin" : "Şirket Kârı"}
                </span>
                <div className="font-mono font-black text-base sm:text-lg text-emerald-900 dark:text-emerald-100">
                  ${firmProfit}
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block">
                  %{firmShare.toFixed(1)} {isEnglish ? "share" : "pay"}
                </span>
              </div>

              {/* Supplier Surplus */}
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 block">
                  {isEnglish ? "Supplier Surplus" : "Tedarikçi Payı"}
                </span>
                <div className="font-mono font-black text-base sm:text-lg text-amber-900 dark:text-amber-100">
                  ${supplierSurplus}
                </div>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 block">
                  %{supplierShare.toFixed(1)} {isEnglish ? "share" : "pay"}
                </span>
              </div>
            </div>

            {/* Strategic Summary */}
            <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <span>
                {firmShare > 50
                  ? isEnglish
                    ? "Exceptional Pricing Power: The firm captures over 50% of the entire economic value created (Monopoly / High Moat)."
                    : "Üst Düzey Fiyatlama Gücü: Şirket yaratılan toplam refahın %50'sinden fazlasını tek başına kasasına çekiyor (Yüksek Hendek)."
                  : customerShare > 50
                  ? isEnglish
                    ? "Customer Surplus Focus: Costco-like architecture where high value is passed to customers to lock in massive retention and volume."
                    : "Müşteri Odaklı Strateji: Costco benzeri model; değerin çoğunluğu müşteriye aktarılarak yüksek sadakat ve devasa hacim kilitleniyor."
                  : isEnglish
                  ? "Balanced Ecosystem: Value is proportionally distributed across customer satisfaction, healthy supplier partnerships, and enterprise earnings."
                  : "Dengeli Ekosistem: Yaratılan değer müşteri memnuniyeti, tedarikçi kârlılığı ve şirket kârı arasında adil biçimde paylaşılıyor."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
