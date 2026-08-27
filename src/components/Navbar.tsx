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
  SlidersHorizontal,
  Globe,
  ArrowRight,
  MessageSquare,
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
  const [isUtilitiesOpen, setIsUtilitiesOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const utilitiesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (utilitiesRef.current && !utilitiesRef.current.contains(target)) {
        setIsUtilitiesOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(target)) {
        setIsToolsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsUtilitiesOpen(false);
        setIsToolsOpen(false);
        setIsMobileDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Primary 4 Essential Navigation Tasks (Always visible on desktop)
  const PRIMARY_NAV_ITEMS: {
    id: NavTab;
    label: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "roadmap",
      label: t("nav.academy", isEnglish ? "Academy" : "Akademi"),
      icon: Compass,
    },
    {
      id: "formulas",
      label: t("nav.formulas", isEnglish ? "Formulas" : "Formüller"),
      icon: Calculator,
    },
    {
      id: "simulators",
      label: t("nav.lab", isEnglish ? "Laboratory" : "Laboratuvar"),
      icon: FlaskConical,
    },
  ];

  // Secondary Tools Sub-menu under "Tools & Duel"
  const TOOLS_ITEMS: {
    id: NavTab;
    label: string;
    desc: string;
    badge?: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "company-audit",
      label: isEnglish ? "Company Diagnostic Audit" : "Şirket Röntgeni & Bilanço",
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
    setIsUtilitiesOpen(false);
    setIsToolsOpen(false);
  };

  return (
    <>
      {/* Calm & Focused Sticky Navigation Header */}
      <header
        id="main-app-header"
        className="sticky top-0 z-40 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300 shadow-xs"
      >
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3 w-full">
            
            {/* Left: Brand Identity */}
            <div
              id="nav-brand-logo"
              className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
              onClick={() => handleTabClick("roadmap")}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 ring-1 ring-white/20 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-slate-100 font-display">
                    {isEnglish ? "Economic Moat" : "Ekonomik Hendek"}
                  </span>
                  <span className="hidden sm:inline-flex px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider rounded bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/70">
                    Mauboussin
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden md:block -mt-0.5 font-medium">
                  Measuring the Moat & ROIC
                </span>
              </div>
            </div>

            {/* Center: Clean 4-Task Main Nav (Desktop) */}
            <nav
              id="desktop-primary-nav"
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs backdrop-blur-md"
            >
              {PRIMARY_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleTabClick(item.id)}
                    className={`relative min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none whitespace-nowrap z-10 ${
                      isActive
                        ? "text-indigo-950 dark:text-white"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-slate-200/90 dark:border-slate-700/80 -z-10"
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    )}
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* 4th Essential Task: Tools & Duel Dropdown */}
              <div className="relative" ref={toolsRef}>
                <button
                  id="nav-dropdown-tools-toggle"
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  aria-expanded={isToolsOpen}
                  className={`relative min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none whitespace-nowrap z-10 ${
                    isToolsActive
                      ? "text-indigo-950 dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {isToolsActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-slate-200/90 dark:border-slate-700/80 -z-10"
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  )}
                  <Layers
                    className={`w-4 h-4 ${
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
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isToolsOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Tools Dropdown Panel */}
                <AnimatePresence>
                  {isToolsOpen && (
                    <motion.div
                      id="nav-dropdown-tools-menu"
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-80 p-2 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 space-y-1"
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
                            id={`tool-menu-item-${tool.id}`}
                            onClick={() => handleTabClick(tool.id)}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer group min-h-[44px] ${
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
                                <span
                                  className={`text-xs font-bold block truncate ${
                                    isSelected
                                      ? "text-indigo-900 dark:text-indigo-200"
                                      : "text-slate-900 dark:text-slate-100"
                                  }`}
                                >
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

            {/* Right: Streak + Single Unified "Utilities / More" Hub */}
            <div className="flex items-center gap-2 shrink-0">
              
              {/* Daily Learning Streak Capsule */}
              <div
                id="user-learning-streak-badge"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-black shadow-2xs select-none min-h-[38px]"
                title={isEnglish ? `${userState.currentStreak} day learning streak` : `${userState.currentStreak} günlük aktif öğrenme serisi`}
              >
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0 animate-pulse" />
                <span>{userState.currentStreak}</span>
                <span className="hidden sm:inline font-medium text-[10px] opacity-80">
                  {isEnglish ? "days" : "gün"}
                </span>
              </div>

              {/* Unified "Utilities / More" Dropdown (Consolidates Language, Theme, Resources & AI Coach) */}
              <div className="relative" ref={utilitiesRef}>
                <button
                  id="btn-utilities-menu-toggle"
                  onClick={() => setIsUtilitiesOpen(!isUtilitiesOpen)}
                  aria-expanded={isUtilitiesOpen}
                  aria-label={isEnglish ? "Options & Utilities Menu" : "Seçenekler ve Araçlar Menüsü"}
                  className={`min-h-[44px] min-w-[44px] flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap select-none ${
                    isUtilitiesOpen
                      ? "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800 shadow-2xs ring-2 ring-indigo-500/20"
                      : "bg-slate-100/90 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="hidden md:inline font-bold">
                    {isEnglish ? "Utilities" : "Seçenekler"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isUtilitiesOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Utilities Menu Popover */}
                <AnimatePresence>
                  {isUtilitiesOpen && (
                    <motion.div
                      id="utilities-menu-popover"
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-72 sm:w-80 p-2.5 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 space-y-2.5"
                    >
                      {/* Top Prominent Action: Socratic AI Coach */}
                      <button
                        id="menu-item-ai-coach"
                        onClick={() => {
                          setIsUtilitiesOpen(false);
                          onOpenAICoach();
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition-all shadow-md shadow-indigo-600/20 cursor-pointer min-h-[44px] group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4 text-amber-300" />
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-black">
                              {isEnglish ? "Socratic AI Coach" : "Sokratik AI Koçu"}
                            </div>
                            <div className="text-[10px] text-indigo-100 font-medium">
                              {isEnglish ? "Ask questions & deepen intuition" : "Kavramları Sokratik yöntemle tartış"}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform shrink-0" />
                      </button>

                      {/* Divider */}
                      <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

                      {/* Language Selection Row */}
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3 text-indigo-500" />
                            {isEnglish ? "Language / Dil" : "Dil Seçimi / Language"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setLanguage("tr");
                              setIsUtilitiesOpen(false);
                            }}
                            className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg text-xs font-bold transition-all min-h-[38px] cursor-pointer ${
                              language === "tr"
                                ? "bg-white dark:bg-slate-700 text-indigo-900 dark:text-white shadow-xs border border-indigo-200 dark:border-indigo-600"
                                : "hover:bg-slate-200/60 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            <TurkishFlag className="w-4 h-3 shrink-0" />
                            <span>Türkçe</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setLanguage("en");
                              setIsUtilitiesOpen(false);
                            }}
                            className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg text-xs font-bold transition-all min-h-[38px] cursor-pointer ${
                              language === "en"
                                ? "bg-white dark:bg-slate-700 text-indigo-900 dark:text-white shadow-xs border border-indigo-200 dark:border-indigo-600"
                                : "hover:bg-slate-200/60 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            <BritishFlag className="w-4 h-3 shrink-0" />
                            <span>English</span>
                          </button>
                        </div>
                      </div>

                      {/* Theme Toggle Button */}
                      <button
                        onClick={(e) => {
                          onToggleDarkMode(e);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer min-h-[44px]"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                          </div>
                          <div className="text-left">
                            <span className="text-xs font-bold block">
                              {isDarkMode ? (isEnglish ? "Light Theme" : "Aydınlık Tema") : (isEnglish ? "Dark Theme" : "Karanlık Tema")}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">
                              {isDarkMode ? (isEnglish ? "Switch to warm daylight" : "Açık renk paletine geç") : (isEnglish ? "Switch to navy dark canvas" : "Koyu lacivert paletine geç")}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {isDarkMode ? (isEnglish ? "Dark" : "Koyu") : (isEnglish ? "Light" : "Açık")}
                        </span>
                      </button>

                      {/* Glossary Item */}
                      <button
                        onClick={() => {
                          setIsUtilitiesOpen(false);
                          onOpenGlossary();
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer min-h-[44px]"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <span className="text-xs font-bold block">
                              {isEnglish ? "Finance & Strategy Glossary" : "Finans & Strateji Sözlüğü"}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">
                              {isEnglish ? "Search terms & formulas" : "Terimler, kısaltmalar ve tanımlar"}
                            </span>
                          </div>
                        </div>
                      </button>

                      {/* Learning Tour Guide */}
                      {onOpenGuide && (
                        <button
                          onClick={() => {
                            setIsUtilitiesOpen(false);
                            onOpenGuide();
                          }}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer min-h-[44px]"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                              <HelpCircle className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <span className="text-xs font-bold block">
                                {isEnglish ? "Learning Guide & Methodology" : "Öğrenme Rehberi & Metodoloji"}
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                {isEnglish ? "Platform's 7-stop mastery tour" : "Platformun 7 duraklı ustalık turu"}
                              </span>
                            </div>
                          </div>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Drawer Hamburger Button */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
                aria-label="Toggle Mobile Menu"
                className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 cursor-pointer shrink-0"
              >
                {isMobileDrawerOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileDrawerOpen && (
            <motion.div
              id="mobile-navigation-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-4"
            >
              {/* Primary Nav Links */}
              <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
                  {isEnglish ? "Main Navigation" : "Ana Görevler"}
                </div>
                {PRIMARY_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tools Section */}
              <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
                  {isEnglish ? "Tools & Duel" : "Uygulama & Düello"}
                </div>
                {TOOLS_ITEMS.map((tool) => {
                  const ToolIcon = tool.icon;
                  const isActive = activeTab === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleTabClick(tool.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <ToolIcon className="w-4 h-4" />
                      <span>{tool.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Socratic AI Coach Mobile Button */}
              <button
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  onOpenAICoach();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white text-sm font-extrabold shadow-md min-h-[46px]"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isEnglish ? "Ask Socratic AI Coach" : "Sokratik AI Koçuna Soru Sor"}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
