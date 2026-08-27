export interface DetectiveFinancialItem {
  id: string;
  name: string;
  category: "income_statement" | "balance_sheet_asset" | "balance_sheet_liability" | "footnote_item";
  reportedValue: number;
  economicValueAdjusted: number;
  hasFootnote: boolean;
  footnoteNumber?: number;
  footnoteTitle?: string;
  footnoteText?: string;
  auditAdjustmentNote: string;
  adjustmentType: "nopat_addback" | "invested_capital_add" | "invested_capital_subtract" | "wacc_weight_shift" | "none";
  adjustmentImpactExplanation: string;
}

export interface DetectiveCase {
  id: string;
  companyName: string;
  ticker: string;
  industry: string;
  scenarioDescription: string;
  currency: string;
  reportedTaxRate: number;
  
  // Reported raw numbers
  reportedRevenue: number;
  reportedOperatingCost: number;
  reportedEbit: number;
  reportedTotalAssets: number;
  reportedCashAndEquivalents: number;
  reportedNonOperatingCash: number;
  reportedCurrentLiabilities: number;
  reportedInterestBearingDebt: number;
  reportedShareholdersEquity: number;
  
  // WACC components
  costOfEquity: number;
  costOfDebtPreTax: number;
  
  // Footnotes and detailed balance sheet lines
  lineItems: DetectiveFinancialItem[];

  // Student guidance questions
  discoveryQuestions: {
    question: string;
    targetItemId: string;
    hint: string;
    whyItMatters: string;
  }[];

  // Pedagogical Summary
  takeaway: string;
}

export const DETECTIVE_CASES_TR: DetectiveCase[] = [
  {
    id: "tech-cloud-rnd",
    companyName: "Nexus Cloud & AI Systems A.Ş.",
    ticker: "NXAI",
    industry: "Yazılım, Bulut & Yapay Zeka",
    currency: "Milyon $",
    scenarioDescription: "Yüksek Ar-Ge harcaması yapan ve bilançosunda devasa hazine bonosu/nakit tutan küresel bir SaaS devi. Standart muhasebede Ar-Ge gider yazıldığı ve atıl nakit varlıklarda tutulduğu için ROIC yanıltıcı görünmektedir.",
    reportedTaxRate: 0.20,
    reportedRevenue: 24000,
    reportedOperatingCost: 16000,
    reportedEbit: 4500,
    reportedTotalAssets: 48000,
    reportedCashAndEquivalents: 22000,
    reportedNonOperatingCash: 19000,
    reportedCurrentLiabilities: 6000,
    reportedInterestBearingDebt: 8000,
    reportedShareholdersEquity: 34000,
    costOfEquity: 10.5,
    costOfDebtPreTax: 5.5,
    takeaway: "Ar-Ge harcamalarını aktifleştirip faydalı ömrüne (3-5 yıl) itfa etmek ve operasyon dışı atıl nakdi bilançodan ayıklamak, şirketin gerçek ekonomik NOPAT ve Yatırılan Sermaye (Invested Capital) gücünü açığa çıkarır.",
    lineItems: [
      {
        id: "rnd-expense",
        name: "Yıllık Ar-Ge Harcaması (Gelir Tablosu Gideri)",
        category: "income_statement",
        reportedValue: 3500,
        economicValueAdjusted: 1100,
        hasFootnote: true,
        footnoteNumber: 14,
        footnoteTitle: "Araştırma ve Geliştirme Politikası & Yazılım Varlıkları",
        footnoteText: "Şirket cari yılda 3.500 Milyon $ Ar-Ge harcaması yapmış olup US GAAP/UFRS uyarınca tamamını faaliyet gideri kaydetmiştir. Geliştirilen büyük dil modelleri ve bulut algoritmalarının tahmini ekonomik ömrü 4 yıldır. Geçmiş 4 yılın itfa amortismanı 2.400 Milyon $'dır.",
        auditAdjustmentNote: "3.500 M$ gider kâra geri eklenir, 2.400 M$ ekonomik itfa düşülür -> Net EBIT Düzeltmesi: +1.100 M$. Kalan 7.200 M$ birikmiş Ar-Ge varlığı bilançoya (Invested Capital) eklenir.",
        adjustmentType: "nopat_addback",
        adjustmentImpactExplanation: "EBIT'i +1.100 M$, NOPAT'ı +880 M$ artırır. Bilançoya +7.200 M$ sermaye varlığı ekler.",
      },
      {
        id: "excess-cash-item",
        name: "Hazine Bonoları ve Vadeli Mevduatlar (Atıl Nakit)",
        category: "balance_sheet_asset",
        reportedValue: 22000,
        economicValueAdjusted: 3000,
        hasFootnote: true,
        footnoteNumber: 4,
        footnoteTitle: "Nakit ve Finansal Varlıkların Operasyonel Ayrımı",
        footnoteText: "Toplam 22.000 Milyon $'lık likit varlığın yalnızca 3.000 Milyon $'ı maaş ve günlük operasyon işletme sermayesi için elzemdir. 19.000 Milyon $'lık bakiye ABD Hazine Bonolarında faiz geliri amaçlı park edilmiştir.",
        auditAdjustmentNote: "19.000 M$'lık atıl bono yatırılan sermayeden (Invested Capital) çıkarılmalıdır. Çünkü ana faaliyet kârı fabrikalar, sunucular ve mühendislerle üretilir, hazine bonosu faizi ana faaliyet kârına (NOPAT) dahil değildir.",
        adjustmentType: "invested_capital_subtract",
        adjustmentImpactExplanation: "Invested Capital'i 19.000 M$ düşürerek paydadaki yapay şişkinliği yok eder.",
      },
      {
        id: "sbc-item",
        name: "Hisse Bazlı Personel Ödemeleri (Stock-Based Comp - SBC)",
        category: "income_statement",
        reportedValue: 1200,
        economicValueAdjusted: 1200,
        hasFootnote: true,
        footnoteNumber: 18,
        footnoteTitle: "Hisse Opsiyonları ve Yönetici Primleri",
        footnoteText: "Şirket mühendislere ve üst yönetime 1.200 Milyon $ değerinde kısıtlı hisse senedi (RSU) dağıtmıştır. Bazı analistler bunu 'nakitsiz gider' diyerek NOPAT'a ekleme hatasına düşmektedir.",
        auditAdjustmentNote: "DİKKAT TUZAĞI: Mauboussin uyarır: SBC nakitsiz olsa da hissedarlar için gerçek bir seyreltme maliyetidir (Gerçek Ücret Gideridir). NOPAT'a GERİ EKLENMEMELİDİR!",
        adjustmentType: "none",
        adjustmentImpactExplanation: "Düzeltme yapılmaz; NOPAT'ı yapay şişirmemek için gerçek faaliyet gideri sayılır.",
      },
    ],
    discoveryQuestions: [
      {
        question: "Ar-Ge harcamaları kârdan hemen düşülünce ve sermayeye yazılmayınca ROIC neden bozulur?",
        targetItemId: "rnd-expense",
        hint: "Dipnot 14'e bakın: Yazılım algoritması 4 yıl boyunca gelir üretecek bir 'Varlık'tır (Asset).",
        whyItMatters: "Yazılım şirketleri gençken Ar-Ge nedeniyle kârsız, olgunlaşınca ise sermayesiz görünüp yapay %100+ ROIC üretir.",
      },
      {
        question: "Şirketin kasasındaki 19 Milyar $'lık Hazine Bonosu ana faaliyet sermayesine dahil edilmeli midir?",
        targetItemId: "excess-cash-item",
        hint: "Dipnot 4'e bakın: Faiz geliri EBIT'e dahil değildir; dolayısıyla bonolar da Yatırılan Sermaye'de olmamalıdır.",
        whyItMatters: "Atıl nakit düşülmezse şirketin çekirdek işinin ne kadar yüksek sermaye getirisi ürettiği gizlenir.",
      },
    ]
  },
  {
    id: "retail-leases-capitalization",
    companyName: "Atlas İndirim Marketleri & Mağazacılık A.Ş.",
    ticker: "ATLS",
    industry: "Organize Perakende & Süpermarket",
    currency: "Milyon TL",
    scenarioDescription: "12.000 mağazasının tamamını kiralayan ulusal bir perakende devi. Mağaza satın almak yerine kiraladığı için geleneksel bilançoda yatırılan sermayesi çok küçük, ROIC oranı ise yapay olarak astronomik görünmektedir.",
    reportedTaxRate: 0.22,
    reportedRevenue: 95000,
    reportedOperatingCost: 89000,
    reportedEbit: 4800,
    reportedTotalAssets: 32000,
    reportedCashAndEquivalents: 4500,
    reportedNonOperatingCash: 2000,
    reportedCurrentLiabilities: 21000,
    reportedInterestBearingDebt: 2500,
    reportedShareholdersEquity: 8500,
    costOfEquity: 18.0,
    costOfDebtPreTax: 24.0,
    takeaway: "Mağaza kiralayan perakendecide kira taahhütlerini iskonto edip sermayeye ve borca eklemek (Kullanım Hakkı Varlığı), şirketin gerçek borçluluğunu, WACC ağırlığını ve sermaye yoğunluğunu ortaya koyar.",
    lineItems: [
      {
        id: "operating-leases-item",
        name: "Mağaza Faaliyet Kiralamaları Taahhütleri (Gelecek 5 Yıl)",
        category: "footnote_item",
        reportedValue: 0,
        economicValueAdjusted: 16500,
        hasFootnote: true,
        footnoteNumber: 21,
        footnoteTitle: "Uzun Vadeli Kira Sözleşmeleri & İptal Edilemez Taahhütler",
        footnoteText: "Şirketin 12.000 mağazası için gelecek 7 yıllık asgari iptal edilemez kira yükümlülüklerinin toplamı 25.000 Milyon TL'dir. İskonto oranı %16 ile bugünkü indirgenmiş değeri 16.500 Milyon TL'dir. Cari yıl kira gideri içindeki zımni faiz payı 1.200 Milyon TL'dir.",
        auditAdjustmentNote: "16.500 Milyon TL 'Kullanım Hakkı Varlığı' olarak Yatırılan Sermaye'ye ve 'Kira Borcu' olarak Borç hanesine eklenir. Kira içindeki 1.200 M TL faiz EBIT'e geri eklenir.",
        adjustmentType: "invested_capital_add",
        adjustmentImpactExplanation: "EBIT'i +1.200 M TL (NOPAT'ı +936 M TL), Yatırılan Sermayeyi ise +16.500 M TL artırır.",
      },
      {
        id: "working-capital-item",
        name: "Negatif İşletme Sermayesi (Tedarikçi Finansmanı)",
        category: "balance_sheet_liability",
        reportedValue: 21000,
        economicValueAdjusted: 21000,
        hasFootnote: true,
        footnoteNumber: 8,
        footnoteTitle: "Ticari Borçlar ve Tedarikçi Vade Süreleri",
        footnoteText: "Şirket sattığı sütü ve bisküviyi müşteriden anında nakit/kartla (0 gün) tahsil ederken, üreticiye ödemeyi ortalama 75 günde yapmaktadır. Bu durum 8.000 Milyon TL negatif işletme sermayesi fonlaması yaratır.",
        auditAdjustmentNote: "Faizsiz ticari borçlar Yatırılan Sermaye'den düşülür. Bu perakendecinin müşterilerden ve tedarikçilerden bedava fon sağladığını kanıtlar.",
        adjustmentType: "none",
        adjustmentImpactExplanation: "Yatırılan Sermaye formülünde (Dönen Varlıklar - Nakit - Kısa Vadeli Faizsiz Borçlar) yer alır.",
      },
    ],
    discoveryQuestions: [
      {
        question: "Perakendeci mağazayı satın almak yerine 10 yıllığına kiralayınca neden bilançoda 'Borç' ve 'Varlık' gizlenmiş olur?",
        targetItemId: "operating-leases-item",
        hint: "Dipnot 21'e bakın: 16.500 Milyon TL'lik kira sözleşmesi banka kredisinden farksız bir borç taahhüdüdür.",
        whyItMatters: "Kira borcu eklenmezse şirketin WACC'ı yanlış hesaplanır ve ROIC %60 gibi yanıltıcı yüksek çıkar.",
      },
    ]
  },
  {
    id: "industrial-restructuring-pension",
    companyName: "Demir Çelik & Ağır Makine Sanayi A.Ş.",
    ticker: "DMRÇ",
    industry: "Ağır Sanayi & Metalurji",
    currency: "Milyon TL",
    scenarioDescription: "Geçtiğimiz yıl tek seferlik fabrika kapatma tazminatı ödeyen ve bilançosunda devasa fonlanmamış kıdem tazminatı yükümlülüğü olan döngüsel sanayi devi.",
    reportedTaxRate: 0.20,
    reportedRevenue: 38000,
    reportedOperatingCost: 34500,
    reportedEbit: 1500,
    reportedTotalAssets: 42000,
    reportedCashAndEquivalents: 3000,
    reportedNonOperatingCash: 1200,
    reportedCurrentLiabilities: 7000,
    reportedInterestBearingDebt: 12000,
    reportedShareholdersEquity: 23000,
    costOfEquity: 16.0,
    costOfDebtPreTax: 20.0,
    takeaway: "Tek seferlik kazaları/cezaları NOPAT'a geri eklemek (Normalizasyon) ve fonlanmamış kıdem tazminatlarını borç benzeri yükümlülük saymak sürdürülebilir kazanç gücünü netleştirir.",
    lineItems: [
      {
        id: "one-off-restructuring",
        name: "Tek Seferlik Fabrika Kapatma ve Çevre Cezası",
        category: "income_statement",
        reportedValue: 1200,
        economicValueAdjusted: 0,
        hasFootnote: true,
        footnoteNumber: 29,
        footnoteTitle: "Olağandışı Giderler ve Fabrika Dönüşüm Karşılığı",
        footnoteText: "Eski yüksek fırının kapatılması ve çevre rehabilitasyon cezaları nedeniyle cari dönemde 1.200 Milyon TL tek seferlik karşılık ayrılmış ve faaliyet kârından düşülmüştür.",
        auditAdjustmentNote: "Tek seferlik 1.200 M TL gider EBIT'e geri eklenir. Böylece şirketin normalleştirilmiş kalıcı faaliyet kârı ortaya çıkar.",
        adjustmentType: "nopat_addback",
        adjustmentImpactExplanation: "EBIT'i +1.200 M TL, NOPAT'ı +960 M TL artırarak normalleştirir.",
      },
      {
        id: "pension-deficit",
        name: "Fonlanmamış Kıdem Tazminatı & Emeklilik Yükümlülüğü",
        category: "balance_sheet_liability",
        reportedValue: 2800,
        economicValueAdjusted: 2800,
        hasFootnote: true,
        footnoteNumber: 16,
        footnoteTitle: "Çalışanlara Sağlanan Faydalar ve Aktüeryal Açık",
        footnoteText: "Şirketin 8.500 kıdemli personeli için aktüeryal hesaplanan kıdem tazminatı karşılığı 2.800 Milyon TL'dir. Bu borç için herhangi bir bloke fon ayrılmamıştır.",
        auditAdjustmentNote: "Fonlanmamış kıdem tazminatları borç benzeri (Debt-Equivalent) bir finansal yükümlülüktür ve WACC hesaplanırken borç tarafına dahil edilmelidir.",
        adjustmentType: "wacc_weight_shift",
        adjustmentImpactExplanation: "WACC hesaplamasında borç ağırlığını artırır ve hisse değerlemesinde borç olarak düşülür.",
      }
    ],
    discoveryQuestions: [
      {
        question: "1.200 Milyon TL'lik tek seferlik çevre cezası gelecek yılların hendek kârlılığı tahmininde neden dışarıda bırakılmalıdır?",
        targetItemId: "one-off-restructuring",
        hint: "Dipnot 29'a bakın: Şirket bu fırını kapattı ve ceza bir daha ödenmeyecek.",
        whyItMatters: "Normalizasyon yapılmazsa şirketin gelecekteki kâr potansiyeli çok düşük tahmin edilir.",
      }
    ]
  }
];
