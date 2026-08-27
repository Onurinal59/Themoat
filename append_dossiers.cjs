const fs = require('fs');

const thyTr = `
  {
    id: "thy-dossier",
    companyName: "Türk Hava Yolları (THY)",
    ticker: "THYAO (BIST)",
    industry: "Havacılık & Ulaştırma",
    description: "Yüksek sermaye yoğunluğuna sahip, döngüsel havacılık sektöründe geniş uçuş ağı ile öne çıkan küresel bayrak taşıyıcısı.",
    financials: { revenue: 550000, operatingIncome: 65000, effectiveTaxRate: 20, totalAssets: 1100000, cashAndEquivalents: 150000, nonInterestCurrentLiabilities: 200000, wacc: 30 },
    industryStructure: { supplierPower: "yüksek", buyerPower: "orta", threatOfNewEntrants: "düşük", threatOfSubstitutes: "orta", industryRivalry: "yüksek", profitPoolPosition: "Yoğun rekabet ve yüksek sabit maliyetler nedeniyle döngüsel kârlılık halkası." },
    competitiveAdvantage: { primaryType: "ölçek_avantajı", subDrivers: ["Ağ Etkisi", "Ölçek Ekonomisi"], pricingPowerEvidence: "Yoğun rekabet ve elastik talep (fiyata duyarlı müşteri) nedeniyle fiyatlama gücü sınırlıdır.", costAdvantageEvidence: "Geniş uçuş ağı sabit maliyetleri dağıtır ancak yakıt ve uçak finansmanı maliyetleri dışsaldır." },
    interactionAndDiscipline: { capacityDiscipline: "orta", priceWarRisk: "yüksek", managementCapitalAllocation: "yüksek_riskli" },
    sustainability: { estimatedCapYears: 5, keyVulnerability: "Yakıt fiyatları, jeopolitik riskler ve makroekonomik krizler." },
    isCustom: false, createdAt: "2026-08-22", updatedAt: "2026-08-22",
    notes: "Havacılık sektörü tarihsel olarak 'değer yok edici' veya çok dar hendekli bir sektördür. Rekabet sert, sabit maliyetler çok yüksektir."
  },`;

const cokeTr = `
  {
    id: "cocacola-dossier",
    companyName: "Coca-Cola",
    ticker: "KO (NYSE)",
    industry: "İçecek & Hızlı Tüketim (FMCG)",
    description: "Dünyanın en güçlü marka değerlerinden birine sahip, şurup satışı ve şişeleme ağıyla yüksek kâr marjlı içecek devi.",
    financials: { revenue: 45000, operatingIncome: 13500, effectiveTaxRate: 21, totalAssets: 97000, cashAndEquivalents: 13000, nonInterestCurrentLiabilities: 20000, wacc: 8 },
    industryStructure: { supplierPower: "düşük", buyerPower: "orta", threatOfNewEntrants: "düşük", threatOfSubstitutes: "orta", industryRivalry: "orta", profitPoolPosition: "Marka gücü sayesinde kâr havuzunun aslan payını (şurup üretimi) elinde tutan lider pozisyon." },
    competitiveAdvantage: { primaryType: "tüketici_avantajı", subDrivers: ["Marka/Arama Maliyeti", "Ölçek Ekonomisi"], pricingPowerEvidence: "Enflasyonist dönemlerde ürün fiyatlarını satış hacmi kaybetmeden artırabilme kanıtı.", costAdvantageEvidence: "Şişeleme operasyonlarını (düşük marjlı) dışarı aktarıp sadece konsantre şurup (yüksek marj) satarak sermaye hafif bir model kurmuştur." },
    interactionAndDiscipline: { capacityDiscipline: "yüksek", priceWarRisk: "düşük", managementCapitalAllocation: "etkin" },
    sustainability: { estimatedCapYears: 20, keyVulnerability: "Tüketici alışkanlıklarının sağlıklı içeceklere kayması." },
    isCustom: false, createdAt: "2026-08-22", updatedAt: "2026-08-22",
    notes: "Geleneksel 'geniş hendek' ve 'tüketici avantajı' (Consumer Advantage) kavramının ders kitabı niteliğindeki klasik örneği."
  }`;

const thyEn = `
  {
    id: "thy-dossier",
    companyName: "Turkish Airlines",
    ticker: "THYAO (BIST)",
    industry: "Airlines & Transportation",
    description: "Global flag carrier standing out with its extensive flight network in the highly capital-intensive, cyclical airline industry.",
    financials: { revenue: 550000, operatingIncome: 65000, effectiveTaxRate: 20, totalAssets: 1100000, cashAndEquivalents: 150000, nonInterestCurrentLiabilities: 200000, wacc: 30 },
    industryStructure: { supplierPower: "yüksek", buyerPower: "orta", threatOfNewEntrants: "düşük", threatOfSubstitutes: "orta", industryRivalry: "yüksek", profitPoolPosition: "Cyclical profitability ring due to intense competition and high fixed costs." },
    competitiveAdvantage: { primaryType: "ölçek_avantajı", subDrivers: ["Ağ Etkisi", "Ölçek Ekonomisi"], pricingPowerEvidence: "Limited pricing power due to intense rivalry and elastic (price-sensitive) demand.", costAdvantageEvidence: "Extensive network spreads fixed costs, but fuel and aircraft financing remain exogenous." },
    interactionAndDiscipline: { capacityDiscipline: "orta", priceWarRisk: "yüksek", managementCapitalAllocation: "yüksek_riskli" },
    sustainability: { estimatedCapYears: 5, keyVulnerability: "Fuel price shocks, geopolitical risks, and macroeconomic crises." },
    isCustom: false, createdAt: "2026-08-22", updatedAt: "2026-08-22",
    notes: "Airlines are historically known as 'value destroyers' or very narrow moat businesses. Competition is brutal and fixed costs are extremely high."
  },`;

const cokeEn = `
  {
    id: "cocacola-dossier",
    companyName: "Coca-Cola",
    ticker: "KO (NYSE)",
    industry: "Beverages (FMCG)",
    description: "Beverage giant with one of the world's most powerful brand values, operating a highly profitable syrup and bottling network model.",
    financials: { revenue: 45000, operatingIncome: 13500, effectiveTaxRate: 21, totalAssets: 97000, cashAndEquivalents: 13000, nonInterestCurrentLiabilities: 20000, wacc: 8 },
    industryStructure: { supplierPower: "düşük", buyerPower: "orta", threatOfNewEntrants: "düşük", threatOfSubstitutes: "orta", industryRivalry: "orta", profitPoolPosition: "Dominant position capturing the lion's share of the profit pool (syrup manufacturing) via brand strength." },
    competitiveAdvantage: { primaryType: "tüketici_avantajı", subDrivers: ["Marka/Arama Maliyeti", "Ölçek Ekonomisi"], pricingPowerEvidence: "Proven ability to raise prices during inflationary periods without losing sales volume.", costAdvantageEvidence: "Asset-light model achieved by outsourcing (low-margin) bottling and focusing strictly on (high-margin) concentrate sales." },
    interactionAndDiscipline: { capacityDiscipline: "yüksek", priceWarRisk: "düşük", managementCapitalAllocation: "etkin" },
    sustainability: { estimatedCapYears: 20, keyVulnerability: "Consumer shift towards healthier beverages." },
    isCustom: false, createdAt: "2026-08-22", updatedAt: "2026-08-22",
    notes: "A textbook classic example of a 'wide moat' driven purely by Consumer Advantage (Brand)."
  }`;

function updateFile(filePath, isEnFile) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!isEnFile) {
    // Append to INITIAL_PRESET_DOSSIERS_TR
    content = content.replace(
      /export const INITIAL_PRESET_DOSSIERS_TR: CompanyAuditDossier\[\] = \[(.*?)\];/s,
      (match, p1) => {
        return `export const INITIAL_PRESET_DOSSIERS_TR: CompanyAuditDossier[] = [${p1},\n${thyTr}\n${cokeTr}\n];`;
      }
    );
    // Append to INITIAL_PRESET_DOSSIERS_EN
    content = content.replace(
      /export const INITIAL_PRESET_DOSSIERS_EN: CompanyAuditDossier\[\] = \[(.*?)\];/s,
      (match, p1) => {
        return `export const INITIAL_PRESET_DOSSIERS_EN: CompanyAuditDossier[] = [${p1},\n${thyEn}\n${cokeEn}\n];`;
      }
    );
  } else {
    content = content.replace(
      /export const INITIAL_PRESET_DOSSIERS_EN: CompanyAuditDossier\[\] = \[(.*?)\];/s,
      (match, p1) => {
        return `export const INITIAL_PRESET_DOSSIERS_EN: CompanyAuditDossier[] = [${p1},\n${thyEn}\n${cokeEn}\n];`;
      }
    );
  }
  
  fs.writeFileSync(filePath, content);
}

updateFile('src/data/companyAuditData.ts', false);
updateFile('src/data/companyAuditDataEn.ts', true);

