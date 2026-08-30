import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, BookOpen, Sparkles, Tag, HelpCircle } from "lucide-react";
import { GlossaryTerm } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { translateCategory } from "../data/companyAuditData";
import { useAccessibleDialog } from "../hooks/useAccessibleDialog";

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTermId?: string | null;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  selectedTermId,
}) => {
  const { isEnglish, getGlossaryTerms, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();
  const glossaryTerms = getGlossaryTerms();
  const dialogRef = useAccessibleDialog(isOpen, onClose);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTerm, setActiveTerm] = useState<GlossaryTerm | null>(() => {
    if (selectedTermId) {
      return glossaryTerms.find((t) => t.id === selectedTermId) || glossaryTerms[0];
    }
    return glossaryTerms[0];
  });

  const categories = isEnglish
    ? [
        { id: "all", label: "All" },
        { id: "Fundamental Finance", label: "Fundamental Finance" },
        { id: "Strategy", label: "Strategy" },
        { id: "Microeconomics", label: "Microeconomics" },
        { id: "Industry Analysis", label: "Industry Analysis" },
        { id: "Innovation & Game Theory", label: "Innovation & Game Theory" },
      ]
    : [
        { id: "all", label: "Tümü" },
        { id: "Temel Finans", label: "Temel Finans" },
        { id: "Strateji", label: "Strateji" },
        { id: "Mikroekonomi", label: "Mikroekonomi" },
        { id: "Sektör Analizi", label: "Sektör Analizi" },
        { id: "İnovasyon & Oyun Teorisi", label: "İnovasyon & Oyun Teorisi" },
      ];

  const filteredTerms = glossaryTerms.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.realWorldAnalogy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.category === selectedCategory ||
      translateCategory(item.category, isEnglish) === selectedCategory ||
      translateCategory(item.category, !isEnglish) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const currentActiveTerm = activeTerm || filteredTerms[0] || glossaryTerms[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="glossary-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 id="glossary-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                {t("GlossaryModal.finance_moat_termino_397")}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 hidden sm:block">
                {t("GlossaryModal.plain_language_defin_398")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={isEnglish ? "Close glossary" : "Sözlüğü kapat"}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-3 sm:p-4 bg-slate-50/50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label={isEnglish ? "Search glossary" : "Sözlükte ara"}
              placeholder={t("GlossaryModal.search_terms_concept_399")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 shadow-xs"
            />
          </div>

          {/* Category Pills - Modern Pill design with wrap */}
          <div className="flex flex-wrap gap-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 font-bold"
                    : "bg-transparent border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: Split view (List & Detail) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left: Term List */}
          <div className="md:col-span-5 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 space-y-1.5 max-h-[300px] md:max-h-[500px] bg-slate-50/30 dark:bg-slate-950/40">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-500 dark:text-slate-400">
                {t("GlossaryModal.no_matching_terms_fo_400")}
              </div>
            ) : (
              filteredTerms.map((term) => {
                const isSelected = currentActiveTerm?.id === term.id;
                return (
                  <button
                    key={term.id}
                    onClick={() => setActiveTerm(term)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1 cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-700 text-indigo-950 dark:text-indigo-200 shadow-xs"
                        : "bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">{term.term}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700">
                        {translateCategory(term.category, isEnglish)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{term.shortDefinition}</p>
                  </button>
                );
              })
            )}
          </div>

          {/* Right: Active Term Deep-Dive */}
          <div className="md:col-span-7 p-4 sm:p-6 overflow-y-auto max-h-[350px] md:max-h-[500px] bg-white dark:bg-slate-900 space-y-4 sm:space-y-5">
            {currentActiveTerm ? (
              <>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 uppercase">
                      {translateCategory(currentActiveTerm.category, isEnglish)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1.5">{currentActiveTerm.term}</h3>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium mt-1">
                    {currentActiveTerm.shortDefinition}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {t("GlossaryModal.detailed_explanation_401")}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    {currentActiveTerm.detailedExplanation}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 mb-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    {t("GlossaryModal.zero_knowledge_every_402")}
                  </div>
                  <p className="text-xs text-amber-950 dark:text-amber-100 leading-relaxed">
                    {currentActiveTerm.realWorldAnalogy}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-500 dark:text-slate-400 text-xs">
                {t("GlossaryModal.select_a_term_from_t_403")}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
          <span>
            {isEnglish ? `Total ${glossaryTerms.length} Strategic & Financial Terms` : `Toplam ${glossaryTerms.length} Stratejik & Finansal Kavram`}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold rounded-xl transition-colors cursor-pointer"
          >
            {t("GlossaryModal.close_404")}
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
  );
};
