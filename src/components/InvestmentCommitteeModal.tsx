import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  HelpCircle,
  Sparkles,
  Send,
  CheckCircle2,
  X,
  Award,
  AlertTriangle,
  FileCheck,
  ChevronRight,
  RotateCcw
} from "lucide-react";
import { CompanyAuditDossier } from "../types";
import { calculateFinancialOutputs, translateMoatDriver } from "../data/companyAuditData";
import { useLanguage } from "../context/LanguageContext";
import { useAccessibleDialog } from "../hooks/useAccessibleDialog";

interface InvestmentCommitteeModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossier: CompanyAuditDossier;
  onAskAICoach?: (prompt: string) => void;
}

interface CommitteeChallenge {
  id: string;
  theme: string;
  question: string;
  skepticalReasoning: string;
}

export const InvestmentCommitteeModal: React.FC<InvestmentCommitteeModalProps> = ({
  isOpen,
  onClose,
  dossier,
  onAskAICoach,
}) => {
  const { isEnglish, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();
  const fin = calculateFinancialOutputs(dossier.financials);

  // Generate 3 contextual challenges based on the dossier inputs
  const challenges: CommitteeChallenge[] = [
    {
      id: "challenge-1",
      theme: t("InvestmentCommitteeModal.1_skepticism_mean_re_405"),
      question: fin.isRoicMeaningful
        ? (isEnglish
          ? `${dossier.companyName}'s ROIC of ${fin.roicPercent}% is well above normal levels. What concrete barrier stops new entrants from driving ROIC down to ${dossier.financials.wacc}% within 3-5 years?`
          : `${dossier.companyName}'in %${fin.roicPercent} seviyesindeki ROIC oranı yüksek. Yeni girenlerin getiriyi 3-5 yıl içinde %${dossier.financials.wacc} seviyesine indirmesini engelleyecek somut bariyer nedir?`)
        : (isEnglish
          ? `${dossier.companyName}'s invested capital is zero or negative, so ROIC is not meaningful. What operating evidence demonstrates an economic moat without relying on the ROIC ratio?`
          : `${dossier.companyName}'in yatırılan sermayesi sıfır veya negatif olduğu için ROIC anlamlı değil. ROIC oranına dayanmadan ekonomik hendeği hangi faaliyet kanıtları gösteriyor?`),
      skepticalReasoning: t("InvestmentCommitteeModal.empirical_market_dat_406"),
    },
    {
      id: "challenge-2",
      theme: t("InvestmentCommitteeModal.2_skepticism_pricing_407"),
      question: isEnglish
        ? `Your thesis claims ${dossier.competitiveAdvantage.primaryType === "tüketici_avantajı" ? "consumer differentiation and high pricing power" : "low-cost scale leadership"}. Under inflationary pressure or cheap AI substitutes, why wouldn't price-sensitive buyers migrate to alternatives?`
        : `Analizinizde ${dossier.competitiveAdvantage.primaryType === "tüketici_avantajı" ? "tüketici avantajını ve fiyatlama gücünü" : "maliyet liderliğini"} öne sürmüşsünüz. Enflasyonist bir ortamda veya ucuz dijital/yapay zeka ikameleri ortaya çıktığında müşteriler neden %10-15 daha pahalıya bu şirketten almaya devam etsin?`,
      skepticalReasoning: t("InvestmentCommitteeModal.customer_loyalty_is_408"),
    },
    {
      id: "challenge-3",
      theme: t("InvestmentCommitteeModal.3_skepticism_capital_409"),
      question: isEnglish
        ? `You projected a ${dossier.sustainability.estimatedCapYears}-year Competitive Advantage Period (CAP). If management misallocates excess free cash flow into expensive acquisitions or empire building (Value Destruction), how is this moat defended?`
        : `${dossier.sustainability.estimatedCapYears} yıllık bir Rekabetçi Avantaj Dönemi (CAP) öngörmüşsünüz. Yönetim kurulu biriken serbest nakit akımını pahalı satın almalarla veya kârsız projelerle heba ederse (Değer Yıkımı) bu hendek nasıl korunacak?`,
      skepticalReasoning: t("InvestmentCommitteeModal.more_economic_moats_410"),
    },
  ];

  const [responses, setResponses] = useState<Record<string, string>>({
    "challenge-1": "",
    "challenge-2": "",
    "challenge-3": "",
  });

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    defenseScore: number;
    verdict: string;
    feedback: string;
  } | null>(null);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);
  const dialogRef = useAccessibleDialog(isOpen, onClose);

  const handleTextChange = (id: string, text: string) => {
    setResponses((prev) => ({ ...prev, [id]: text }));
  };

  const handleEvaluateDefense = async () => {
    setIsEvaluating(true);
    setEvaluationError(null);
    setEvaluationResult(null);
    try {
      const formattedDrivers = dossier.competitiveAdvantage.subDrivers
        .map((d) => translateMoatDriver(d, isEnglish))
        .join(", ");
      const response = await fetch("/api/evaluate-defense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: `${dossier.companyName} (${dossier.ticker})`,
          financialSummary: {
            roic: fin.isRoicMeaningful ? fin.roicPercent : "not meaningful",
            wacc: dossier.financials.wacc,
            spread: fin.isRoicMeaningful ? fin.spread : "not meaningful",
            capYears: dossier.sustainability.estimatedCapYears,
          },
          moatDrivers: formattedDrivers,
          responses: challenges.map((challenge) => responses[challenge.id]),
          language: isEnglish ? "en" : "tr",
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "evaluation_failed");
      const verdictLabels = isEnglish
        ? { approved: "APPROVED", conditional: "CONDITIONAL APPROVAL", revise: "FURTHER SCRUTINY REQUIRED" }
        : { approved: "ONAYLANDI", conditional: "ŞARTLI ONAY", revise: "EK İNCELEME GEREKLİ" };
      setEvaluationResult({ defenseScore: data.defenseScore, verdict: verdictLabels[data.verdict as keyof typeof verdictLabels], feedback: data.feedback });
    } catch (error) {
      console.error("Committee evaluation failed", error);
      setEvaluationError(isEnglish
        ? "The AI committee could not evaluate the defense. Check that every answer has at least 30 characters and try again."
        : "AI komitesi savunmayı değerlendiremedi. Her yanıtın en az 30 karakter olduğundan emin olup tekrar dene.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="committee-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 text-slate-800 dark:text-white">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />{" "}
                    {t("InvestmentCommitteeModal.investment_committee_411")}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-300 font-mono">
                    {dossier.ticker} — {dossier.companyName}
                  </span>
                </div>
                <h2 id="committee-title" className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {t("InvestmentCommitteeModal.devil_s_advocate_def_412")}
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label={t("audit.closeCommittee")}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-2xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                <strong>{t("InvestmentCommitteeModal.committee_notice_413")}</strong>{" "}
                {t("InvestmentCommitteeModal.as_an_analyst_your_d_414")}
              </div>

              {/* 3 Challenge Boxes */}
              <div className="space-y-6">
                {challenges.map((c) => (
                  <div
                    key={c.id}
                    className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 space-y-3"
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                        {c.theme}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                        {c.question}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        💡 <em>{t("InvestmentCommitteeModal.committee_rationale_415")}{c.skepticalReasoning}</em>
                      </p>
                    </div>

                    {/* Input Text Area */}
                    <div>
                      <textarea
                        aria-label={`${c.theme}: ${c.question}`}
                        maxLength={1800}
                        rows={3}
                        value={responses[c.id]}
                        onChange={(e) => handleTextChange(c.id, e.target.value)}
                        placeholder={
                          t("InvestmentCommitteeModal.type_your_analytical_416")
                        }
                        className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Evaluation Result Box */}
              {evaluationResult && (
                <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                        {t("InvestmentCommitteeModal.committee_verdict_417")}
                      </span>
                      <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
                        {evaluationResult.verdict}
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                        {evaluationResult.defenseScore}
                        <span className="text-xs text-slate-400 font-normal">/100</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {t("InvestmentCommitteeModal.defense_strength_418")}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-slate-900/60 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900">
                    {evaluationResult.feedback}
                  </p>
                </div>
              )}
              {evaluationError && <p role="alert" className="text-xs text-rose-600 dark:text-rose-400">{evaluationError}</p>}
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {t("audit.committeePrivacy")}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                {t("InvestmentCommitteeModal.close_419")}
              </button>

              <button
                onClick={handleEvaluateDefense}
                disabled={isEvaluating}
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>
                  {isEvaluating
                    ? t("InvestmentCommitteeModal.evaluating_420")
                    : t("InvestmentCommitteeModal.submit_defense_to_co_421")}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
