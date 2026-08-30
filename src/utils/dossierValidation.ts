import type { CompanyAuditDossier, FinancialMetricInputs } from "../types";

export const MAX_IMPORT_BYTES = 1_000_000;
export const MAX_IMPORT_DOSSIERS = 100;

const levels = new Set(["düşük", "orta", "yüksek"]);
const primaryTypes = new Set(["tüketici_avantajı", "üretim_avantajı", "ölçek_avantajı", "yok"]);
const allocations = new Set(["mükemmel", "ortalama", "kötü"]);
const widths = new Set(["Geniş Hendek (Wide)", "Dar Hendek (Narrow)", "Hendek Yok (None)"]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const safeText = (value: unknown, max = 5_000) => typeof value === "string" && value.length <= max;
const safeNumber = (value: unknown, min: number, max: number) =>
  typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;

function validFinancials(value: unknown): value is FinancialMetricInputs {
  if (!isRecord(value)) return false;
  return safeNumber(value.revenue, 0, 1e15)
    && safeNumber(value.operatingIncome, -1e15, 1e15)
    && safeNumber(value.effectiveTaxRate, -100, 100)
    && safeNumber(value.totalAssets, 0, 1e15)
    && safeNumber(value.cashAndEquivalents, 0, 1e15)
    && safeNumber(value.nonInterestCurrentLiabilities, -1e15, 1e15)
    && safeNumber(value.wacc, -100, 100);
}

export function isValidDossier(value: unknown): value is CompanyAuditDossier {
  if (!isRecord(value)) return false;
  if (!safeText(value.id, 160) || !safeText(value.companyName, 200) || !safeText(value.ticker, 40)) return false;
  if (!safeText(value.industry, 200) || !safeText(value.description, 5_000) || !safeText(value.notes, 20_000)) return false;
  if (!safeText(value.updatedAt, 40) || (value.createdAt !== undefined && !safeText(value.createdAt, 40))) return false;
  if (!validFinancials(value.financials)) return false;

  const industry = value.industryStructure;
  if (!isRecord(industry) || !levels.has(industry.supplierPower as string) || !levels.has(industry.buyerPower as string)
    || !levels.has(industry.threatOfNewEntrants as string) || !levels.has(industry.threatOfSubstitutes as string)
    || !levels.has(industry.industryRivalry as string) || !safeText(industry.profitPoolPosition, 5_000)) return false;

  const advantage = value.competitiveAdvantage;
  if (!isRecord(advantage) || !primaryTypes.has(advantage.primaryType as string)
    || !Array.isArray(advantage.subDrivers) || advantage.subDrivers.length > 30
    || !advantage.subDrivers.every((item) => safeText(item, 200))
    || !safeText(advantage.pricingPowerEvidence, 10_000) || !safeText(advantage.costAdvantageEvidence, 10_000)) return false;

  const discipline = value.interactionAndDiscipline;
  if (!isRecord(discipline) || !levels.has(discipline.capacityDiscipline as string)
    || !levels.has(discipline.priceWarRisk as string) || !allocations.has(discipline.managementCapitalAllocation as string)) return false;

  const sustainability = value.sustainability;
  if (!isRecord(sustainability) || !safeNumber(sustainability.estimatedCapYears, 0, 100)
    || !widths.has(sustainability.moatWidth as string) || !safeText(sustainability.keyVulnerability, 10_000)) return false;

  if (value.lastStep !== undefined && ![1, 2, 3, 4, 5].includes(value.lastStep as number)) return false;
  if (value.tags !== undefined && (!Array.isArray(value.tags) || value.tags.length > 30 || !value.tags.every((item) => safeText(item, 100)))) return false;
  return true;
}

export function validateImportedDossiers(value: unknown): { dossiers: CompanyAuditDossier[]; error?: string } {
  const items = Array.isArray(value) ? value : [value];
  if (items.length === 0) return { dossiers: [], error: "empty" };
  if (items.length > MAX_IMPORT_DOSSIERS) return { dossiers: [], error: "too_many" };
  if (!items.every(isValidDossier)) return { dossiers: [], error: "invalid" };
  return { dossiers: items.map((item) => structuredClone(item)) };
}
