export const formatPercentagePoints = (value: number, locale: string, maximumFractionDigits: number = 1): string => {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    style: "percent",
    minimumFractionDigits: maximumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(value / 100);
};

export const formatUsdFromMillions = (valueInMillions: number, locale: string, maximumFractionDigits: number = 1): string => {
  const formatted = new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: maximumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(valueInMillions);
  
  return locale === "tr" ? `${formatted} Mn $` : `$${formatted}M`;
};

export const formatUsdFromBillions = (valueInBillions: number, locale: string, maximumFractionDigits: number = 1): string => {
  const formatted = new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: maximumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(valueInBillions);
  
  return locale === "tr" ? `${formatted} Mr $` : `$${formatted}B`;
};

export const formatNumber = (value: number, locale: string, fractionDigits: number = 0): string => {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

export const formatMultiplier = (value: number, locale: string, maximumFractionDigits: number = 2): string => {
  const formatted = new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: maximumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(value);
  return `${formatted}x`;
};

export const formatDurationYears = (value: number, locale: string): string => {
  return locale === "tr" ? `${value} yıl` : `${value} years`;
};

export const formatCurrency = (value: number, locale: string): string => {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1
  }).format(value);
};
