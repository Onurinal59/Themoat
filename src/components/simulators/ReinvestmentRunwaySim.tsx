import React, { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  Layers,
  Sparkles,
  Sliders,
  Award,
  ArrowRight,
  Info,
  DollarSign,
  Percent,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";

export const ReinvestmentRunwaySim: React.FC = () => {
  const { isEnglish } = useLanguage();

  // Company A: High ROIC, Low Reinvestment (e.g. See's Candies / Pure Cash Cow)
  const [compARoic, setCompARoic] = useState<number>(45);
  const [compAReinvest, setCompAReinvest] = useState<number>(10); // %
  
  // Company B: Moderate ROIC, High Reinvestment Runway (e.g. Costco / Amazon / Walmart in 1990s)
  const [compBRoic, setCompBRoic] = useState<number>(18);
  const [compBReinvest, setCompBReinvest] = useState<number>(80); // %

  const [wacc, setWacc] = useState<number>(9.0);
  const [initialCapital, setInitialCapital] = useState<number>(100); // $M

  // Simulate 15 years for both companies
  const simulationYears = 15;
  
  let capA = initialCapital;
  let capB = initialCapital;
  
  const simulationData = [];

  for (let yr = 1; yr <= simulationYears; yr++) {
    // Company A
    const nopatA = capA * (compARoic / 100);
    const reinvestedA = nopatA * (compAReinvest / 100);
    const fcfA = nopatA - reinvestedA;
    const epA = capA * ((compARoic - wacc) / 100);
    capA += reinvestedA;

    // Company B
    const nopatB = capB * (compBRoic / 100);
    const reinvestedB = nopatB * (compBReinvest / 100);
    const fcfB = nopatB - reinvestedB;
    const epB = capB * ((compBRoic - wacc) / 100);
    capB += reinvestedB;

    simulationData.push({
      year: `${yr}. ${isEnglish ? "Yr" : "Yıl"}`,
      yearNum: yr,
      nopatA: Number(nopatA.toFixed(1)),
      nopatB: Number(nopatB.toFixed(1)),
      epA: Number(epA.toFixed(1)),
      epB: Number(epB.toFixed(1)),
      capA: Number(capA.toFixed(1)),
      capB: Number(capB.toFixed(1)),
    });
  }

  const finalYear = simulationData[simulationData.length - 1];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-900/10 border border-indigo-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-wider mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              {isEnglish ? "The Triad: Spread × Reinvestment Runway" : "Bileşik Büyüme: Yayılım × Yeniden Yatırım Pisti"}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isEnglish ? "High ROIC Cash Cow vs. Reinvestment Compounding Engine" : "Yüksek ROIC Nakit İneği vs. Yeniden Yatırım Makinesi"}
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {isEnglish
                ? "Michael Mauboussin emphasizes that value is created not just by ROIC, but by the volume of capital reinvested at high returns. See how a moderate ROIC company with massive reinvestment runway eclipses a static high-ROIC cash cow."
                : "Michael Mauboussin'in altını çizdiği gibi; zenginlik sadece ROIC yüzdesinden değil, o getiriyle yeniden yatırılabilen sermaye hacminden (Reinvestment Runway) doğar. %18 ROIC ile kârının %80'ini yatıran şirketin, %45 ROIC'li durağan bir şirketi nasıl katladığını görün."}
            </p>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company A Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              {isEnglish ? "Company A (High ROIC, Low Runway)" : "Şirket A (Yüksek ROIC, Düşük Pist)"}
            </h3>
            <span className="text-xs font-bold text-slate-500">Örn: See's Candies</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">ROIC (%)</span>
              <span className="font-black text-rose-500 font-mono">%{compARoic}</span>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              value={compARoic}
              onChange={(e) => setCompARoic(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? "Reinvestment Rate (%)" : "Yeniden Yatırım Oranı (%)"}
              </span>
              <span className="font-black text-slate-900 dark:text-white font-mono">%{compAReinvest}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={compAReinvest}
              onChange={(e) => setCompAReinvest(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>

        {/* Company B Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              {isEnglish ? "Company B (Moderate ROIC, Huge Runway)" : "Şirket B (Orta ROIC, Devasa Pist)"}
            </h3>
            <span className="text-xs font-bold text-slate-500">Örn: Costco / Walmart 1990</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">ROIC (%)</span>
              <span className="font-black text-emerald-500 font-mono">%{compBRoic}</span>
            </div>
            <input
              type="range"
              min="10"
              max="30"
              value={compBRoic}
              onChange={(e) => setCompBRoic(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? "Reinvestment Rate (%)" : "Yeniden Yatırım Oranı (%)"}
              </span>
              <span className="font-black text-slate-900 dark:text-white font-mono">%{compBReinvest}</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={compBReinvest}
              onChange={(e) => setCompBReinvest(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-base">
              {isEnglish ? "15-Year Annual Net Operating Profit (NOPAT) Comparison" : "15 Yıllık Yıllık Net Faaliyet Kârı (NOPAT) Yarışı"}
            </h3>
            <p className="text-xs text-slate-500">
              {isEnglish ? "Observe where Company B's reinvestment compounding crosses and overtakes Company A" : "Şirket B'nin bileşik sermaye büyümesiyle Şirket A'yı ne zaman geçtiğini izleyin"}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-rose-500">
              <span className="w-3 h-3 rounded-sm bg-rose-500" />
              {isEnglish ? "Company A NOPAT ($M)" : "Şirket A Kârı ($M)"}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              {isEnglish ? "Company B NOPAT ($M)" : "Şirket B Kârı ($M)"}
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={simulationData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="p-3 rounded-xl bg-slate-900 text-white text-xs border border-slate-700 shadow-xl space-y-1">
                        <p className="font-bold text-slate-300">{d.year}</p>
                        <p className="text-rose-400 font-mono">Şirket A NOPAT: ${d.nopatA}M (Sermaye: ${d.capA}M)</p>
                        <p className="text-emerald-400 font-mono">Şirket B NOPAT: ${d.nopatB}M (Sermaye: ${d.capB}M)</p>
                        <p className="text-amber-300 font-bold border-t border-slate-800 pt-1">
                          Şirket B Ekonomik Kârı: ${d.epB}M vs A: ${d.epA}M
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="nopatA" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="nopatB" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 15-Year Takeaway Summary */}
        <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                {isEnglish ? "15-Year NOPAT Outcome" : "15. Yılın Sonunda Kâr Hacmi"}
              </span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {isEnglish
                  ? `Company B generates $${finalYear?.nopatB}M/yr vs Company A's $${finalYear?.nopatA}M/yr.`
                  : `Şirket B yılda $${finalYear?.nopatB}M kâr üretirken, Şirket A sadece $${finalYear?.nopatA}M kârda kalmıştır.`}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                {isEnglish ? "Key Moat Takeaway" : "Temel Hendek Çıkarımı"}
              </span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {isEnglish
                  ? "Reinvestment runway is the multiplier of a moat. Never settle for high ROIC alone if there is nowhere to put the capital."
                  : "Yeniden yatırım pisti, hendeğin çarpanıdır. Parayı büyütecek yer olmadıkça tek başına yüksek ROIC dev bir servet yaratamaz."}
              </p>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 italic pt-1 border-t border-indigo-500/10">
            {isEnglish
              ? "Illustrative teaching scenario — figures are not current company estimates or investment views."
              : "Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir."}
          </p>
        </div>
      </div>
    </div>
  );
};
