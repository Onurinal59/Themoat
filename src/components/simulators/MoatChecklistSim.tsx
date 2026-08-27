import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getChecklistItems } from "../../data/checklistData";
import {
  CheckSquare,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Trophy,
  HelpCircle,
  BarChart3,
  Layers,
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
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { CustomChartTooltip } from "../ChartTooltip";

interface CompanyProfile {
  nameTr: string;
  nameEn: string;
  answers: Record<string, boolean>;
}

const PRESET_COMPANIES: CompanyProfile[] = [
  {
    nameTr: "Apple Inc. (Geniş Hendek)",
    nameEn: "Apple Inc. (Wide Moat)",
    answers: {
      "chk-1": true, "chk-2": true, "chk-3": true, "chk-4": true, "chk-5": true, "chk-6": true,
      "chk-7": true, "chk-8": true, "chk-9": true, "chk-10": true, "chk-11": true, "chk-12": true,
      "chk-13": true, "chk-14": true, "chk-15": true, "chk-16": true, "chk-17": true, "chk-18": true,
      "chk-19": true, "chk-20": true, "chk-21": true, "chk-22": true,
    },
  },
  {
    nameTr: "Costco Wholesale (Geniş Hendek)",
    nameEn: "Costco Wholesale (Wide Moat)",
    answers: {
      "chk-1": true, "chk-2": true, "chk-3": true, "chk-4": true, "chk-5": true, "chk-6": true,
      "chk-7": true, "chk-8": true, "chk-9": true, "chk-10": true, "chk-11": false, "chk-12": true,
      "chk-13": true, "chk-14": false, "chk-15": true, "chk-16": true, "chk-17": true, "chk-18": true,
      "chk-19": true, "chk-20": true, "chk-21": true, "chk-22": true,
    },
  },
  {
    nameTr: "Ortalama Havayolu (Hendek Yok)",
    nameEn: "Average Airline (No Moat)",
    answers: {
      "chk-1": false, "chk-2": false, "chk-3": false, "chk-4": false, "chk-5": true, "chk-6": true,
      "chk-7": false, "chk-8": false, "chk-9": false, "chk-10": true, "chk-11": false, "chk-12": false,
      "chk-13": false, "chk-14": true, "chk-15": false, "chk-16": false, "chk-17": false, "chk-18": false,
      "chk-19": false, "chk-20": false, "chk-21": false, "chk-22": false,
    },
  },
];

export const MoatChecklistSim: React.FC = () => {
  const { isEnglish, t } = useLanguage();
  const checklistItems = getChecklistItems(isEnglish);

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  const categories = [
    { id: "all", label: t("MoatChecklistSim.all_items_1101") },
    ...Array.from(new Set(checklistItems.map((item) => item.category))).map((cat) => ({
      id: cat,
      label: cat,
    })),
  ];

  const totalItems = checklistItems.length;
  const checkedCount = Object.values(checkedState).filter(Boolean).length;
  const scorePercent = Math.round((checkedCount / totalItems) * 100);

  let moatVerdict = t("MoatChecklistSim.weak_undetermined_mo_1102");
  let verdictBadge = "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800";

  if (scorePercent >= 70) {
    moatVerdict = t("MoatChecklistSim.strong_moat_profile_1103");
    verdictBadge = "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800";
  } else if (scorePercent >= 45) {
    moatVerdict = t("MoatChecklistSim.moderate_moat_profil_1104");
    verdictBadge = "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800";
  }

  const handleToggle = (id: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleApplyPreset = (profile: CompanyProfile) => {
    setCheckedState(profile.answers);
  };

  const handleReset = () => {
    setCheckedState({});
  };

  const filteredItems =
    selectedCategory === "all"
      ? checklistItems
      : checklistItems.filter((item) => item.category === selectedCategory);

  // Group items by category for Recharts bar visualization
  const categoryChartData = categories.slice(1).map((cat) => {
    const itemsInCat = checklistItems.filter((i) => i.category === cat.id);
    const passedInCat = itemsInCat.filter((i) => checkedState[i.id]).length;
    const catScore = itemsInCat.length > 0 ? Math.round((passedInCat / itemsInCat.length) * 100) : 0;
    return {
      name: cat.label.length > 18 ? cat.label.substring(0, 16) + "..." : cat.label,
      score: catScore,
      passed: passedInCat,
      total: itemsInCat.length,
      fill: catScore >= 75 ? "#10B981" : catScore >= 40 ? "#F59E0B" : "#F43F5E",
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs" id="moat-checklist-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {t("MoatChecklistSim.module_1_8_comprehen_1105")}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {t("MoatChecklistSim.sustainable_value_cr_1106")}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {t("MoatChecklistSim.sustainable_value_cr_1107")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {t("MoatChecklistSim.22_education_focused_1108")}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {t("MoatChecklistSim.clear_all_1109")}
        </button>
      </div>

      {/* Preset Corporate Cases */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {t("MoatChecklistSim.preset_corporate_ben_1110")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESET_COMPANIES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left text-xs transition-all cursor-pointer hover:border-indigo-300"
            >
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                {isEnglish ? p.nameEn : p.nameTr}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Terminal Architecture (grid lg:grid-cols-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Category Filter & Checklist Items (5 cols) */}
        <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>{t("MoatChecklistSim.sustainable_value_cr_1111")}</span>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 inline-flex items-center self-start sm:self-auto shrink-0">
                {isEnglish
                  ? `${checkedCount} / ${totalItems} guided learning criteria completed`
                  : `${totalItems} yönlendirilmiş öğrenme kriterinden ${checkedCount}’si tamamlandı`}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {t("MoatChecklistSim.22_education_focused_1112")}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-2xs font-bold"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Checklist Items Scrollable Container */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {filteredItems.map((item) => {
              const isChecked = !!checkedState[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => handleToggle(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleToggle(item.id);
                    }
                  }}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isChecked
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 shadow-2xs"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 h-4 w-4 rounded accent-emerald-600 cursor-pointer"
                  />
                  <div className="space-y-0.5 text-xs">
                    <span className={`font-bold block ${isChecked ? "text-emerald-900 dark:text-emerald-200" : "text-slate-800 dark:text-slate-200"}`}>
                      {item.question}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-tight">
                      {item.explanation}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recharts Category Breakdown & Diagnostic Card (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Recharts Area */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-2">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t("MoatChecklistSim.moat_score_by_strate_1113")}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                {t("MoatChecklistSim.overall_score_1114")}{scorePercent}
              </span>
            </div>

            <div className="h-56 sm:h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#94A3B8" }} unit="%" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} width={120} />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        valueFormatter={(val) => [
                          `%${val}`,
                          t("MoatChecklistSim.moat_factor_score_1115"),
                        ]}
                      />
                    }
                  />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic Diagnosis Verdict Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {t("MoatChecklistSim.economic_moat_assess_1116")}
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  {moatVerdict}
                </h4>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${verdictBadge}`}>
                %{scorePercent} {t("MoatChecklistSim.score_1117")}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {scorePercent >= 70
                ? t("MoatChecklistSim.fortress_moat_the_bu_1118")
                : scorePercent >= 45
                ? t("MoatChecklistSim.vulnerable_narrow_mo_1119")
                : t("MoatChecklistSim.no_moat_capital_dest_1120")}
            </p>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-moat-checklist-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {t("MoatChecklistSim.see_the_calculation_1121")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (t("MoatChecklistSim.hide_1122")) : (t("MoatChecklistSim.show_1123"))}</span>
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
              id="moat-checklist-calculation-breakdown"
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
                  <span>{t("MoatChecklistSim.weighted_checklist_s_1124")}</span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-indigo-950 dark:text-indigo-100 font-bold bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/80">
                  <span>{t("MoatChecklistSim.total_moat_score_val_1125")}</span>
                  <br />
                  <span>{t("MoatChecklistSim.fortress_moat_score_1126")}</span>
                </div>
              </div>

              {/* Step-by-Step Diagnostic Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t("MoatChecklistSim.active_scoring_diagn_1127")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-indigo-600 dark:text-indigo-400 block font-bold mb-1">
                      {t("MoatChecklistSim.validated_items_coun_1128")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {Object.values(checkedState).filter(Boolean).length} / {checklistItems.length} {t("MoatChecklistSim.criteria_satisfied_1129")} ({scorePercent}%)
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-emerald-600 dark:text-emerald-400 block font-bold mb-1">
                      {t("MoatChecklistSim.competitive_advantag_1130")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {scorePercent >= 70
                        ? (t("MoatChecklistSim.estimated_cap_15_25_1131"))
                        : scorePercent >= 45
                        ? (t("MoatChecklistSim.estimated_cap_5_10_y_1132"))
                        : (t("MoatChecklistSim.estimated_cap_0_3_ye_1133"))}
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
