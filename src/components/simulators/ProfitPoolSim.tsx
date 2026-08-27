import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  PieChart as PieIcon,
  TrendingUp,
  RotateCcw,
  Layers,
  Award,
  AlertTriangle,
  Plane,
  Cpu,
  Smartphone,
  BarChart3,
  HelpCircle,
  Calculator,
  ChevronDown,
  BookOpen,
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
  ReferenceLine,
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { CustomChartTooltip } from "../ChartTooltip";

interface ValueChainSegment {
  nameTr: string;
  nameEn: string;
  profitShare: number; // %
  capitalShare: number; // %
  roic: number; // %
  wacc: number; // %
  descTr: string;
  descEn: string;
  moatLevelTr: string;
  moatLevelEn: string;
}

interface IndustryPool {
  id: string;
  nameTr: string;
  nameEn: string;
  icon: any;
  segments: ValueChainSegment[];
}

const INDUSTRY_POOLS: IndustryPool[] = [
  {
    id: "aviation",
    nameTr: "✈️ Havacılık Değer Zinciri",
    nameEn: "✈️ Aviation Value Chain",
    icon: Plane,
    segments: [
      {
        nameTr: "GDS Rezervasyon (Amadeus, Sabre)",
        nameEn: "GDS Software (Amadeus, Sabre)",
        profitShare: 24,
        capitalShare: 3,
        roic: 38.5,
        wacc: 8.5,
        descTr: "İki taraflı ağ etkisiyle neredeyse sıfır fiziksel sermaye yatırımıyla kâr havuzunun devasa bir dilimini kaparlar.",
        descEn: "Two-sided network effects allow near-zero capital requirements to harvest massive economic rents.",
        moatLevelTr: "Geniş Hendek (Ağ Etkisi)",
        moatLevelEn: "Wide Moat (Network Effects)",
      },
      {
        nameTr: "Uçak & Motor İmalatı (Boeing, GE)",
        nameEn: "OEMs & Engines (Boeing, GE)",
        profitShare: 31,
        capitalShare: 18,
        roic: 16.2,
        wacc: 9.0,
        descTr: "Yüksek teknolojik giriş engelleri ve 30 yıllık tekel yedek parça satışları ile istikrarlı yüksek getiri üretirler.",
        descEn: "High technological barriers and 30-year aftermarket parts monopolies secure high spread.",
        moatLevelTr: "Geniş Hendek (Patent & Giriş Engeli)",
        moatLevelEn: "Wide Moat (IP & Aftermarket)",
      },
      {
        nameTr: "Havalimanları & Duty-Free",
        nameEn: "Airports & Retail Concessions",
        profitShare: 22,
        capitalShare: 15,
        roic: 13.8,
        wacc: 7.5,
        descTr: "Bölgesel doğal tekel gücü ve esir yolcu kitlesi sayesinde istikrarlı kâr üretirler.",
        descEn: "Natural regional monopolies and captive passenger retail yield steady returns.",
        moatLevelTr: "Orta-Geniş Hendek (Coğrafi Tekel)",
        moatLevelEn: "Narrow-to-Wide (Geographic)",
      },
      {
        nameTr: "Yer Hizmetleri & İkram",
        nameEn: "Ground & Catering Services",
        profitShare: 11,
        capitalShare: 6,
        roic: 9.4,
        wacc: 8.0,
        descTr: "Havalimanı bazlı operasyonel sözleşmeler ile orta düzey sermaye getirisi üretirler.",
        descEn: "Local airport service contracts generating moderate capital return.",
        moatLevelTr: "Dar Hendek (Sözleşme Bağı)",
        moatLevelEn: "Narrow Moat (Contractual)",
      },
      {
        nameTr: "Havayolu Taşıyıcıları (Uçuş Filoları)",
        nameEn: "Airline Passenger Carriers",
        profitShare: 12,
        capitalShare: 58,
        roic: 4.8,
        wacc: 9.5,
        descTr: "Sektör sermayesinin %58'ini bağlamalarına rağmen yıkıcı fiyat rekabeti yüzünden sermaye maliyetinin altında ezilirler (ROIC < WACC)!",
        descEn: "Consuming 58% of industry capital, hyper-competition crushes ROIC below WACC (Value Destruction)!",
        moatLevelTr: "Hendeği Yok (Emtia Rekabeti)",
        moatLevelEn: "No Moat (Price War)",
      },
    ],
  },
  {
    id: "semiconductor",
    nameTr: "⚡ Yarı İletken Değer Zinciri",
    nameEn: "⚡ Semiconductor Value Chain",
    icon: Cpu,
    segments: [
      {
        nameTr: "EUV Litografi Ekipmanı (ASML)",
        nameEn: "EUV Lithography Tools (ASML)",
        profitShare: 28,
        capitalShare: 8,
        roic: 44.0,
        wacc: 8.0,
        descTr: "EUV litografide %100 küresel tekel. 20 yıllık optik Ar-Ge ile rekabeti tamamen dışarıda bırakmıştır.",
        descEn: "100% global monopoly in EUV lithography with impenetrable optical IP moat.",
        moatLevelTr: "Mutlak Tekel (EUV Patenti)",
        moatLevelEn: "Monopoly (EUV Optics)",
      },
      {
        nameTr: "Fabless Çip Tasarımı (Nvidia, Qualcomm)",
        nameEn: "Fabless AI Design (Nvidia, Qualcomm)",
        profitShare: 38,
        capitalShare: 12,
        roic: 52.0,
        wacc: 9.5,
        descTr: "Yazılım ekosistemi (CUDA) ve tescilli mimari sayesinde sıfır fabrika yatırımıyla devasa kâr marjı.",
        descEn: "CUDA software ecosystem and architecture capture massive profits without owning fabs.",
        moatLevelTr: "Geniş Hendek (Ekosistem Kilidi)",
        moatLevelEn: "Wide Moat (Software Lock-in)",
      },
      {
        nameTr: "Gelişmiş Döküm Fabrikaları (TSMC)",
        nameEn: "Advanced Foundry (TSMC)",
        profitShare: 24,
        capitalShare: 45,
        roic: 22.5,
        wacc: 8.0,
        descTr: "Milyarlarca dolarlık CapEx ve ölçek üstünlüğü ile en gelişmiş nano-çipleri üretir.",
        descEn: "Massive scale and CapEx efficiency dominate advanced process nodes.",
        moatLevelTr: "Geniş Hendek (Ölçek & Süreç)",
        moatLevelEn: "Wide Moat (Scale & Process)",
      },
      {
        nameTr: "Montaj & Test (OSAT)",
        nameEn: "Outsourced Packaging & Test (OSAT)",
        profitShare: 10,
        capitalShare: 35,
        roic: 7.2,
        wacc: 8.5,
        descTr: "Fiyat baskısı yüksek, emek yoğun paketleme ve standart test süreçleri.",
        descEn: "Labor-intensive assembly facing strong pricing pressure from foundries.",
        moatLevelTr: "Dar / Yok (Emek Yoğun)",
        moatLevelEn: "Narrow / None (Labor-Heavy)",
      },
    ],
  },
];

export const ProfitPoolSim: React.FC = () => {
  const { isEnglish, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();
  const [selectedIndustryIdx, setSelectedIndustryIdx] = useState<number>(0);
  const [selectedSegmentIdx, setSelectedSegmentIdx] = useState<number>(0);
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  const activeIndustry = INDUSTRY_POOLS[selectedIndustryIdx];
  const activeSegment = activeIndustry.segments[selectedSegmentIdx] || activeIndustry.segments[0];

  // Recharts Comparison Data (Capital Share vs Profit Share vs ROIC)
  const chartData = activeIndustry.segments.map((s) => ({
    name: isEnglish ? s.nameEn.split(" ")[0] : s.nameTr.split(" ")[0],
    fullName: isEnglish ? s.nameEn : s.nameTr,
    profitShare: s.profitShare,
    capitalShare: s.capitalShare,
    roic: s.roic,
    wacc: s.wacc,
    spread: s.roic - s.wacc,
  }));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs" id="profit-pool-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {t("ProfitPoolSim.step_4_interactive_t_1175")}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {t("ProfitPoolSim.michael_porter_mckin_1176")}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {t("ProfitPoolSim.industry_value_chain_1177")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {t("ProfitPoolSim.compare_capital_tied_1178")}
          </p>
        </div>

        {/* Industry Selector */}
        <div className="flex items-center gap-1.5 self-start md:self-center">
          {INDUSTRY_POOLS.map((ind, idx) => (
            <button
              key={ind.id}
              onClick={() => {
                setSelectedIndustryIdx(idx);
                setSelectedSegmentIdx(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedIndustryIdx === idx
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/25"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              }`}
            >
              {isEnglish ? ind.nameEn : ind.nameTr}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Terminal Architecture (grid lg:grid-cols-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Value Chain Segments & Action Guidance (5 cols) */}
        <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {t("ProfitPoolSim.select_value_chain_n_1179")}
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              {activeIndustry.segments.length} {t("ProfitPoolSim.nodes_1180")}
            </span>
          </div>

          <div className="space-y-2">
            {activeIndustry.segments.map((seg, idx) => {
              const isSelected = selectedSegmentIdx === idx;
              const isValueDestroyer = seg.roic < seg.wacc;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSegmentIdx(idx)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 shadow-2xs ring-1 ring-indigo-400"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {isEnglish ? seg.nameEn : seg.nameTr}
                    </span>
                    <span
                      className={`font-mono font-extrabold text-xs px-2 py-0.5 rounded ${
                        isValueDestroyer
                          ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                          : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                      }`}
                    >
                      ROIC %{seg.roic}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <div>
                      {t("ProfitPoolSim.profit_share_1181")}%{seg.profitShare}
                    </div>
                    <div>
                      {t("ProfitPoolSim.capital_tied_1182")}%{seg.capitalShare}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action-Oriented Pedagogical Directive */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong className="block font-bold text-amber-800 dark:text-amber-300 mb-1">
              💡 {t("ProfitPoolSim.action_oriented_insi_1183")}
            </strong>
            {t("ProfitPoolSim.click_on_airline_pas_1184")}
          </div>
        </div>

        {/* Right Column: Recharts Visual & Glassmorphic Diagnostic (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Recharts Area */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-2">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t("ProfitPoolSim.capital_tied_vs_prof_1185")}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {t("ProfitPoolSim.higher_profit_with_l_1186")}
              </span>
            </div>

            <div className="h-60 sm:h-64 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} interval={0} angle={-15} textAnchor="end" />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} unit="%" />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        valueFormatter={(val, name) => [
                          `%${val}`,
                          name === "profitShare"
                            ? t("ProfitPoolSim.profit_pool_share_1187")
                            : t("ProfitPoolSim.capital_invested_sha_1188"),
                        ]}
                      />
                    }
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                    formatter={(value) =>
                      value === "profitShare"
                        ? t("ProfitPoolSim.k_r_pay_profit_share_1189")
                        : t("ProfitPoolSim.sermaye_pay_capital_1190")
                    }
                  />
                  <Bar dataKey="profitShare" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="capitalShare" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic Diagnosis Node Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {t("ProfitPoolSim.active_value_chain_a_1191")}
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  {isEnglish ? activeSegment.nameEn : activeSegment.nameTr}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {isEnglish ? activeSegment.moatLevelEn : activeSegment.moatLevelTr}
              </span>
            </div>

            {/* Metric Pills */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center font-mono">
              <div>
                <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 block font-sans">
                  ROIC
                </span>
                <span className={`text-base font-black ${activeSegment.roic >= activeSegment.wacc ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  %{activeSegment.roic}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 block font-sans">
                  WACC
                </span>
                <span className="text-base font-black text-slate-700 dark:text-slate-300">
                  %{activeSegment.wacc}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 block font-sans">
                  Spread
                </span>
                <span className={`text-base font-black ${activeSegment.roic - activeSegment.wacc >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  %{activeSegment.roic - activeSegment.wacc > 0 ? `+${(activeSegment.roic - activeSegment.wacc).toFixed(1)}` : (activeSegment.roic - activeSegment.wacc).toFixed(1)}
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {isEnglish ? activeSegment.descEn : activeSegment.descTr}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 italic pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
              {t("ProfitPoolSim.illustrative_teachin_1192")}
            </p>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-profitpool-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {t("ProfitPoolSim.see_the_calculation_1193")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (t("ProfitPoolSim.hide_1194")) : (t("ProfitPoolSim.show_1195"))}</span>
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
              id="profitpool-sim-calculation-breakdown"
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
                  <span>{t("ProfitPoolSim.profit_pool_asymmetr_1196")}</span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-indigo-950 dark:text-indigo-100 font-bold bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/80">
                  <span>{t("ProfitPoolSim.economic_spread_roic_1197")}</span>
                  <br />
                  <span>{t("ProfitPoolSim.profit_pool_capture_1198")}</span>
                  <br />
                  <span>{t("ProfitPoolSim.value_creation_sprea_1199")}</span>
                </div>
              </div>

              {/* Step-by-Step Diagnostic Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t("ProfitPoolSim.active_value_chain_s_1200")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block font-bold mb-1">
                      {t("ProfitPoolSim.1_capital_vs_profit_1201")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {isEnglish
                        ? `Captures %${activeSegment.profitShare} of industry profit with only %${activeSegment.capitalShare} of total invested capital.`
                        : `Sektör sermayesinin %${activeSegment.capitalShare}'ini bağlayarak sektör kârının %${activeSegment.profitShare}'ini almaktadır.`}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block font-bold mb-1">
                      {t("ProfitPoolSim.2_spread_hurdle_rate_1202")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {isEnglish
                        ? `ROIC: %${activeSegment.roic} vs WACC: %${activeSegment.wacc} -> Net Spread: %${(activeSegment.roic - activeSegment.wacc).toFixed(1)}`
                        : `ROIC: %${activeSegment.roic} vs WACC: %${activeSegment.wacc} -> Net Yayılım: %${(activeSegment.roic - activeSegment.wacc).toFixed(1)}`}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block font-bold mb-1">
                      {t("ProfitPoolSim.3_strategic_moat_ver_1203")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {activeSegment.roic >= activeSegment.wacc
                        ? t("ProfitPoolSim.value_compounder_gen_1204")
                        : t("ProfitPoolSim.value_destroyer_capi_1205")}
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
