import { calculateFinancialOutputs } from "./src/data/companyAuditData";

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
      roicPercent: 999.9, // Capped
      spread: 989.9,
      isCreatingValue: true,
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
      spread: -10,
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
  if (result.isCreatingValue !== tc.expected.isCreatingValue) { console.error(`[${tc.name}] isCreatingValue mismatch: expected ${tc.expected.isCreatingValue}, got ${result.isCreatingValue}`); pass = false; }

  if (pass) {
    console.log(`✅ ${tc.name} PASSED`);
  } else {
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n❌ ${failed} test(s) failed.`);
  process.exit(1);
} else {
  console.log("\n🎉 All financial calculation tests passed!");
}
