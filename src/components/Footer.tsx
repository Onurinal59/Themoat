import React from "react";
import {
  Linkedin,
  ExternalLink,
  BookOpen,
  Calculator,
  Building2,
  Brain,
  Layers,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  GraduationCap
} from "lucide-react";
import { NavTab } from "./Navbar";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenGlossary: () => void;
  onOpenAICoach: () => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenGlossary,
  onOpenAICoach,
  onOpenGuide
}) => {
  const { isEnglish, t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 transition-colors">
      {/* Top Banner / Value Proposition */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Measuring the Moat (Michael J. Mauboussin)
              </span>
              <span className="hidden md:inline text-slate-400 dark:text-slate-500">•</span>
              <span className="hidden md:inline text-slate-500 dark:text-slate-400">
                {t("footer.tagline", "Sürdürülebilir Rekabet Avantajı & Kurumsal Değerleme Rehberi")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenGuide}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{isEnglish ? "Academy Guide" : "Akademi Rehberi"}</span>
              </button>
              <button
                onClick={onOpenAICoach}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>{isEnglish ? "Socratic AI Coach" : "Sokratik AI Koçu"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand & Creator Card (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-black text-base shadow-xs shadow-indigo-500/20">
                M
              </div>
              <div>
                <span className="font-extrabold text-base text-slate-900 dark:text-slate-100 tracking-tight block">
                  {isEnglish ? "Economic Moat Academy" : "Ekonomik Hendek Akademisi"}
                </span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium block">
                  {isEnglish ? "Balance Sheet X-Ray & Valuation Studio" : "Bilanço Röntgeni & Değerleme Stüdyosu"}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              {t(
                "footer.description",
                "Michael J. Mauboussin ve Dan Callahan'ın dünyaca ünlü araştırmalarını temel alan, hissedarlar ve finansal analistler için tasarlanmış interaktif strateji, ROIC röntgeni ve rekabet avantajı simülasyon platformu."
              )}
            </p>

            {/* Creator Profile Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-800/80 dark:to-indigo-950/20 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                    Oİ
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      Onur İnal
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                      {t("footer.creator", "Platform Yapımcısı & Geliştirici")}
                    </span>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/onurınal"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Onur İnal LinkedIn Profile"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0A66C2] hover:bg-[#004182] text-white shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                {t("footer.contact", "Soru, geri bildirim veya iş birliği önerileriniz için LinkedIn üzerinden doğrudan iletişime geçebilirsiniz.")}
              </p>
            </div>
          </div>

          {/* Column 2: Navigation & Learning (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {t("footer.education", "Eğitim & Modüller")}
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab("roadmap")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{isEnglish ? "8-Step Learning Roadmap" : "8 Aşamalı Öğrenim Yol Haritası"}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("formulas")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{isEnglish ? "Formula & X-Ray Workshop" : "Formül & Röntgen Atölyesi"}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("company-audit")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{isEnglish ? "Company Audit Studio (10-K & SEC)" : "Şirket Analiz Stüdyosu (10-K & KAP)"}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("moat-duel")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{isEnglish ? "Company Moat Duel" : "Şirket Hendek Düellosu"}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools & Interactive Labs (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {t("footer.tools", "Laboratuvar & Araçlar")}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigateTab("simulators")}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left cursor-pointer flex flex-col gap-0.5"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200">{isEnglish ? "11 Interactive Simulators" : "11 İnteraktif Simülatör"}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">ROIC, DuPont, CCC, DCF</span>
              </button>

              <button
                onClick={() => onNavigateTab("spaced-repetition")}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left cursor-pointer flex flex-col gap-0.5"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200">{isEnglish ? "Spaced Repetition" : "Aralıklı Tekrarlama"}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">SuperMemo-2</span>
              </button>

              <button
                onClick={onOpenGlossary}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left cursor-pointer flex flex-col gap-0.5"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200">{isEnglish ? "Glossary" : "Kapsamlı Sözlük"}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{isEnglish ? "Finance & Strategy Terms" : "Finans & Strateji Terimleri"}</span>
              </button>

              <button
                onClick={onOpenAICoach}
                className="p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 hover:bg-purple-100/60 dark:hover:bg-purple-900/40 border border-purple-200/80 dark:border-purple-800/60 hover:border-purple-400 dark:hover:border-purple-600 transition-all text-left cursor-pointer flex flex-col gap-0.5"
              >
                <span className="font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  {isEnglish ? "Socratic AI Coach" : "Sokratik AI Koçu"}
                </span>
                <span className="text-[11px] text-purple-700 dark:text-purple-300">{isEnglish ? "Tailored Mentorship" : "Özelleştirilmiş Mentorluk"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-left">
            <span>{t("footer.copyright", "© 2026 Ekonomik Hendek Akademisi")}</span>
            <span>•</span>
            <span>
              {isEnglish ? "Author: " : "Yapımcı: "}
              <a
                href="https://www.linkedin.com/in/onurınal"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                Onur İnal
                <Linkedin className="w-3 h-3 inline" />
              </a>
            </span>
            <span>•</span>
            <span className="text-[11px]">{isEnglish ? "Open Educational Finance Platform" : "Açık Kaynaklı Eğitsel Finans Platformu"}</span>
          </div>

          <div className="text-[11px] text-center md:text-right text-slate-400 dark:text-slate-500 max-w-lg">
            {t("footer.disclaimer", "Bu platform yalnızca finansal analiz, eğitim ve metodolojik öğrenim amaçlıdır; herhangi bir yatırım tavsiyesi (YTD) niteliği taşımaz.")}
          </div>
        </div>
      </div>
    </footer>
  );
};

