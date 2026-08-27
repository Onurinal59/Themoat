import React from "react";

interface MathFormulaProps {
  equation: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Tokenizes a mathematical formula string and renders it with LaTeX-like typography:
 * - Variables/words are rendered in serif italics
 * - Numbers, brackets, and operators (+, -, ×, ÷, /, =, etc.) are rendered upright (not-italic)
 * - Academic paper / blackboard background styling with shadow-inner
 */
export const MathFormula: React.FC<MathFormulaProps> = ({
  equation,
  className = "",
  size = "lg",
}) => {
  const lines = equation.split("\n").filter((l) => l.trim().length > 0);

  // Helper to render individual tokens with correct mathematical formatting
  const renderFormulaToken = (token: string, idx: number) => {
    if (!token) return null;

    // Whitespace
    if (/^\s+$/.test(token)) {
      return <span key={idx}> </span>;
    }

    // Operators and mathematical symbols: upright / non-italic
    if (/^[+\-×*÷\/=(),\[\]{}:><%^]+$/.test(token)) {
      return (
        <span
          key={idx}
          className="not-italic font-normal mx-1 text-slate-500 dark:text-slate-400 select-none"
        >
          {token === "*" ? "×" : token}
        </span>
      );
    }

    // Pure numbers or percentages
    if (/^[\d.,]+%?$/.test(token)) {
      return (
        <span
          key={idx}
          className="not-italic font-mono font-medium text-slate-700 dark:text-slate-300"
        >
          {token}
        </span>
      );
    }

    // Subscript token handler (e.g., Ke -> K_e, Kd -> K_d, W_E, W_D)
    if (/^(K[ed]|W_[ED]|R_f|CFO|CFI|CFF)$/i.test(token)) {
      if (token.startsWith("K") && token.length === 2) {
        return (
          <span key={idx} className="italic font-serif font-semibold text-slate-900 dark:text-slate-100">
            K<sub className="not-italic font-sans text-xs -bottom-1 text-indigo-700 dark:text-amber-300 font-bold">{token[1].toLowerCase()}</sub>
          </span>
        );
      }
    }

    // General variables (WACC, ROIC, NOPAT, E, V, t, Spread, etc.)
    return (
      <span
        key={idx}
        className="italic font-serif font-medium tracking-wide text-slate-900 dark:text-slate-100"
      >
        {token}
      </span>
    );
  };

  // Helper to render tokens with correct italicization
  const renderFormulaLine = (line: string) => {
    // Regex splits by operators, parentheses, brackets, equal signs, and whitespace while keeping delimiters
    const tokens = line.split(/([+\-×*÷\/=(),\[\]{}:><%^]|\s+)/g);
    return tokens.map((token, idx) => renderFormulaToken(token, idx));
  };

  const sizeClasses = {
    sm: "font-serif text-lg sm:text-xl tracking-wide",
    md: "font-serif text-xl sm:text-2xl tracking-wider",
    lg: "font-serif text-2xl sm:text-3xl tracking-widest text-slate-800 dark:text-slate-100",
  }[size];

  return (
    <div
      className={`rounded-2xl p-4 sm:p-6 bg-slate-100/90 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 shadow-inner ring-1 ring-slate-400/20 dark:ring-slate-700/40 text-center select-all transition-all duration-300 overflow-x-auto ${className}`}
    >
      <div className="space-y-3">
        {lines.map((line, lIdx) => (
          <div
            key={lIdx}
            className={`${sizeClasses} flex items-center justify-center flex-wrap gap-y-1.5 leading-relaxed`}
          >
            {renderFormulaLine(line)}
          </div>
        ))}
      </div>
    </div>
  );
};

