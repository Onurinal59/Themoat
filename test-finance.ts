import { calculateFinancialOutputs, computeMoatScore, INITIAL_PRESET_DOSSIERS } from "./src/data/companyAuditData";
import { toLocalDateKey } from "./src/utils/date";
import { validateImportedDossiers } from "./src/utils/dossierValidation";

const testCases = [
  {
    name: "Standard Profitable Company",
    inputs: {
      revenue: 1000,
      operatingIncome: 200,
      effectiveTaxRate: 20, // 20%
      totalAssets: 1500,
      cashAndEquivalents: 200,
      nonInterestCurrentLiabilities: 300,
      wacc: 10,
    },
    expected: {
      nopat: 160,
      investedCapital: 1000,
      roicPercent: 16.0,
      spread: 6.0,
      isRoicMeaningful: true,
      isCreatingValue: true,
    }
  },
  {
    name: "Negative Invested Capital (e.g. historical Amazon/Domino's)",
    inputs: {
      revenue: 5000,
      operatingIncome: 500,
      effectiveTaxRate: 20, // 20%
      totalAssets: 2000,
      cashAndEquivalents: 500,
      nonInterestCurrentLiabilities: 2000, // Operating Assets 1500, NonIntLiab 2000 => Invested Capital -500
      wacc: 10,
    },
    expected: {
      nopat: 400,
      investedCapital: -500,
      roicPercent: 0,
      spread: 0,
      isRoicMeaningful: false,
      isCreatingValue: false,
    }
  },
  {
    name: "Negative Invested Capital with Negative NOPAT",
    inputs: {
      revenue: 5000,
      operatingIncome: -500,
      effectiveTaxRate: 0, 
      totalAssets: 2000,
      cashAndEquivalents: 500,
      nonInterestCurrentLiabilities: 2000,
      wacc: 10,
    },
    expected: {
      nopat: -500,
      investedCapital: -500,
      roicPercent: 0,
      spread: 0,
      isRoicMeaningful: false,
      isCreatingValue: false,
    }
  }
];

let failed = 0;

console.log("Running Financial Regression Tests...\n");

for (const tc of testCases) {
  const result = calculateFinancialOutputs(tc.inputs as any);
  let pass = true;

  if (result.nopat !== tc.expected.nopat) { console.error(`[${tc.name}] NOPAT mismatch: expected ${tc.expected.nopat}, got ${result.nopat}`); pass = false; }
  if (result.investedCapital !== tc.expected.investedCapital) { console.error(`[${tc.name}] Invested Capital mismatch: expected ${tc.expected.investedCapital}, got ${result.investedCapital}`); pass = false; }
  if (result.roicPercent !== tc.expected.roicPercent) { console.error(`[${tc.name}] ROIC mismatch: expected ${tc.expected.roicPercent}, got ${result.roicPercent}`); pass = false; }
  if (result.spread !== tc.expected.spread) { console.error(`[${tc.name}] Spread mismatch: expected ${tc.expected.spread}, got ${result.spread}`); pass = false; }
  if (result.isRoicMeaningful !== tc.expected.isRoicMeaningful) { console.error(`[${tc.name}] isRoicMeaningful mismatch: expected ${tc.expected.isRoicMeaningful}, got ${result.isRoicMeaningful}`); pass = false; }
  if (result.isCreatingValue !== tc.expected.isCreatingValue) { console.error(`[${tc.name}] isCreatingValue mismatch: expected ${tc.expected.isCreatingValue}, got ${result.isCreatingValue}`); pass = false; }

  if (pass) {
    console.log(`✅ ${tc.name} PASSED`);
  } else {
    failed++;
  }
}

const localDate = new Date(2026, 0, 2, 0, 30);
if (toLocalDateKey(localDate) !== "2026-01-02") {
  console.error("[Local date key] expected 2026-01-02");
  failed++;
} else {
  console.log("✅ Local date key PASSED");
}

const nonMeaningfulDossier = structuredClone(INITIAL_PRESET_DOSSIERS[0]);
nonMeaningfulDossier.financials.totalAssets = 100;
nonMeaningfulDossier.financials.cashAndEquivalents = 100;
nonMeaningfulDossier.financials.nonInterestCurrentLiabilities = 50;
const nonMeaningfulScore = computeMoatScore(nonMeaningfulDossier);
if (!nonMeaningfulScore.summaryTags.some((tag) => tag.includes("ROIC N/M"))) {
  console.error("[Moat score] non-meaningful ROIC was not identified");
  failed++;
} else {
  console.log("✅ Non-meaningful ROIC scoring PASSED");
}

const invalidImport = validateImportedDossiers({ companyName: "Incomplete" });
if (!invalidImport.error) {
  console.error("[Import validation] incomplete dossier was accepted");
  failed++;
} else {
  console.log("✅ Import schema validation PASSED");
}

if (failed > 0) {
  console.error(`\n❌ ${failed} test(s) failed.`);
  process.exit(1);
} else {
  console.log("\n🎉 All financial calculation tests passed!");
}
