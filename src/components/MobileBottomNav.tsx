import React from "react";
import { motion } from "motion/react";
import { Compass, FlaskConical, Building2, Calculator, Swords, ArrowLeft, MessageSquare, CheckCircle2, ChevronRight } from "lucide-react";
import { NavTab } from "./Navbar";
import { useLanguage } from "../context/LanguageContext";
import { LearningModule } from "../types";

interface MobileBottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeModule: LearningModule | null;
  onBackToRoadmap: () => void;
  onOpenAICoach: () => void;
  onNextModule?: () => void;
  hasNextModule?: boolean;
  isNextModuleUnlocked?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  activeModule,
  onBackToRoadmap,
  onOpenAICoach,
  onNextModule,
  hasNextModule,
  isNextModuleUnlocked = false,
}) => {
  const { isEnglish, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();

  const NAV_ITEMS: { id: NavTab; label: string; icon: React.ElementType }[] = [
    {
      id: "roadmap",
      label: t("MobileBottomNav.academy_486"),
      icon: Compass,
    },
    {
      id: "simulators",
      label: t("MobileBottomNav.lab_487"),
      icon: FlaskConical,
    },
    {
      id: "company-audit",
      label: t("MobileBottomNav.10_k_audit_488"),
      icon: Building2,
    },
    {
      id: "formulas",
      label: t("MobileBottomNav.formulas_489"),
      icon: Calculator,
    },
    {
      id: "moat-duel",
      label: t("MobileBottomNav.duel_490"),
      icon: Swords,
    },
  ];

  // If user is currently reading a module, show an ergonomic reading bar
  if (activeModule) {
    return (
      <nav
        aria-label={t("audit.mobileModuleNav")}
        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 pt-2 pb-safe"
      >
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto pb-1">
          {/* Back button */}
          <button
            onClick={onBackToRoadmap}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 text-xs font-bold active:scale-95 transition-all min-h-[44px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
            <span>{t("MobileBottomNav.roadmap_491")}</span>
          </button>

          {/* AI Coach Quick Trigger */}
          <button
            onClick={onOpenAICoach}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 text-xs font-bold active:scale-95 transition-all min-h-[44px] cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>{t("MobileBottomNav.ask_coach_492")}</span>
          </button>

          {/* Next Step / Preview Step */}
          {hasNextModule && onNextModule ? (
            <button
              onClick={onNextModule}
              className={`flex-1 flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all min-h-[44px] cursor-pointer ${
                isNextModuleUnlocked
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <span>
                {isNextModuleUnlocked
                  ? t("MobileBottomNav.next_step_493")
                  : t("audit.previewStep", undefined, { step: activeModule ? activeModule.id + 1 : "" })}
              </span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          ) : (
            <button
              onClick={() => {
                const el = document.getElementById("module-quiz");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-600/30 active:scale-95 transition-all min-h-[44px] cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{t("MobileBottomNav.go_to_quiz_494")}</span>
            </button>
          )}
        </div>
      </nav>
    );
  }

  // Standard Main App Bottom Navigation Bar
  return (
    <nav
      aria-label={t("audit.mobilePrimaryNav")}
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-1 pt-1.5 pb-safe"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer min-w-[58px] min-h-[48px] ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active-pill"
                  className="absolute inset-0 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110" : ""}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
