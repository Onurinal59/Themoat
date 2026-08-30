import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flashcard, UserLearningState } from "../types";
import { calculateSM2, saveUserLearningState, getDueFlashcards, getNewFlashcards, mergeFlashcardProgress } from "../utils/spacedRepetition";
import {
  RotateCcw,
  Sparkles,
  Repeat,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useLanguage } from "../context/LanguageContext";

interface SpacedRepetitionViewProps {
  userState: UserLearningState;
  setUserState: React.Dispatch<React.SetStateAction<UserLearningState>>;
  onOpenGlossary: (termId?: string) => void;
  onOpenAICoach: () => void;
  initialFilter?: number | "all" | "due" | "missed" | "new";
  targetedCardIds?: string[];
  targetedModuleId?: number | null;
  onBackToModule?: (moduleId: number) => void;
}

export const SpacedRepetitionView: React.FC<SpacedRepetitionViewProps> = ({
  userState,
  setUserState,
  onOpenGlossary,
  onOpenAICoach,
  initialFilter = "all",
  targetedCardIds,
  targetedModuleId,
  onBackToModule,
}) => {
  const { isEnglish, getFlashcards, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();
  const baseFlashcards = getFlashcards();

  const [activeModuleFilter, setActiveModuleFilter] = useState<number | "all" | "due" | "missed" | "new">(initialFilter);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Sync if initialFilter changes
  useEffect(() => {
    if (initialFilter) {
      setActiveModuleFilter(initialFilter);
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  }, [initialFilter, targetedCardIds]);

  // Cards array based on userState or fallback
  const cardsList = baseFlashcards.map((initCard) =>
    mergeFlashcardProgress(initCard, userState.flashcardStates[initCard.id])
  );

  const dueCards = getDueFlashcards(userState, baseFlashcards);
  const newCards = getNewFlashcards(userState, baseFlashcards);

  let filteredCards: Flashcard[] = cardsList;
  if (activeModuleFilter === "due") {
    filteredCards = dueCards;
  } else if (activeModuleFilter === "new") {
    filteredCards = newCards;
  } else if (activeModuleFilter === "missed" && targetedCardIds && targetedCardIds.length > 0) {
    filteredCards = cardsList.filter((c) => targetedCardIds.includes(c.id));
    if (filteredCards.length === 0 && targetedModuleId) {
      filteredCards = cardsList.filter((c) => c.moduleId === targetedModuleId);
    }
  } else if (typeof activeModuleFilter === "number") {
    filteredCards = cardsList.filter((c) => c.moduleId === activeModuleFilter);
  }

  const currentCard = filteredCards[currentCardIndex] || filteredCards[0];

  const handleRate = (quality: 1 | 2 | 3 | 4) => {
    if (!currentCard) return;

    const updatedCard = calculateSM2(currentCard, quality);

    const updatedStates = {
      ...userState.flashcardStates,
      [updatedCard.id]: updatedCard,
    };

    // Calculate mastered count (repetitions >= 3)
    const masteredCount = (Object.values(updatedStates) as Flashcard[]).filter(
      (c) => c.repetitions >= 3
    ).length;

    const newState: UserLearningState = {
      ...userState,
      flashcardStates: updatedStates,
      masteredCardsCount: masteredCount,
    };

    setUserState(newState);
    saveUserLearningState(newState);

    if (quality === 4) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    }

    // Move to next card
    setIsFlipped(false);
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const baseFilters = isEnglish
    ? [
        { id: "all", label: "All Cards" },
        ...(dueCards.length > 0
          ? [{ id: "due", label: `Due for Review (${dueCards.length})` }]
          : []),
        { id: "new", label: `New Concepts (${newCards.length})` },
        { id: 1, label: "Module 1: ROIC vs WACC" },
        { id: 2, label: "Module 2: Dickinson Life Cycle" },
        { id: 3, label: "Module 3: Value Stick" },
        { id: 4, label: "Module 4: Industry & Profit Pool" },
        { id: 5, label: "Module 5: 10-K Forensic Accounting" },
        { id: 6, label: "Module 6: Game Theory & Barriers" },
        { id: 7, label: "Module 7: DuPont & CCC" },
        { id: 8, label: "Module 8: Reverse DCF & Moat Audit" },
      ]
    : [
        { id: "all", label: "Tüm Kartlar" },
        ...(dueCards.length > 0
          ? [{ id: "due", label: `Tekrarı Gelenler (${dueCards.length})` }]
          : []),
        { id: "new", label: `Yeni Kavramlar (${newCards.length})` },
        { id: 1, label: "Modül 1: ROIC vs WACC" },
        { id: 2, label: "Modül 2: Dickinson Yaşam" },
        { id: 3, label: "Modül 3: Değer Çubuğu" },
        { id: 4, label: "Modül 4: Sektör & Kâr Havuzu" },
        { id: 5, label: "Modül 5: 10-K Dipnot Düzeltmeleri" },
        { id: 6, label: "Modül 6: Oyun Teorisi & Giriş Engelleri" },
        { id: 7, label: "Modül 7: DuPont & CCC" },
        { id: 8, label: "Modül 8: Tersine DCF & Hendek Denetimi" },
      ];

  const filters = targetedCardIds && targetedCardIds.length > 0
    ? [
        {
          id: "missed",
          label: isEnglish
            ? `Targeted Quiz Review (${targetedCardIds.length})`
            : `Quiz Hedefli Tekrar (${targetedCardIds.length})`,
        },
        ...baseFilters,
      ]
    : baseFilters;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-16 px-1 sm:px-0"
      id="spaced-repetition-view"
    >
      {/* Targeted Quiz Review Top Banner */}
      {targetedModuleId && onBackToModule && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 rounded-2xl bg-purple-500/10 dark:bg-purple-500/15 border border-purple-500/30 text-purple-950 dark:text-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div className="text-xs sm:text-sm leading-relaxed">
              <span className="font-extrabold text-purple-900 dark:text-purple-200">
                {isEnglish ? `Targeted Concept Review for Step 0${targetedModuleId} — ` : `Adım 0${targetedModuleId} İçin Hedefli Kavram Tekrarı — `}
              </span>
              <span className="text-purple-800 dark:text-purple-300">
                {t("SpacedRepetitionView.study_the_flashcard_722")}
              </span>
            </div>
          </div>

          <button
            onClick={() => onBackToModule(targetedModuleId)}
            className="shrink-0 self-end sm:self-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer min-h-[36px] active:scale-98"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isEnglish ? `Return to Step 0${targetedModuleId} Quiz` : `Adım 0${targetedModuleId} Testine Dön`}</span>
          </button>
        </motion.div>
      )}

      {/* Header */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900/50 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            {t("SpacedRepetitionView.supermemo_sm_2_space_723")}
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {t("SpacedRepetitionView.cognitive_memory_mas_724")}
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t("SpacedRepetitionView.lock_critical_formul_725")}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400">{t("SpacedRepetitionView.total_cards_726")}</div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {cardsList.length}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-center">
            <div className="text-xs text-blue-800 dark:text-blue-300">{t("SpacedRepetitionView.new_concepts_727")}</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-0.5">
              {newCards.length}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-center">
            <div className="text-xs text-purple-800 dark:text-purple-300">{t("SpacedRepetitionView.due_for_review_728")}</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-0.5">
              {dueCards.length}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center">
            <div className="text-xs text-emerald-800 dark:text-emerald-300">{t("SpacedRepetitionView.mastered_cards_729")}</div>
            <div className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mt-0.5">
              {userState.masteredCardsCount || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Module Filter Tabs */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800/80 py-1">
          {filters.map((f) => (
            <motion.button
              key={f.id}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveModuleFilter(f.id as any);
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                activeModuleFilter === f.id
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 font-bold"
                  : "bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50"
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Filter contextual hint */}
        {activeModuleFilter === "new" && (
          <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/30 px-3.5 py-2 rounded-xl border border-blue-200/70 dark:border-blue-900/40">
            {t("SpacedRepetitionView.explore_these_cards_730")}
          </div>
        )}
      </div>

      {/* The Interactive Flip Card */}
      {currentCard ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>
              {isEnglish ? `Card ${currentCardIndex + 1} / ${filteredCards.length}` : `Kart ${currentCardIndex + 1} / ${filteredCards.length}`}
            </span>
            <span className="font-mono">
              {isEnglish
                ? `Reps: ${currentCard.repetitions} | Interval: ${currentCard.intervalDays}d | Ease: ${currentCard.easeFactor}`
                : `Tekrar: ${currentCard.repetitions} | Aralık: ${currentCard.intervalDays} Gün | Kolaylık: ${currentCard.easeFactor}`}
            </span>
          </div>

          {/* Flip Card Container */}
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.995 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[300px] sm:min-h-[340px] p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between shadow-xs relative select-none group"
          >
            {/* Top Card Badge */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase border border-slate-200 dark:border-slate-700">
                {currentCard.term}
              </span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                <Repeat className="w-3.5 h-3.5" /> {t("SpacedRepetitionView.click_to_flip_card_731")}
              </span>
            </div>

            {/* Middle Question / Answer */}
            <div className="my-auto py-4 text-center">
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-2"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {t("SpacedRepetitionView.question_problem_732")}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed max-w-xl mx-auto">
                      {currentCard.question}
                    </h3>
                  </motion.div>
                ) : (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-4"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {t("SpacedRepetitionView.answer_explanation_733")}
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 leading-relaxed max-w-xl mx-auto">
                      {currentCard.answer}
                    </p>
                    <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 max-w-xl mx-auto leading-relaxed text-left">
                      💡 <strong>{t("SpacedRepetitionView.concrete_analogy_734")}</strong> {currentCard.analogy}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Tip */}
            <div className="text-center text-[11px] text-slate-400 dark:text-slate-500">
              {!isFlipped
                ? t("SpacedRepetitionView.visualize_your_answe_735")
                : t("SpacedRepetitionView.now_evaluate_your_re_736")}
            </div>
          </motion.div>

          {/* SM-2 Quality Rating Buttons */}
          {isFlipped ? (
            <div className="space-y-2 animate-in fade-in duration-200">
              <div className="text-center text-xs font-bold text-slate-600 dark:text-slate-300">
                {t("SpacedRepetitionView.how_accurately_did_y_737")}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleRate(1)}
                  className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span>{t("SpacedRepetitionView.1_forgot_reset_738")}</span>
                  <span className="text-[10px] font-normal text-rose-600 dark:text-rose-400">
                    {t("SpacedRepetitionView.review_tomorrow_739")}
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleRate(2)}
                  className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span>{t("SpacedRepetitionView.2_hard_recall_740")}</span>
                  <span className="text-[10px] font-normal text-amber-600 dark:text-amber-400">
                    {t("SpacedRepetitionView.2_3_days_later_741")}
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleRate(3)}
                  className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-900/60 text-sky-800 dark:text-sky-200 text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span>{t("SpacedRepetitionView.3_good_recall_742")}</span>
                  <span className="text-[10px] font-normal text-sky-600 dark:text-sky-400">
                    {t("SpacedRepetitionView.5_7_days_later_743")}
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleRate(4)}
                  className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span>{t("SpacedRepetitionView.4_perfect_easy_744")}</span>
                  <span className="text-[10px] font-normal text-emerald-600 dark:text-emerald-400">
                    {t("SpacedRepetitionView.14_days_later_745")}
                  </span>
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsFlipped(true)}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-xs transition-all shadow-xs cursor-pointer"
              >
                {t("SpacedRepetitionView.show_answer_746")}
              </motion.button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-xs">
          {t("SpacedRepetitionView.no_flashcards_found_747")}
        </div>
      )}
    </motion.div>
  );
};
