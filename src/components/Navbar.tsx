import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Repeat,
  FlaskConical,
  BookOpen,
  Sparkles,
  Flame,
  Moon,
  Sun,
  Building2,
  Swords,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  Calculator,
  Layers,
  ArrowUpRight,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { UserLearningState } from "../types";
import { useLanguage } from "../context/LanguageContext";

// High-definition SVG flag icons for language selection
const TurkishFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg
    viewBox="0 0 1200 800"
    className={`${className} rounded-xs shadow-2xs shrink-0 overflow-hidden select-none`}
    aria-hidden="true"
  >
    <rect width="1200" height="800" fill="#E30A17" />
    <circle cx="425" cy="400" r="200" fill="#ffffff" />
    <circle cx="475" cy="400" r="160" fill="#E30A17" />
    <polygon
      fill="#ffffff"
      points="583.33,400 706.07,439.88 630.21,335.53 630.21,464.47 706.07,360.12"
    />
  </svg>
);

const BritishFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg
    viewBox="0 0 60 30"
    className={`${className} rounded-xs shadow-2xs shrink-0 overflow-hidden select-none`}
    aria-hidden="true"
  >
    <clipPath id="uk-flag-clip-nav">
      <rect width="60" height="30" rx="1" />
    </clipPath>
    <g clipPath="url(#uk-flag-clip-nav)">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

export type NavTab =
  | "roadmap"
  | "formulas"
  | "simulators"
  | "company-audit"
  | "moat-duel"
  | "spaced-repetition";

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  userState: UserLearningState;
  onOpenAICoach: () => void;
  onOpenGlossary: () => void;
  onOpenGuide?: () => void;
  onOpenFormulas?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: (e?: React.MouseEvent) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userState,
  onOpenAICoach,
  onOpenGlossary,
  onOpenGuide,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const { language, setLanguage, isEnglish, t } = useLanguage();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const resourcesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (resourcesRef.current && !resourcesRef.current.contains(target)) {
        setIsResourcesOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(target)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Primary Navigation Items (Visible on Desktop / Laptop)
  const PRIMARY_NAV_ITEMS: {
    id: NavTab;
    label: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "roadmap",
      label: t("nav.academy", "Akademi"),
      icon: Compass,
    },
    {
      id: "formulas",
      label: t("nav.formulas", "Formüller"),
      icon: Calculator,
    },
    {
      id: "simulators",
      label: t("nav.lab", "Laboratuvar"),
      icon: FlaskConical,
    },
  ];

  // Secondary Tools Sub-menu
  const TOOLS_ITEMS: {
    id: NavTab;
    label: string;
    desc: string;
    badge?: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "company-audit",
      label: isEnglish ? "Company Balance Sheet Audit" : "Şirket Röntgeni & Bilanço",
      desc: isEnglish ? "5-step Mauboussin financial diagnostic" : "5 adımlı Mauboussin bilanço & hendek teşhis masası",
      badge: isEnglish ? "5-Step" : "5 Adım",
      icon: Building2,
    },
    {
      id: "moat-duel",
      label: isEnglish ? "Moat Duel Arena" : "Hendek Düellosu",
      desc: isEnglish ? "1v1 competitive moat matrix showdown" : "İki şirketi karşılaştırmalı hendek arenasında kapıştır",
      badge: "1v1",
      icon: Swords,
    },
    {
      id: "spaced-repetition",
      label: isEnglish ? "Spaced Repetition Flashcards" : "Aralıklı Tekrar & Hafıza",
      desc: isEnglish ? "Leitner algorithm memory retention system" : "Leitner algoritmalı kalıcı bilgi pekiştirme kartları",
      badge: "SM-2",
      icon: Repeat,
    },
  ];

  const isToolsActive = ["company-audit", "moat-duel", "spaced-repetition"].includes(activeTab);
  const activeToolItem = TOOLS_ITEMS.find((item) => item.id === activeTab);

  const handleTabClick = (tabId: NavTab) => {
    setActiveTab(tabId);
    setIsMobileDrawerOpen(false);
    setIsResourcesOpen(false);
    setIsToolsOpen(false);
  };

  return (
    <>
      {/* Apple-style Translucent Sticky Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/70 transition-colors duration-500 ease-in-out shadow-sm dark:shadow-none">
        <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between min-h-14 sm:h-16 gap-1 sm:gap-2 lg:gap-3 w-full flex-wrap sm:flex-nowrap py-1 sm:py-0">
            
            {/* Left: Brand Identity (flex-1 justify-start) */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex justify-start items-center gap-1.5 sm:gap-2 cursor-pointer select-none shrink-0"
              onClick={() => handleTabClick("roadmap")}
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 ring-1 ring-white/20 shrink-0">
                <Compass className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-extrabold text-xs sm:text-sm md:text-base tracking-tight text-slate-900 dark:text-slate-100 font-display whitespace-nowrap">
                    {isEnglish ? "Economic Moat" : "Ekonomik Hendek"}
                  </span>
                  <span className="hidden xl:inline-flex px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/70">
                    Mauboussin
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:block -mt-0.5 font-medium truncate max-w-[140px] xl:max-w-none">
                  Measuring the Moat & ROIC
                </span>
              </div>
            </motion.div>

            {/* Center: Apple-inspired Compact Segmented Navigation Bar (flex-none justify-center) */}
            <nav className="hidden lg:flex flex-none items-center justify-center bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs backdrop-blur-md shrink-0 transition-colors duration-500 ease-in-out">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`relative flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap z-10 ${
                      isActive
                        ? "text-indigo-950 dark:text-white font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-slate-200/90 dark:border-slate-700/80 -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Tools & Advanced Dropdown (Grouped to prevent horizontal overflow on all resolutions) */}
              <div className="relative" ref={toolsRef}>
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className={`relative flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap z-10 ${
                    isToolsActive
                      ? "text-indigo-950 dark:text-white font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {isToolsActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-slate-200/90 dark:border-slate-700/80 -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <Layers
                    className={`w-3.5 h-3.5 ${
                      isToolsActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  />
                  <span>
                    {isToolsActive && activeToolItem
                      ? activeToolItem.label.split("&")[0].trim()
                      : isEnglish ? "Tools & Duel" : "Uygulama & Düello"}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isToolsOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Tools Dropdown Panel */}
                <AnimatePresence>
                  {isToolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-76 p-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 space-y-1"
                    >
                      <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {isEnglish ? "Interactive Analysis & Practice" : "İleri Düzey Analiz & Pratik"}
                      </div>
                      {TOOLS_ITEMS.map((tool) => {
                        const ToolIcon = tool.icon;
                        const isSelected = activeTab === tool.id;
                        return (
                          <button
                            key={tool.id}
                            onClick={() => handleTabClick(tool.id)}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                              isSelected
                                ? "bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/80"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
                                isSelected
                                  ? "bg-indigo-600 text-white"
                                  : "bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400"
                              }`}
                            >
                              <ToolIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className={`text-xs font-bold block truncate ${isSelected ? "text-indigo-900 dark:text-indigo-200" : "text-slate-900 dark:text-slate-100"}`}>
                                  {tool.label}
                                </span>
                                {tool.badge && (
                                  <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                    {tool.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 line-clamp-2">
                                {tool.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Action Hub: Unified & Non-Overflowing (flex-1 justify-end) */}
            <div className="flex-1 flex justify-end items-center gap-1 sm:gap-1.5 shrink-0">
              
              {/* Daily Learning Streak Capsule */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 text-[11px] sm:text-xs font-black shadow-2xs select-none"
                title={isEnglish ? `${userState.currentStreak} day learning streak` : `${userState.currentStreak} günlük aktif öğrenme serisi`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0 animate-pulse" />
                <span>{userState.currentStreak}</span>
                <span className="hidden xl:inline font-medium text-[10px] opacity-80">{isEnglish ? "d" : "gün"}</span>
              </motion.div>

              {/* Flag-Only Language Switcher (No TR/EN text, only crisp country flags) */}
              <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs gap-0.5 select-none">
                <button
                  type="button"
                  onClick={() => setLanguage("tr")}
                  className={`p-1 sm:p-1.5 rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center ${
                    !isEnglish
                      ? "bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10"
                      : "opacity-45 hover:opacity-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                  }`}
                  title="Türkçe"
                  aria-label="Türkçe"
                >
                  <TurkishFlag className="w-4 h-2.5 sm:w-5 sm:h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`p-1 sm:p-1.5 rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center ${
                    isEnglish
                      ? "bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10"
                      : "opacity-45 hover:opacity-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                  }`}
                  title="English"
                  aria-label="English"
                >
                  <BritishFlag className="w-4 h-2.5 sm:w-5 sm:h-3.5" />
                </button>
              </div>

              {/* Grouped Resources & Reference Dropdown */}
              <div className="relative hidden md:block" ref={resourcesRef}>
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                    isResourcesOpen
                      ? "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800 shadow-2xs"
                      : "bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span className="hidden xl:inline">{isEnglish ? "Resources" : "Kaynaklar"}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isResourcesOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Dropdown Menu Panel */}
                <AnimatePresence>
                  {isResourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-72 p-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 space-y-1"
                    >
                      {/* Terimler Sözlüğü Item */}
                      <button
                        onClick={() => {
                          setIsResourcesOpen(false);
                          onOpenGlossary();
                        }}
                        className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                            {isEnglish ? "Finance & Strategy Glossary" : "Finans & Strateji Sözlüğü"}
                          </span>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                            {isEnglish ? "Essential moat and valuation definitions" : "Kritik hendek ve değerleme kavramlarının açıklamaları"}
                          </p>
                        </div>
                      </button>

                      {/* Yolculuk Rehberi Item */}
                      {onOpenGuide && (
                        <button
                          onClick={() => {
                            setIsResourcesOpen(false);
                            onOpenGuide();
                          }}
                          className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                              {isEnglish ? "Learning Guide" : "Öğrenme Rehberi"}
                            </span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                              {isEnglish ? "Platform's 7-stop mastery methodology" : "Platformun 7 duraklı ustalık metodolojisi"}
                            </p>
                          </div>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark / Light Theme Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold transition-colors cursor-pointer shrink-0"
                aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                title={isDarkMode ? (isEnglish ? "Switch to Light Mode" : "Aydınlık Moda Geç") : (isEnglish ? "Switch to Dark Mode" : "Karanlık Moda Geç")}
              >
                {isDarkMode ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                )}
              </button>

              {/* Socratic AI Coach Button */}
              <button
                onClick={onOpenAICoach}
                className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-sm shadow-indigo-500/25 transition-all cursor-pointer ring-1 ring-white/20 whitespace-nowrap shrink-0"
                title={isEnglish ? "Ask Socratic AI Coach" : "Sokratik AI Koçuna Soru Sor"}
                aria-label={isEnglish ? "Ask Socratic AI Coach" : "Sokratik AI Koçuna Soru Sor"}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-200 shrink-0" />
                <span className="hidden sm:inline">{isEnglish ? "AI Coach" : "AI Koçu"}</span>
              </button>

              {/* Mobile Menu Drawer Toggle (Visible on < lg) */}
              <button
                onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
                aria-label="Toggle Mobile Menu"
                className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold transition-colors cursor-pointer shrink-0"
                
              >
                {isMobileDrawerOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Drawer Navigation */}
        <AnimatePresence>
          {isMobileDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="lg:hidden border-t border-slate-200/80 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl px-4 py-4 space-y-4 shadow-2xl overflow-y-auto max-h-[85vh]"
            >
              {/* Mobile Language Switcher (Only Flag Icons) */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  {isEnglish ? "Language" : "Dil Seçimi"}
                </span>
                <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setLanguage("tr")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                      !isEnglish
                        ? "bg-slate-100 dark:bg-slate-900 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10"
                        : "opacity-45 hover:opacity-100"
                    }`}
                    title="Türkçe"
                    aria-label="Türkçe"
                  >
                    <TurkishFlag className="w-6 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                      isEnglish
                        ? "bg-slate-100 dark:bg-slate-900 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10"
                        : "opacity-45 hover:opacity-100"
                    }`}
                    title="English"
                    aria-label="English"
                  >
                    <BritishFlag className="w-6 h-4" />
                  </button>
                </div>
              </div>

              {/* Group 1: Core Learning Modules */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                  {isEnglish ? "Core Curriculum" : "Ana Eğitim & Teori"}
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {PRIMARY_NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-indigo-600 text-white shadow-xs"
                            : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                          <span>{item.label}</span>
                        </div>
                        <ArrowUpRight className={`w-3.5 h-3.5 ${isActive ? "text-white/80" : "text-slate-400"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group 2: Advanced Interactive Tools */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                  {isEnglish ? "Interactive Analysis & Duel" : "Uygulama, Teşhis & Düello"}
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {TOOLS_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-indigo-600 text-white shadow-xs"
                            : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                          <span>{item.label}</span>
                        </div>
                        <span className="text-[10px] opacity-75">{item.badge}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group 3: Reference & Resources */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                  {isEnglish ? "Reference & Tools" : "Yardımcı & Başvuru Araçları"}
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    onClick={() => {
                      setIsMobileDrawerOpen(false);
                      onOpenGlossary();
                    }}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/60 dark:border-slate-800 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{isEnglish ? "Finance & Strategy Glossary" : "Finans & Strateji Terimleri Sözlüğü"}</span>
                  </button>

                  {onOpenGuide && (
                    <button
                      onClick={() => {
                        setIsMobileDrawerOpen(false);
                        onOpenGuide();
                      }}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/60 dark:border-slate-800 cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 text-amber-500" />
                      <span>{isEnglish ? "Learning Journey Guide" : "Öğrenme Yolculuğu Rehberi"}</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
