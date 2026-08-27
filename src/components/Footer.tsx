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
                type="button"
                onClick={onOpenGuide}
                aria-label={t("Footer.open_academy_guide_189")}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer min-h-[44px]"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{t("Footer.academy_guide_190")}</span>
              </button>
              <button
                type="button"
                onClick={onOpenAICoach}
                aria-label={t("Footer.open_socratic_ai_coa_191")}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors cursor-pointer min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>{t("Footer.socratic_ai_coach_192")}</span>
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
                  {t("Footer.economic_moat_academ_193")}
                </span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium block">
                  {t("Footer.balance_sheet_x_ray_194")}
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0A66C2] hover:bg-[#004182] text-white shadow-xs hover:shadow-md transition-all cursor-pointer group min-h-[44px]"
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
            <ul className="space-y-1 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab("roadmap")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 text-left cursor-pointer min-h-[44px] py-2 w-full"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{t("Footer.8_step_learning_road_195")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab("formulas")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 text-left cursor-pointer min-h-[44px] py-2 w-full"
                >
                  <Calculator className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{t("Footer.formula_x_ray_worksh_196")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab("company-audit")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 text-left cursor-pointer min-h-[44px] py-2 w-full"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{t("Footer.company_audit_studio_197")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab("moat-duel")}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 text-left cursor-pointer min-h-[44px] py-2 w-full"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{t("Footer.company_moat_duel_198")}</span>
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
                type="button"
                onClick={() => onNavigateTab("simulators")}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left cursor-pointer flex flex-col justify-center gap-0.5 min-h-[48px]"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200">{t("Footer.11_interactive_simul_199")}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">ROIC, DuPont, CCC, DCF</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab("spaced-repetition")}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left cursor-pointer flex flex-col justify-center gap-0.5 min-h-[48px]"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200">{t("Footer.spaced_repetition_200")}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">SuperMemo-2</span>
              </button>

              <button
                type="button"
                onClick={onOpenGlossary}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left cursor-pointer flex flex-col justify-center gap-0.5 min-h-[48px]"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200">{t("Footer.glossary_201")}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{t("Footer.finance_strategy_ter_202")}</span>
              </button>

              <button
                type="button"
                onClick={onOpenAICoach}
                className="p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 hover:bg-purple-100/60 dark:hover:bg-purple-900/40 border border-purple-200/80 dark:border-purple-800/60 hover:border-purple-400 dark:hover:border-purple-600 transition-all text-left cursor-pointer flex flex-col justify-center gap-0.5 min-h-[48px]"
              >
                <span className="font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  {t("Footer.socratic_ai_coach_203")}
                </span>
                <span className="text-[11px] text-purple-700 dark:text-purple-300">{t("Footer.tailored_mentorship_204")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-left">
            <span>{t("footer.copyright", "© 2026 Ekonomik Hendek Akademisi")}</span>
            <span>•</span>
            <span className="inline-flex items-center">
              {t("Footer.author_205")}
              <a
                href="https://www.linkedin.com/in/onurınal"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center min-h-11 min-h-[44px] px-2 py-1.5 gap-1 rounded-md"
              >
                Onur İnal
                <Linkedin className="w-3 h-3 inline shrink-0" />
              </a>
            </span>
            <span>•</span>
            <span className="text-[11px]">{t("Footer.open_educational_fin_206")}</span>
          </div>

          <div className="text-[11px] text-center md:text-right text-slate-400 dark:text-slate-500 max-w-lg">
            {t("footer.disclaimer", "Bu platform yalnızca finansal analiz, eğitim ve metodolojik öğrenim amaçlıdır; herhangi bir yatırım tavsiyesi (YTD) niteliği taşımaz.")}
          </div>
        </div>
      </div>
    </footer>
  );
};

