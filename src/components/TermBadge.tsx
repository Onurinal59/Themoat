import React, { useState } from "react";
import { GLOSSARY_TERMS } from "../data/glossaryData";
import { HelpCircle, Sparkles, X, BookOpen } from "lucide-react";

interface TermBadgeProps {
  termId: string;
  label?: string;
  onOpenFullGlossary?: (termId: string) => void;
}

export const TermBadge: React.FC<TermBadgeProps> = ({ termId, label, onOpenFullGlossary }) => {
  const [isOpen, setIsOpen] = useState(false);
  const termData = GLOSSARY_TERMS.find((t) => t.id === termId);

  if (!termData) {
    return <span className="font-semibold text-indigo-700">{label || termId}</span>;
  }

  return (
    <span className="relative inline-block mx-0.5">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold transition-all cursor-pointer"
        title="Can Simidi: Sade Açıklama ve Analojiyi Gör"
      >
        <span>{label || termData.term}</span>
        <HelpCircle className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
      </button>

      {isOpen && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl text-left text-slate-800 dark:text-slate-200 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/50">
                Sıfır Bilgi Can Simidi
              </span>
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">{termData.term}</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Bilgi kartını kapat"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {termData.shortDefinition}
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong>💡 Günlük Hayat Örneği:</strong> {termData.realWorldAnalogy}
          </div>

          {onOpenFullGlossary && (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenFullGlossary(termData.id);
              }}
              className="mt-3 w-full py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <BookOpen className="w-3.5 h-3.5" /> Sözlükte Detaylı İncele
            </button>
          )}
        </div>
      )}
    </span>
  );
};
