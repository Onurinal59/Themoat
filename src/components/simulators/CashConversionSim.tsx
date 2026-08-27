import React, { useState } from "react";
import {
  TrendingUp,
  RotateCcw,
  Clock,
  Layers,
  ArrowRight,
  Shield,
  Zap,
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
  const { isEnglish } = useLanguage();
  const [dio, setDio] = useState<number>(29);
  const [dso, setDso] = useState<number>(2);
  const [dpo, setDpo] = useState<number>(60);

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
      name: isEnglish ? "1. DIO (Inventory)" : "1. DIO (Stok)",
      days: dio,
      fill: "#6366F1",
    },
    {
      name: isEnglish ? "2. DSO (Receivables)" : "2. DSO (Alacak)",
      days: dso,
      fill: "#10B981",
    },
    {
      name: isEnglish ? "3. DPO (Payables)" : "3. DPO (Tedarikçi Borcu)",
      days: -dpo,
      fill: "#F59E0B",
    },
    {
      name: isEnglish ? "Net CCC (Cash Cycle)" : "Net CCC (Nakit Döngüsü)",
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
              {isEnglish ? "Step 5 Interactive Terminal" : "5. Adım İnteraktif Terminal"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Cash Conversion Cycle (CCC)" : "Nakit Dönüşüm Süresi (CCC)"}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "Cash Conversion Cycle: DIO + DSO - DPO" : "Nakit Dönüşüm Süresi & İşletme Sermayesi Motoru"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isEnglish
              ? "CCC = DIO (Days Inventory) + DSO (Days Receivables) - DPO (Days Payables). Discover how negative working capital turns growth into a free funding machine."
              : "CCC = Stok Bekleme (DIO) + Alacak Tahsil (DSO) - Tedarikçi Ödeme (DPO). Negatif işletme sermayesinin şirketi nasıl faizsiz büyüme makinesine dönüştürdüğünü deneyimleyin."}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset (Amazon Float)" : "Sıfırla (Amazon Float)"}
        </button>
      </div>

      {/* Preset Cycles */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {isEnglish ? "Preset Industry Working Capital Profiles:" : "Sektörel Nakit Döngü Profilleri:"}
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
              {isEnglish ? "3 Working Capital Levers:" : "3 İşletme Sermayesi Kolu:"}
            </h3>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                isNegative
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                  : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
              }`}
            >
              CCC: {ccc} {isEnglish ? "Days" : "Gün"}
            </span>
          </div>

          {/* 1. DIO Slider */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {isEnglish ? "1. DIO (Days Inventory Outstanding)" : "1. DIO (Stokta Kalma Süresi)"}
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setDio(Math.max(0, dio - 5))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>{dio} {isEnglish ? "Days" : "Gün"}</span>
                <button
                  onClick={() => setDio(Math.min(180, dio + 5))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEnglish ? "Days inventory sits in warehouse before being sold" : "Ürünün depoda satılana kadar rafta beklediği gün sayısı"}
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
                {isEnglish ? "2. DSO (Days Sales Outstanding)" : "2. DSO (Alacak Tahsil Süresi)"}
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setDso(Math.max(0, dso - 2))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>{dso} {isEnglish ? "Days" : "Gün"}</span>
                <button
                  onClick={() => setDso(Math.min(90, dso + 2))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEnglish ? "Days to collect cash from customers after sale" : "Satış yapıldıktan sonra müşteriden nakdin tahsil edilme süresi"}
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
                {isEnglish ? "3. DPO (Days Payables Outstanding)" : "3. DPO (Tedarikçi Borç Ödeme)"}
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setDpo(Math.max(0, dpo - 5))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>{dpo} {isEnglish ? "Days" : "Gün"}</span>
                <button
                  onClick={() => setDpo(Math.min(180, dpo + 5))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEnglish ? "Days before you must pay supplier invoices" : "Hammadde/ürün tedarikçisine fatura bedelini ödeme vadesi"}
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
              💡 {isEnglish ? "Action-Oriented Float Experiment:" : "Eyleme Dönük Float Deneyi:"}
            </strong>
            {isEnglish
              ? "Slide DPO to 60 days, and reduce DIO to 29 and DSO to 2. Observe the right chart: CCC turns into a negative -29 days! Amazon literally runs its business on free supplier credit."
              : "DPO sürgüsünü 60 güne çıkarın; DIO'yu 29 ve DSO'yu 2 güne indirin. Sağdaki grafikte CCC'nin -29 güne düştüğünü görün! Şirket banka kredisi yerine tedarikçinin parasıyla faizsiz büyüme makinesine dönüşür."}
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
                  {isEnglish ? "Cash Cycle Waterfall (Days)" : "Nakit Döngü Bileşenleri (Gün)"}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">
                {isEnglish ? "Formula" : "Formül"}: {dio} + {dso} - {dpo} = {ccc} {isEnglish ? "Days" : "Gün"}
              </span>
            </div>

            <div className="h-56 sm:h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} unit={isEnglish ? " d" : " gün"} />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        unit={isEnglish ? " Days" : " Gün"}
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
                  {isEnglish ? "Working Capital Diagnostic" : "İşletme Sermayesi Teşhisi"}
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  {isNegative
                    ? isEnglish
                      ? "⚡ Negative Working Capital (Float Machine)"
                      : "⚡ Negatif İşletme Sermayesi (Float Makinesi)"
                    : isEnglish
                    ? "⚠️ Positive Working Capital (Trapped Liquidity)"
                    : "⚠️ Pozitif İşletme Sermayesi (Kilitli Nakit)"}
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
                  ? isEnglish
                    ? "Superstar Float"
                    : "Süperstar Float"
                  : isEnglish
                  ? "Capital Drain"
                  : "Sermaye Emici"}
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
    </div>
  );
};
