export const formatPercent = (value: number, locale: string, fractionDigits: number = 1): string => {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value / 100);
};

export const formatCurrency = (value: number, locale: string, currency: string = "USD"): string => {
  if (value === 0) return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", { style: "currency", currency, minimumFractionDigits: 0 }).format(0);
  
  if (locale === "tr") {
    // Turkish compact notation often uses "mn" or "milyar" but standard Intl provides "B" and "Mn".
    // "compact" notation in tr-TR Intl.NumberFormat for USD gives "$700 Mn" or similar.
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency,
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1
    }).format(value);
  }
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1
  }).format(value);
};

export const formatNumber = (value: number, locale: string, fractionDigits: number = 0): string => {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

export const formatDuration = (minutes: number, locale: string): string => {
  return locale === "tr" ? `${minutes} dk` : `${minutes} min`;
};
