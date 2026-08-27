import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles, X, ChevronRight, PlayCircle, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface FloatingGuideWidgetProps {
  onOpenGuide: () => void;
  isAllCompleted?: boolean;
}

export const FloatingGuideWidget: React.FC<FloatingGuideWidgetProps> = ({
  onOpenGuide,
  isAllCompleted = false,
}) => {
  const { isEnglish } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);

  // If all learning modules are completed, hide the onboarding widget completely
  if (isAllCompleted) {
    return null;
  }

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("moat_floating_guide_dismissed");
      if (dismissed) {
        setIsMinimized(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
    try {
      localStorage.setItem("moat_floating_guide_dismissed", "true");
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm pointer-events-none select-none transition-opacity duration-300">
      <AnimatePresence mode="wait">
        {!isMinimized ? (
          <motion.div
            key="guide-expanded"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl border border-indigo-100 dark:border-slate-800/80 rounded-3xl p-5 shadow-2xl shadow-indigo-900/20 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 blur-sm opacity-50"
                  />
                  <div className="relative w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-indigo-100 dark:border-slate-700 flex items-center justify-center text-indigo-400 shadow-inner">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
                  </span>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                      {isEnglish ? "Elite Academy" : "Elit Akademi"}
                    </span>
                    <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {isEnglish ? "New User" : "Yeni Katılımcı"}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {isEnglish ? "Master the Platform" : "Platformda Ustalaşın"}
                  </h4>
                </div>
              </div>
              
              <button
                onClick={handleClose}
                aria-label="Close Guide"
                className="p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="mt-4 relative z-10">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {isEnglish
                  ? "Unlock the tools used by top fund managers. Take the 7-step guided tour to master financial forensics, reverse DCF, and moat analysis."
                  : "En iyi fon yöneticilerinin kullandığı araçların kilidini açın. Finansal adli tıp, tersine DCF ve hendek analizini kavramak için 7 adımlı turu başlatın."}
              </p>
              
              {/* CTA */}
              <div className="mt-5 flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenGuide}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                >
                  <PlayCircle className="w-4 h-4 text-indigo-600" />
                  <span>{isEnglish ? "Start Mastery Tour" : "Ustalık Turunu Başlat"}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="guide-minimized"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto"
          >
            <button
              onClick={() => setIsMinimized(false)}
              aria-label="Open Guide"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-800 text-slate-900 dark:text-white text-xs font-bold shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:border-indigo-500/50 transition-all cursor-pointer group"
            >
              <div className="relative w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                <Compass className="w-4 h-4 text-slate-900 dark:text-white" />
              </div>
              <span>{isEnglish ? "Platform Tour" : "Platform Turu"}</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse ml-1"></div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
