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
import { calculateFinancialOutputs, computeMoatScore, translateMoatDriver } from "../data/companyAuditData";
import { useLanguage } from "../context/LanguageContext";

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
  const { isEnglish } = useLanguage();
  const fin = calculateFinancialOutputs(dossier.financials);
  const score = computeMoatScore(dossier);

  // Generate 3 contextual challenges based on the dossier inputs
  const challenges: CommitteeChallenge[] = [
    {
      id: "challenge-1",
      theme: isEnglish
        ? "1. Skepticism: Mean Reversion Risk (ROIC Erosion)"
        : "1. Şüphe: Kârlılığın Ortalamaya Dönüşü (Mean Reversion Risk)",
      question: isEnglish
        ? `${dossier.companyName}'s ROIC of ${fin.roicPercent}% is well above normal levels. In microeconomic theory, supernormal returns attract competitive capital like a magnet. What concrete barrier stops new entrants from discounting prices and driving ROIC down to ${dossier.financials.wacc}% within 3-5 years?`
        : `${dossier.companyName}'in %${fin.roicPercent} seviyesindeki ROIC oranı sektör ortalamasının çok üzerinde. Ekonomik teoride yüksek kârlar rakipleri bir mıknatıs gibi çeker. Yeni girenlerin fiyat kırarak bu kârı 3 yıl içinde %${dossier.financials.wacc} seviyesine indirmesini engelleyecek tek somut bariyer nedir?`,
      skepticalReasoning: isEnglish
        ? "Empirical market data shows over 80% of high-ROIC firms mean-revert toward the cost of capital within 5 years."
        : "Tarihsel veriler şirketlerin %80'inin 5 yıl içinde ortalama getiriye gerilediğini göstermektedir.",
    },
    {
      id: "challenge-2",
      theme: isEnglish
        ? "2. Skepticism: Pricing Power & WTP / AI Disruption"
        : "2. Şüphe: Fiyatlama Gücü ve Tüketici İkamesi (WTP Erosion)",
      question: isEnglish
        ? `Your thesis claims ${dossier.competitiveAdvantage.primaryType === "tüketici_avantajı" ? "consumer differentiation and high pricing power" : "low-cost scale leadership"}. Under inflationary pressure or cheap AI substitutes, why wouldn't price-sensitive buyers migrate to alternatives?`
        : `Analizinizde ${dossier.competitiveAdvantage.primaryType === "tüketici_avantajı" ? "tüketici avantajını ve fiyatlama gücünü" : "maliyet liderliğini"} öne sürmüşsünüz. Enflasyonist bir ortamda veya ucuz dijital/yapay zeka ikameleri ortaya çıktığında müşteriler neden %10-15 daha pahalıya bu şirketten almaya devam etsin?`,
      skepticalReasoning: isEnglish
        ? "Customer loyalty is frequently an illusion until a friction-free, 30% cheaper alternative hits the market."
        : "Müşteri sadakati genellikle sadece daha ucuz bir alternatif çıkana kadar sürer.",
    },
    {
      id: "challenge-3",
      theme: isEnglish
        ? "3. Skepticism: Capital Allocation & CAP Period Integrity"
        : "3. Şüphe: Sermaye Tahsisi & CAP Süresi Gerçekçiliği",
      question: isEnglish
        ? `You projected a ${dossier.sustainability.estimatedCapYears}-year Competitive Advantage Period (CAP). If management misallocates excess free cash flow into expensive acquisitions or empire building (Value Destruction), how is this moat defended?`
        : `${dossier.sustainability.estimatedCapYears} yıllık bir Rekabetçi Avantaj Dönemi (CAP) öngörmüşsünüz. Yönetim kurulu biriken serbest nakit akımını pahalı satın almalarla veya kârsız projelerle heba ederse (Değer Yıkımı) bu hendek nasıl korunacak?`,
      skepticalReasoning: isEnglish
        ? "More economic moats are destroyed by poor capital allocation (overpriced M&A) than by direct competitor entry."
        : "Pek çok geniş hendekli şirket kötü sermaye dağıtımı (kötü M&A) yüzünden değer yok etmiştir.",
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

  const handleTextChange = (id: string, text: string) => {
    setResponses((prev) => ({ ...prev, [id]: text }));
  };

  const handleEvaluateDefense = async () => {
    setIsEvaluating(true);
    try {
      const allText = Object.values(responses).join(" ");
      const hasLength = allText.trim().length > 60;

      const defenseScore = hasLength ? Math.min(95, 70 + Math.floor(allText.length / 25)) : 55;
      const verdict = isEnglish
        ? defenseScore >= 80
          ? "APPROVED (Wide Moat Confirmed)"
          : defenseScore >= 65
          ? "CONDITIONAL APPROVAL (Narrow Moat)"
          : "FURTHER SCRUTINY REQUIRED"
        : defenseScore >= 80
        ? "ONAYLANDI (Geniş Hendek Onayı)"
        : defenseScore >= 65
        ? "ŞARTLI ONAY (Dar Hendek)"
        : "EK İNCELEME GEREKLİ";

      const formattedDrivers = dossier.competitiveAdvantage.subDrivers
        .map((d) => translateMoatDriver(d, isEnglish))
        .join(", ");

      const feedback = isEnglish
        ? hasLength
          ? `The Investment Committee reviewed your defense. The arguments defending ${formattedDrivers || "competitive moats"} are supported by historical economic spread (ROIC ${fin.roicPercent}% vs WACC ${dossier.financials.wacc}%). Thesis approved.`
          : `The Committee found the defense arguments too brief and generic. Please substantiate switching costs and pricing power with quantitative evidence.`
        : hasLength
        ? `Yatırım Komitesi analizinizi inceledi. Şirketin ${formattedDrivers || "hendek"} savunmaları makul bulundu. ROIC (%${fin.roicPercent}) ve WACC (%${dossier.financials.wacc}) yayılımı neticesinde tez kabul edildi.`
        : `Komite, verilen savunma cevaplarını çok kısa ve yüzeysel buldu. Lütfen geçiş maliyeti ve fiyatlama gücü kanıtlarını daha somut örneklerle destekleyin.`;

      // simulate evaluation brief delay
      await new Promise((res) => setTimeout(res, 800));
      setEvaluationResult({ defenseScore, verdict, feedback });
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
                    {isEnglish ? "Investment Committee Simulation" : "Yatırım Komitesi Simülasyonu"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-300 font-mono">
                    {dossier.ticker} — {dossier.companyName}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {isEnglish ? "Devil's Advocate: Defend Your Investment Thesis" : "Şeytanın Avukatı (Devil's Advocate): Tezinizi Savunun"}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-2xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                <strong>{isEnglish ? "🏛️ Committee Notice:" : "🏛️ Komite Bildirisi:"}</strong>{" "}
                {isEnglish
                  ? "As an analyst, your duty is not to be a company cheerleader. Your rigorous defense against these 3 skeptical challenges will determine if this moat is genuinely durable."
                  : "Bir analist olarak göreviniz sadece şirketi övmek değildir. Aşağıdaki 3 kuşkucu soruya vereceğiniz analitik yanıtlar, tezinizin sağlamlığını belirleyecektir."}
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
                        💡 <em>{isEnglish ? "Committee Rationale: " : "Komitenin Gerekçesi: "}{c.skepticalReasoning}</em>
                      </p>
                    </div>

                    {/* Input Text Area */}
                    <div>
                      <textarea
                        rows={3}
                        value={responses[c.id]}
                        onChange={(e) => handleTextChange(c.id, e.target.value)}
                        placeholder={
                          isEnglish
                            ? "Type your analytical thesis and evidence here..."
                            : "Tezinizi ve şirket içi somut savunma kanıtlarınızı buraya yazın..."
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
                        {isEnglish ? "Committee Verdict" : "Komite Kararı"}
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
                        {isEnglish ? "Defense Strength" : "Savunma Gücü"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-slate-900/60 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900">
                    {evaluationResult.feedback}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                {isEnglish ? "Close" : "Kapat"}
              </button>

              <button
                onClick={handleEvaluateDefense}
                disabled={isEvaluating}
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>
                  {isEvaluating
                    ? isEnglish
                      ? "Evaluating..."
                      : "Komite İnceliyor..."
                    : isEnglish
                    ? "Submit Defense to Committee & Score"
                    : "Savunmayı Komiteye Sun & Puanla"}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
