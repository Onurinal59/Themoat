import React, { useState } from "react";
import {
  Award,
  ChevronDown,
  ChevronUp,
  Quote,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  BookOpen
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface MauboussinMethodologyCoachProps {
  activeStep: 1 | 2 | 3 | 4 | 5;
  isTemplateDossier: boolean;
  onAskAICoach?: () => void;
  onOpenGlossary?: (termId?: string) => void;
}

export const MauboussinMethodologyCoach: React.FC<MauboussinMethodologyCoachProps> = ({
  activeStep,
  isTemplateDossier,
  onAskAICoach,
}) => {
  const { isEnglish, getStepMethodologyGuides, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);
  
  const stepGuides = getStepMethodologyGuides();
  const guide = stepGuides[activeStep];

  if (!guide) return null;

  return (
    <div
      id={`mauboussin-methodology-guide-step-${activeStep}`}
      className="bg-gradient-to-br from-indigo-50/90 via-slate-50 to-indigo-100/60 dark:from-indigo-950 dark:via-slate-900 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-500/30 rounded-3xl p-5 sm:p-6 text-slate-900 dark:text-white shadow-xs transition-all"
    >
      {/* Header & Collapse Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-400/30 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0 shadow-inner">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                {t("MauboussinMethodologyCoach.michael_j_mauboussin_422")}
              </span>
              {isTemplateDossier && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                  {t("MauboussinMethodologyCoach.master_case_mode_423")}
                </span>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              {guide.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onAskAICoach && (
            <button
              onClick={onAskAICoach}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
              title={t("MauboussinMethodologyCoach.ask_socratic_questio_424")}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t("MauboussinMethodologyCoach.ask_ai_coach_425")}</span>
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-xs"
            aria-label={isExpanded ? (t("MauboussinMethodologyCoach.collapse_guide_426")) : (t("MauboussinMethodologyCoach.expand_guide_427"))}
          >
            <span className="hidden md:inline">{isExpanded ? (t("MauboussinMethodologyCoach.collapse_428")) : (t("MauboussinMethodologyCoach.expand_429"))}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="mt-5 space-y-5 pt-4 border-t border-slate-200 dark:border-slate-800/80 animate-in fade-in duration-200">
          {/* Mauboussin Quote */}
          <div className="bg-indigo-100/60 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-500/20 rounded-2xl p-4 relative">
            <Quote className="w-6 h-6 text-indigo-400/40 dark:text-indigo-400/30 absolute right-4 top-4" />
            <blockquote className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-100/90 italic font-serif leading-relaxed pr-8">
              {guide.mauboussinQuote}
            </blockquote>
          </div>

          {/* Grid of Concepts & Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Core Concepts */}
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 space-y-2.5 shadow-2xs">
              <h5 className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> {t("MauboussinMethodologyCoach.core_concepts_formul_430")}
              </h5>
              <div className="space-y-2">
                {guide.coreConcepts.map((concept, idx) => {
                  const parts = concept.split(":");
                  return (
                    <div key={idx} className="text-xs leading-relaxed">
                      {parts.length > 1 ? (
                        <>
                          <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700/50 px-1.5 py-0.5 rounded text-[11px] mr-1.5 border border-slate-200/60 dark:border-transparent">
                            {parts[0].trim()}
                          </span>
                          <span className="text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs">
                            {parts.slice(1).join(":").trim()}
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs">{concept}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Checklist Questions */}
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 space-y-2.5 shadow-2xs">
              <h5 className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {t("MauboussinMethodologyCoach.critical_audit_quest_431")}
              </h5>
              <ul className="space-y-1.5">
                {guide.keyQuestions.map((q, idx) => (
                  <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-snug">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Pitfalls & Practical Exercise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Common Pitfalls */}
            <div className="bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-4 space-y-2 shadow-2xs">
              <h5 className="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> {t("MauboussinMethodologyCoach.common_pitfalls_fall_432")}
              </h5>
              <ul className="space-y-1.5">
                {guide.commonPitfalls.map((pitfall, idx) => (
                  <li key={idx} className="text-xs text-rose-900 dark:text-rose-200/80 flex items-start gap-2 leading-snug">
                    <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Exercise */}
            <div className="bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-4 space-y-2 flex flex-col justify-between shadow-2xs">
              <div>
                <h5 className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> {t("MauboussinMethodologyCoach.practical_exercise_f_433")}
                </h5>
                <p className="text-xs text-amber-950 dark:text-amber-100/90 leading-relaxed mt-1">
                  {guide.practicalExercise}
                </p>
              </div>

              {isTemplateDossier && (
                <div className="mt-3 pt-2.5 border-t border-amber-200 dark:border-amber-900/30 text-[11px] text-amber-900 dark:text-amber-200/80 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span>
                    <strong>{t("MauboussinMethodologyCoach.tip_434")}</strong> {t("MauboussinMethodologyCoach.costco_bim_benchmark_435")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
