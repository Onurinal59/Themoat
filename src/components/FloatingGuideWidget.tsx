import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles, X, PlayCircle, HelpCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface FloatingGuideWidgetProps {
  onOpenGuide: () => void;
  isAllCompleted?: boolean;
}

export const FloatingGuideWidget: React.FC<FloatingGuideWidgetProps> = ({
  onOpenGuide,
  isAllCompleted = false,
}) => {
  const { isEnglish, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();
  // Default to popover closed so it never covers lesson text or simulators
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // If all learning modules are completed, hide the onboarding widget completely
  if (isAllCompleted) {
    return null;
  }

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("moat_floating_guide_dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsDismissed(true);
    try {
      localStorage.setItem("moat_floating_guide_dismissed", "true");
    } catch {
      // ignore
    }
  };

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      id="mastery-floating-tour-widget"
      className="hidden md:block fixed bottom-6 left-6 z-20 pointer-events-none select-none"
    >
      <div className="relative pointer-events-auto">
        {/* Expanded Small Popover Drawer (Max 320px, clean, non-obtrusive) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mastery-tour-popover"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-12 left-0 w-[calc(100vw-24px)] sm:w-80 max-w-[320px] bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-indigo-100 dark:border-slate-800 rounded-2xl p-4 shadow-xl shadow-indigo-950/10 dark:shadow-black/50 z-30 space-y-3"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                        {t("FloatingGuideWidget.academy_tour_180")}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {t("FloatingGuideWidget.master_the_platform_181")}
                    </h4>
                  </div>
                </div>

                <button
                  id="btn-close-tour-popover"
                  onClick={handleDismiss}
                  aria-label={t("FloatingGuideWidget.close_and_remember_182")}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title={t("FloatingGuideWidget.close_tour_widget_183")}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t("FloatingGuideWidget.take_the_7_step_inte_184")}
              </p>

              {/* Action Buttons */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  id="btn-start-mastery-tour"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenGuide();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>{t("FloatingGuideWidget.start_tour_185")}</span>
                </button>
                <button
                  id="btn-dismiss-tour-permanently"
                  onClick={handleDismiss}
                  className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {t("FloatingGuideWidget.dismiss_186")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small, Non-Obtrusive Launcher Badge/Button */}
        <motion.button
          id="btn-mastery-tour-launcher"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleToggleOpen}
          aria-label={t("FloatingGuideWidget.open_mastery_tour_187")}
          className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md border text-xs font-bold shadow-md transition-all cursor-pointer min-h-[38px] ${
            isOpen
              ? "bg-indigo-600 text-white border-indigo-500 shadow-indigo-600/25"
              : "bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 border-slate-200/90 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-slate-900/10"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
              isOpen ? "bg-white/20 text-white" : "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
            }`}
          >
            <Compass className="w-3 h-3" />
          </div>
          <span className="font-semibold">{t("FloatingGuideWidget.mastery_tour_188")}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </motion.button>
      </div>
    </div>
  );
};
