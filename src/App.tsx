import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LearningModule, UserLearningState } from "./types";
import { useLanguage } from "./context/LanguageContext";
import {
  loadUserLearningState,
  saveUserLearningState,
  checkAndUpdateStreak,
} from "./utils/spacedRepetition";
import { Navbar, NavTab } from "./components/Navbar";
import { INITIAL_PRESET_DOSSIERS } from "./data/companyAuditData";
import { GlossaryModal } from "./components/GlossaryModal";
import { AICoachDrawer } from "./components/AICoachDrawer";
import { OnboardingGuideModal } from "./components/OnboardingGuideModal";
import { FloatingGuideWidget } from "./components/FloatingGuideWidget";
import { FormulaDeepDiveModal } from "./components/FormulaDeepDiveModal";
import { Footer } from "./components/Footer";
import { GlobalClickEffect } from "./components/GlobalClickEffect";
import { MobileBottomNav } from "./components/MobileBottomNav";
import type { SimTab } from "./components/SimulationsView";

const RoadmapView = React.lazy(() => import("./components/RoadmapView").then(m => ({ default: m.RoadmapView })));
const ModuleReader = React.lazy(() => import("./components/ModuleReader").then(m => ({ default: m.ModuleReader })));
const SpacedRepetitionView = React.lazy(() => import("./components/SpacedRepetitionView").then(m => ({ default: m.SpacedRepetitionView })));
const SimulationsView = React.lazy(() => import("./components/SimulationsView").then(m => ({ default: m.SimulationsView })));
const CompanyAuditLab = React.lazy(() => import("./components/CompanyAuditLab").then(m => ({ default: m.CompanyAuditLab })));
const MoatDuelView = React.lazy(() => import("./components/MoatDuelView").then(m => ({ default: m.MoatDuelView })));
const FormulaWorkshopView = React.lazy(() => import("./components/FormulaWorkshopView").then(m => ({ default: m.FormulaWorkshopView })));

export default function App() {
  const { getModules, isEnglish } = useLanguage();
  const currentModules = getModules();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [userState, setUserState] = useState<UserLearningState>(() => {
    const loaded = loadUserLearningState();
    return checkAndUpdateStreak(loaded);
  });

  // Guide / Onboarding modal state (Default false: user can trigger via floating character widget or nav)
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Formula Deep Dive Modal Global State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);
  const [selectedFormulaId, setSelectedFormulaId] = useState<string | null>(null);

  // Get current dossiers for duel
  const getDossiers = () => {
    try {
      const saved = localStorage.getItem("moat_dossiers");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // ignore
    }
    return INITIAL_PRESET_DOSSIERS;
  };

  const [activeTab, setActiveTab] = useState<NavTab>("roadmap");
  const [selectedSim, setSelectedSim] = useState<SimTab>("reverse-dcf");
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [aiCoachPrompt, setAiCoachPrompt] = useState<string | undefined>(undefined);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [selectedGlossaryTermId, setSelectedGlossaryTermId] = useState<string | null>(null);

  // Spaced Repetition flashcard targeted review state
  const [flashcardFilter, setFlashcardFilter] = useState<number | "all" | "due" | "missed" | "new">("all");
  const [targetedFlashcardIds, setTargetedFlashcardIds] = useState<string[] | undefined>(undefined);
  const [targetedFlashcardModuleId, setTargetedFlashcardModuleId] = useState<number | null>(null);

  const activeModule = activeModuleId ? currentModules.find(m => m.id === activeModuleId) || null : null;
  const currentModuleIndex = activeModule ? currentModules.findIndex(m => m.id === activeModule.id) : -1;
  const hasNextModule = currentModuleIndex !== -1 && currentModuleIndex < currentModules.length - 1;
  const isCurrentModuleCompleted = activeModule ? userState.completedModules.includes(activeModule.id) : false;

  const handleNextModuleFromBottomNav = () => {
    if (hasNextModule && activeModule) {
      handleSelectModule(currentModules[currentModuleIndex + 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Apply dark mode class to html document element
  // Apply dark mode class to html document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Sync state changes to local storage
  useEffect(() => {
    saveUserLearningState(userState);
  }, [userState]);

  const toggleDarkMode = (e?: React.MouseEvent) => {
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    
    // Fallback if View Transitions API is not supported or no event is passed
    if (!document.startViewTransition || !e) {
      setIsDarkMode((prev) => !prev);
      return;
    }

    // Get the click position for the wave origin
    const x = e.clientX;
    const y = e.clientY;
    
    // Calculate the distance to the furthest corner to ensure the circle covers the whole screen
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setIsDarkMode((prev) => !prev);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500, // Matching the previous global CSS duration but contained in a single wave
          easing: "ease-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const handleSelectModule = (module: LearningModule) => {
    setActiveModuleId(module.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToRoadmap = () => {
    setActiveModuleId(null);
    setActiveTab("roadmap");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCompleteModule = (moduleId: number, score: number) => {
    setUserState((prev) => {
      const completed = prev.completedModules.includes(moduleId)
        ? prev.completedModules
        : [...prev.completedModules, moduleId];

      const newScores = {
        ...prev.quizScores,
        [moduleId]: score,
      };

      const updated: UserLearningState = {
        ...prev,
        completedModules: completed,
        quizScores: newScores,
        missedQuizCards: prev.missedQuizCards?.moduleId === moduleId ? null : prev.missedQuizCards,
      };
      saveUserLearningState(updated);
      return updated;
    });

    // Clear targeted flashcards if they belonged to this module
    if (targetedFlashcardModuleId === moduleId) {
      setTargetedFlashcardIds(undefined);
      setTargetedFlashcardModuleId(null);
    }
  };

  const handleQuizFailed = (moduleId: number, score: number, missedCardIds: string[]) => {
    setUserState((prev) => {
      const newScores = {
        ...prev.quizScores,
        [moduleId]: score,
      };

      const updated: UserLearningState = {
        ...prev,
        quizScores: newScores,
        missedQuizCards: missedCardIds.length > 0 ? { moduleId, cardIds: missedCardIds } : null,
      };
      saveUserLearningState(updated);
      return updated;
    });
  };

  const handleOpenGlossary = (termId?: string) => {
    setSelectedGlossaryTermId(termId || null);
    setIsGlossaryOpen(true);
  };

  return (
    <div className="min-h-screen relative text-slate-800 dark:text-slate-100 flex flex-col selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:text-indigo-200 font-sans overflow-x-clip z-0">
      
      {/* Global Interactive Click Ripple */}
      <GlobalClickEffect />

      {/* Ambient Moving Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-950">
        {/* Abstract Blobs */}
        <div className="absolute top-[10%] left-[10%] w-[45rem] h-[45rem] bg-indigo-400/25 dark:bg-indigo-500/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[5%] w-[40rem] h-[40rem] bg-rose-300/25 dark:bg-rose-800/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob-reverse animation-delay-2000"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[50rem] h-[50rem] bg-amber-300/25 dark:bg-blue-600/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] animate-pan-grid"></div>
      </div>

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveModuleId(null);
        }}
        userState={userState}
        onOpenAICoach={() => setIsAICoachOpen(true)}
        onOpenGlossary={() => handleOpenGlossary()}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenFormulas={() => {
          setSelectedFormulaId(null);
          setActiveTab("formulas");
          setActiveModuleId(null);
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-28 sm:pb-12">
        <React.Suspense fallback={<div className="flex h-64 items-center justify-center text-slate-500 font-medium">Yükleniyor...</div>}>
          <AnimatePresence mode="wait">
            {activeModule ? (
              <motion.div
                key={`module-${activeModule.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <ModuleReader
                module={activeModule}
                allModules={currentModules}
                userState={userState}
                onBackToRoadmap={handleBackToRoadmap}
                onSelectModule={handleSelectModule}
                onCompleteModule={handleCompleteModule}
                onQuizFailed={handleQuizFailed}
                onOpenAICoach={() => setIsAICoachOpen(true)}
                onOpenGlossary={handleOpenGlossary}
                onOpenLabSim={(simId) => {
                  setSelectedSim(simId);
                  setActiveTab("simulators");
                  setActiveModuleId(null);
                }}
                onOpenFormulaWorkshop={(formulaId) => {
                  setSelectedFormulaId(formulaId);
                  setActiveTab("formulas");
                  setActiveModuleId(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onReviewMissedInFlashcards={(moduleId, flashcardIds) => {
                  setTargetedFlashcardIds(flashcardIds);
                  setTargetedFlashcardModuleId(moduleId);
                  setFlashcardFilter("missed");
                  setActiveTab("spaced-repetition");
                  setActiveModuleId(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`tab-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {activeTab === "roadmap" && (
                <RoadmapView
                  userState={userState}
                  onSelectModule={handleSelectModule}
                  onOpenGlossary={() => handleOpenGlossary()}
                  onOpenGuide={() => setIsGuideOpen(true)}
                  onOpenAICoach={() => {
                    setAiCoachPrompt(undefined);
                    setIsAICoachOpen(true);
                  }}
                  onNavigateTab={(tab, sim, filter, targetCardIds, targetModuleId) => {
                    if (sim) setSelectedSim(sim);
                    if (filter) {
                      setFlashcardFilter(filter);
                    }
                    if (targetCardIds && targetCardIds.length > 0) {
                      setTargetedFlashcardIds(targetCardIds);
                      setTargetedFlashcardModuleId(targetModuleId ?? null);
                    } else {
                      setTargetedFlashcardIds(undefined);
                      setTargetedFlashcardModuleId(null);
                    }
                    setActiveTab(tab);
                    setActiveModuleId(null);
                  }}
                />
              )}

              {activeTab === "formulas" && (
                <FormulaWorkshopView
                  selectedFormulaId={selectedFormulaId}
                  onSelectFormula={(id) => setSelectedFormulaId(id)}
                  onNavigateToModule={(moduleId) => {
                    const target = currentModules.find((m) => m.id === moduleId);
                    if (target) {
                      setActiveModuleId(target.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  onNavigateToSim={(simId) => {
                    setSelectedSim(simId as any);
                    setActiveTab("simulators");
                    setActiveModuleId(null);
                  }}
                />
              )}

              {activeTab === "simulators" && (
                <SimulationsView
                  activeSim={selectedSim}
                  onSelectSim={(sim) => setSelectedSim(sim)}
                  onOpenAICoachWithPrompt={(prompt) => {
                    setAiCoachPrompt(prompt);
                    setIsAICoachOpen(true);
                  }}
                />
              )}

              {activeTab === "company-audit" && (
                <CompanyAuditLab
                  onOpenAICoachWithPrompt={(prompt) => {
                    setAiCoachPrompt(prompt);
                    setIsAICoachOpen(true);
                  }}
                  onOpenGlossary={handleOpenGlossary}
                />
              )}

              {activeTab === "moat-duel" && (
                <MoatDuelView dossiers={getDossiers()} />
              )}

              {activeTab === "spaced-repetition" && (
                <SpacedRepetitionView
                  userState={userState}
                  setUserState={setUserState}
                  onOpenGlossary={handleOpenGlossary}
                  onOpenAICoach={() => {
                    setAiCoachPrompt(undefined);
                    setIsAICoachOpen(true);
                  }}
                  initialFilter={flashcardFilter}
                  targetedCardIds={targetedFlashcardIds}
                  targetedModuleId={targetedFlashcardModuleId}
                  onBackToModule={(modId) => {
                    setActiveModuleId(modId);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        </React.Suspense>
      </main>

      {/* Modern Footer with Creator LinkedIn Link */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setActiveModuleId(null);
        }}
        onOpenGlossary={() => handleOpenGlossary()}
        onOpenAICoach={() => {
          setAiCoachPrompt(undefined);
          setIsAICoachOpen(true);
        }}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Floating Bottom-Left Guided Learning Character Widget */}
      <FloatingGuideWidget
        onOpenGuide={() => setIsGuideOpen(true)}
        isAllCompleted={userState.completedModules.length >= currentModules.length}
      />

      {/* Floating Socratic AI Coach Drawer */}
      <AICoachDrawer
        isOpen={isAICoachOpen}
        onClose={() => {
          setIsAICoachOpen(false);
          setAiCoachPrompt(undefined);
        }}
        currentTopic={
          activeTab === "company-audit"
            ? (isEnglish ? "Company Balance Sheet X-Ray & Moat Diagnostic" : "Şirket Bilançosu Röntgeni & Hendek Teşhisi")
            : activeModule
            ? activeModule.title
            : (isEnglish ? "General Moat Strategy" : "Genel Hendek Stratejisi")
        }
        initialPrompt={aiCoachPrompt}
      />

      {/* Full Terminology Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        selectedTermId={selectedGlossaryTermId}
      />

      {/* Onboarding & Journey Guide Modal */}
      <OnboardingGuideModal
        isOpen={isGuideOpen}
        onClose={() => {
          setIsGuideOpen(false);
          try {
            localStorage.setItem("moat_guide_seen", "true");
          } catch {
            // ignore
          }
        }}
        onNavigateTab={(tab, sim) => {
          if (sim) setSelectedSim(sim);
          setActiveTab(tab);
          setActiveModuleId(null);
          try {
            localStorage.setItem("moat_guide_seen", "true");
          } catch {
            // ignore
          }
        }}
        onStartFirstModule={() => {
          setActiveTab("roadmap");
          if (currentModules.length > 0) {
            setActiveModuleId(currentModules[0].id);
          }
          try {
            localStorage.setItem("moat_guide_seen", "true");
          } catch {
            // ignore
          }
        }}
      />

      {/* Global Formula Deep Dive Atelier Modal */}
      <FormulaDeepDiveModal
        isOpen={isFormulaModalOpen}
        initialFormulaId={selectedFormulaId || undefined}
        onClose={() => {
          setIsFormulaModalOpen(false);
          setSelectedFormulaId(null);
        }}
        onOpenFullPage={(fId) => {
          setSelectedFormulaId(fId);
          setActiveTab("formulas");
          setActiveModuleId(null);
        }}
      />

      {/* Modern Mobile-First Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveModuleId(null);
        }}
        activeModule={activeModule}
        onBackToRoadmap={handleBackToRoadmap}
        onOpenAICoach={() => {
          setAiCoachPrompt(undefined);
          setIsAICoachOpen(true);
        }}
        onNextModule={handleNextModuleFromBottomNav}
        hasNextModule={hasNextModule}
        isNextModuleUnlocked={isCurrentModuleCompleted}
      />
    </div>
  );
}

