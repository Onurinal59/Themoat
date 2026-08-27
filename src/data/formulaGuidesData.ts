import { FormulaGuide } from "../types";

export const FORMULA_GUIDES_DATA: Record<string, FormulaGuide> = {
  "wacc": {
    id: "wacc",
    title: "Ağırlıklı Ortalama Sermaye Maliyeti (WACC)",
    badge: "MODÜL 1: FİNANSAL TEMELLER",
    subtitle: "Bir Şirketin Kullandığı Paranın Gerçek Fırsat Maliyeti Nasıl Hesaplanır?",
    coreEquation: "WACC = (E / V × Ke) + (D / V × Kd × (1 - t))",
    plainLanguageSummary:
      "WACC, şirketin kasasına giren her 100 TL'lik fon için (hissedarlara ve bankalara) yıllık ortalama ödemek zorunda olduğu getiri oranıdır. Bir şirketin projesi veya ROIC'si WACC'nin üzerindeyse refah yaratılır; altındaysa şirket aslında sermayeyi eritmektedir.",
    whyThisFormulaExists:
      "Şirketler sermayeyi iki kaynaktan bulur: 1) Hissedarlar (Özsermaye) ve 2) Bankalar/Tahvil sahipleri (Borç). Hissedar parasını faizsiz bir 'bedava para' sanmak en büyük yanılgıdır. Hissedarlar risk aldıkları için borsadan en az %12-%15 getiri bekler. Borç verenler ise faiz ister (%10). Ayrıca faiz gideri vergiden düşülebildiği için borcun maliyeti devlet desteğiyle (Vergi Kalkanı: 1 - t) ucuzlar. WACC bu iki kaynağın ağırlıklı ortalamasıdır.",
    variables: [
      {
        symbol: "E",
        name: "Özsermaye Piyasa Değeri (Market Cap)",
        description: "Hisse Fiyatı × Toplam Hisse Adedi.",
        howToFindIt: "Borsa ekranında şirketin güncel Piyasa Değeri (Market Capitalization).",
      },
      {
        symbol: "D",
        name: "Toplam Net Faiz Taşıyan Borç (Total Debt)",
        description: "Banka kredileri, çıkarılan tahviller ve finansal borçlar.",
        howToFindIt: "Bilançonun Kısa ve Uzun Vadeli Finansal Borçlar kaleminden.",
      },
      {
        symbol: "V",
        name: "Toplam İşletme Sermaye Büyüklüğü (E + D)",
        description: "Özsermaye ile Borcun toplam piyasa değeri.",
        howToFindIt: "E + D toplanarak bulunur.",
      },
      {
        symbol: "Ke",
        name: "Özsermaye Maliyeti (Cost of Equity - CAPM)",
        description: "Ke = Risksiz Faiz (Rf) + [Beta (β) × Hisse Risk Primi (ERP)]. Hissedarların beklediği asgari getiri.",
        howToFindIt: "10 Yıllık Hazine Tahvili Faizi + (Sektör Betası × %5-%6 Piyasa Risk Primi).",
      },
      {
        symbol: "Kd",
        name: "Borçlanma Maliyeti (Cost of Debt)",
        description: "Şirketin bankalardan veya tahvil ihracından aldığı brüt faiz oranı.",
        howToFindIt: "Gelir Tablosundaki Yıllık Faiz Gideri / Toplam Finansal Borç.",
      },
      {
        symbol: "t",
        name: "Kurumlar Vergisi Oranı (Tax Rate)",
        description: "Şirketin ödediği vergi oranı (Örn: %25).",
        howToFindIt: "Yasal kurumlar vergisi oranı veya gelir tablosundaki efektif vergi oranı.",
      },
      {
        symbol: "(1 - t)",
        name: "Vergi Kalkanı Çarpanı (Tax Shield)",
        description: "Faiz gideri vergiden düşüldüğü için borcun net maliyetini ucuzlatan çarpan.",
        howToFindIt: "Vergi %25 ise çarpan: 1 - 0.25 = 0.75 olur.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Özsermaye Maliyetini (Ke) CAPM ile Bul",
        formula: "Ke = Rf + β × ERP",
        explanation:
          "Risksiz faiz %10, şirketin Betası 1.2 ve Piyasa Risk Primi %5 ise: Ke = %10 + (1.2 × %5) = %16. Hissedarlar yıllık %16 getiri talep etmektedir.",
        exampleValues: "Rf = %10, β = 1.2, ERP = %5 -> Ke = %16.0",
      },
      {
        stepNumber: 2,
        title: "Borcun Net Vergi Sonrası Maliyetini (Kd × (1 - t)) Hesapla",
        formula: "Net Kd = Kd × (1 - t)",
        explanation:
          "Banka kredi faizi %12 ve kurumlar vergisi %25 ise: Net Kd = %12 × (1 - 0.25) = %9.0. Vergi kalkanı sayesinde 3 puan tasarruf sağlanır.",
        exampleValues: "Kd = %12, t = %25 -> Net Kd = %9.0",
      },
      {
        stepNumber: 3,
        title: "Sermaye Ağırlıklarını (E/V ve D/V) Belirle",
        formula: "Ağırlık_E = E / (E + D), Ağırlık_D = D / (E + D)",
        explanation:
          "Özsermaye 700 Milyon TL, Borç 300 Milyon TL ise: Toplam V = 1.000 TL. Özsermaye ağırlığı %70, Borç ağırlığı %30'dur.",
        exampleValues: "E = 700M, D = 300M -> %70 Özsermaye / %30 Borç",
      },
      {
        stepNumber: 4,
        title: "Ağırlıkları Çarp ve Topla (WACC)",
        formula: "WACC = (0.70 × %16.0) + (0.30 × %9.0)",
        explanation:
          "WACC = %11.2 + %2.7 = %13.9. Şirketin yıllık ortalama sermaye maliyeti %13.9'dur.",
        exampleValues: "Sonuç: WACC = %13.9",
      },
    ],
    realWorldExample: {
      company: "Örnek Teknoloji A.Ş.",
      scenario: "Yeni bir veri merkezi yatırımı yapacak. Yatırımın getiri oranı (ROIC) %18 olarak öngörülüyor.",
      calculationSteps: [
        "Piyasa Değeri: 800M TL, Finansal Borç: 200M TL (Toplam: 1.000M TL).",
        "Özsermaye Ağırlığı: %80, Borç Ağırlığı: %20.",
        "CAPM Özsermaye Maliyeti: %15.0, Brüt Borç Faizi: %10.0, Vergi: %20.",
        "Net Borç Maliyeti = %10 × (1 - 0.20) = %8.0.",
        "WACC = (%80 × %15.0) + (%20 × %8.0) = %12.0 + %1.6 = %13.6.",
      ],
      resultInterpretation:
        "Projenin ROIC'si (%18.0), WACC'den (%13.6) 4.4 puan yüksektir (Pozitif Spread). Şirket bu yatırımla hissedarlarına gerçek ekonomik refah yaratır.",
    },
    commonPitfalls: [
      "Hissedar sermayesini bedava sanmak (Özsermaye borçtan her zaman daha pahalıdır çünkü riski en son üstlenir).",
      "Defter değerini (Book Value) kullanmak yerine Piyasa Değerini (Market Value) kullanmayı unutmak.",
      "Borç faizinden vergi kalkanını (1 - t) düşmeyi unutarak WACC'yi yapay olarak yüksek hesaplamak.",
    ],
    calculatorType: "wacc",
  },
  "roic": {
    id: "roic",
    title: "Yatırılan Sermayenin Getirisi (ROIC & NOPAT)",
    badge: "MODÜL 1 & 7: KÂRLILIK VE HENDEK",
    subtitle: "Şirketin İşine Bağladığı Her 100 TL ile Kaç TL Net Faaliyet Kârı Ürettiği",
    coreEquation: "ROIC = NOPAT / Yatırılan Sermaye (Invested Capital)",
    plainLanguageSummary:
      "ROIC, bir işletmenin borçlu mu borçsuz mu olduğuna bakılmaksızın, operasyonel işine yatırdığı gerçek sermayeden ne kadar saf vergi sonrası nakit kâr ürettiğini gösteren nihai altın standarttır.",
    whyThisFormulaExists:
      "ROE (Özsermaye Getirisi) veya Net Kâr aldatıcı olabilir; çünkü bir şirket aşırı borç alarak yapay olarak ROE'sini şişirebilir (finansal kaldıraç hilesi). ROIC ise sermaye yapısından bağımsız olarak şirketin fabrika, mağaza ve stoklarının ne kadar verimli çalıştığını ölçer.",
    variables: [
      {
        symbol: "NOPAT",
        name: "Net Vergi Sonrası Faaliyet Kârı (Net Operating Profit After Tax)",
        description: "NOPAT = Faaliyet Kârı (EBIT) × (1 - Vergi Oranı).",
        howToFindIt: "Gelir tablosundaki Esas Faaliyet Kârı × (1 - Efektif Vergi).",
      },
      {
        symbol: "Invested Capital",
        name: "Yatırılan Sermaye",
        description: "Dönen Varlıklar - Nakit - Borçsuz Kısa Vadeli Yükümlülükler (Ticari Borçlar) + Duran Varlıklar (Maddi ve Maddi Olmayan).",
        howToFindIt: "Bilançodan nakit fazlası ve ticari borçlar arındırılarak bulunur.",
      },
      {
        symbol: "ROIC - WACC",
        name: "Ekonomik Yayılım (Economic Spread)",
        description: "Şirketin sermaye maliyetinin üzerinde kazandığı katma değer marjı.",
        howToFindIt: "ROIC'den WACC çıkarılarak hesaplanır.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "NOPAT'ı Hesapla",
        formula: "NOPAT = EBIT × (1 - t)",
        explanation: "Faaliyet Kârı 200M TL ve vergi %25 ise: NOPAT = 200 × (1 - 0.25) = 150M TL.",
        exampleValues: "EBIT = 200M, t = %25 -> NOPAT = 150M TL",
      },
      {
        stepNumber: 2,
        title: "Operasyonel Net İşletme Sermayesini (NWC) Bul",
        formula: "NWC = (Ticari Alacaklar + Stoklar) - Ticari Borçlar",
        explanation: "Dükkanda dönen günlük operasyonel bağlanan sermayedir.",
        exampleValues: "Alacak: 80M, Stok: 120M, Borç: 100M -> NWC = 100M TL",
      },
      {
        stepNumber: 3,
        title: "Toplam Yatırılan Sermayeyi (Invested Capital) Topla",
        formula: "Yatırılan Sermaye = NWC + Net Duran Varlıklar (PP&E)",
        explanation: "Fabrikalar, makineler ve mağazalar 400M TL ise: Toplam = 100M + 400M = 500M TL.",
        exampleValues: "NWC = 100M, PP&E = 400M -> Invested Capital = 500M TL",
      },
      {
        stepNumber: 4,
        title: "ROIC Oranını Hesapla",
        formula: "ROIC = NOPAT / Yatırılan Sermaye = 150M / 500M = %30.0",
        explanation: "Şirket işe bağladığı her 100 TL ile yılda 30 TL saf faaliyet kârı üretmektedir!",
        exampleValues: "Sonuç: ROIC = %30.0 (Harika bir hendek işareti)",
      },
    ],
    realWorldExample: {
      company: "Starbucks vs Düşük Marjlı Perakendeci",
      scenario: "Starbucks yüksek marka sadakati sayesinde az sermaye ile yüksek NOPAT üretir.",
      calculationSteps: [
        "Starbucks NOPAT: 4.2 Milyar USD.",
        "Starbucks Yatırılan Sermaye: 14.0 Milyar USD.",
        "ROIC = 4.2 / 14.0 = %30.0.",
        "Sektör WACC'si %8.5 olduğuna göre Spread = +%21.5.",
      ],
      resultInterpretation:
        "Starbucks sermaye maliyetinin 3.5 katı getiri elde etmektedir. Bu geniş bir ekonomik hendeğin doğrudan matematiksel kanıtıdır.",
    },
    commonPitfalls: [
      "Faaliyet dışı nakit fazlasını sermayeden düşmeyi unutarak sermayeyi gereksiz büyük hesaplamak.",
      "Faiz giderini NOPAT'a dahil etmek (Faiz sermaye yapısıyla ilgilidir, operasyonel işle değil).",
      "Ar-Ge ve faaliyet kiralamalarını bilançoya dahil etmemek.",
    ],
    calculatorType: "roic",
  },
  "value-stick": {
    id: "value-stick",
    title: "Değer Çubuğu (Value Stick - WTP, Fiyat, Maliyet, WTS)",
    badge: "MODÜL 3: MİKROEKONOMİK DEĞER YARATMA",
    subtitle: "Müşterinin Ödeme İsteği ile Tedarikçi Maliyeti Arasındaki Rant Paylaşımı",
    coreEquation: "Toplam Yaratılan Değer = WTP (Ödeme İsteği) - WTS (Tedarikçi İstekliliği)",
    plainLanguageSummary:
      "Değer Çubuğu, bir şirketin havadan para basmadığını; müşterinin kafasındaki fayda tavanı (WTP) ile tedarikçinin asgari kabul edeceği maliyet tabanı (WTS) arasında yaratılan pastayı paylaştığını gösterir.",
    whyThisFormulaExists:
      "Sadece maliyeti düşürmek hendek yaratmaz. Asıl hendek ya müşterinin ödeme isteğini (WTP) zirveye çıkarmaktan (Apple gibi) ya da tedarikçi maliyetini (WTS) sektörün en dibine çekmekten (Costco/Walmart gibi) doğar.",
    variables: [
      {
        symbol: "WTP",
        name: "Ödeme İsteği (Willingness to Pay)",
        description: "Müşterinin o ürün/hizmet için vazgeçmeye hazır olduğu azami para tavanı.",
        howToFindIt: "Pazar araştırmaları, marka sadakati, alternatiflerin yokluğu.",
      },
      {
        symbol: "P",
        name: "Satış Fiyatı (Price)",
        description: "Şirketin etiket fiyatı.",
        howToFindIt: "Gelir / Satılan Adet.",
      },
      {
        symbol: "C",
        name: "Birim Maliyet (Cost)",
        description: "Şirketin ürünü üretmek ve sunmak için harcadığı para.",
        howToFindIt: "Satılan Malın Maliyeti + Faaliyet Gideri.",
      },
      {
        symbol: "WTS",
        name: "Tedarikçi İstekliliği (Willingness to Sell)",
        description: "Tedarikçinin veya çalışanın batmadan hizmet vermeye razı olduğu en düşük taban maliyet.",
        howToFindIt: "Tedarikçi alternatif maliyetleri.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Tüketici Artığını (Consumer Surplus) Hesapla",
        formula: "Tüketici Artığı = WTP - Fiyat",
        explanation: "Müşteri bir iPhone için 1.500$ vermeye hazır ama Apple 1.200$'a satıyorsa, müşteri 300$'lık psikolojik kâr hisseder.",
        exampleValues: "WTP = 1500$, P = 1200$ -> Tüketici Artığı = 300$",
      },
      {
        stepNumber: 2,
        title: "Şirketin Kâr Marjını (Firm Margin) Hesapla",
        formula: "Şirket Kârı = Fiyat - Maliyet",
        explanation: "1.200$'a satılan telefonun toplam maliyeti 600$ ise şirket 600$ kâr eder.",
        exampleValues: "P = 1200$, C = 600$ -> Şirket Kârı = 600$",
      },
      {
        stepNumber: 3,
        title: "Tedarikçi Artığını (Supplier Surplus) Hesapla",
        formula: "Tedarikçi Artığı = Maliyet - WTS",
        explanation: "Tedarikçi parçayı en az 450$'a satmaya razıyken şirket 600$ ödüyorsa aradaki farktır.",
        exampleValues: "C = 600$, WTS = 450$ -> Tedarikçi Artığı = 150$",
      },
      {
        stepNumber: 4,
        title: "Toplam Pastayı Gör",
        formula: "Toplam Değer = WTP - WTS = 1500$ - 450$ = 1050$",
        explanation: "Tüm ekosistemde yaratılan toplam ekonomik refah 1.050$'dır ve en büyük dilimi şirket alır.",
        exampleValues: "Toplam Değer = 1050$",
      },
    ],
    realWorldExample: {
      company: "Apple vs Sıradan Akıllı Telefon Üreticisi",
      scenario: "Apple WTP'yi (Marka, Ekosistem, iOS) yukarı çekerek rakiplerinden 4 kat yüksek marj elde eder.",
      calculationSteps: [
        "Android üreticisi: WTP = 400$, Fiyat = 350$, Maliyet = 320$ -> Şirket Kârı = 30$ (%8.5 marj).",
        "Apple: WTP = 1400$, Fiyat = 1100$, Maliyet = 500$ -> Şirket Kârı = 600$ (%54.5 marj).",
      ],
      resultInterpretation:
        "Apple müşteriye 300$ tüketici fazlası bırakırken kendisi 600$ kazanır; böylece hem müşteri sadık kalır hem şirket sektörel kârın %85'ini tek başına toplar.",
    },
    commonPitfalls: [
      "Fiyatı artırırken WTP'yi hesaba katmamak (Eğer Fiyat > WTP olursa müşteri anında kaçar).",
      "Maliyeti düşürürken ürün kalitesini bozup WTP'yi de aşağıya çekmek (Sahte verimlilik tuzağı).",
    ],
    calculatorType: "value-stick",
  },
  "dickinson": {
    id: "dickinson",
    title: "Dickinson Yaşam Döngüsü & 8 Nakit Akışı Deseni",
    badge: "MODÜL 2: YAŞAM DÖNGÜSÜ TEŞHİSİ",
    subtitle: "Faaliyet, Yatırım ve Finansman Akışlarının (+ / -) Yönünden Şirketin Evresini Okuma",
    coreEquation: "Nakit Akış Kombinasyonu = (CFO, CFI, CFF) İşaretleri",
    plainLanguageSummary:
      "Victoria Dickinson (2011) tarafından geliştirilen bu yöntem, gelir tablosundaki muhasebe hilelerine aldanmadan, şirketin nakit akış tablosundaki 3 ana damarın (+ / -) yönlerine bakarak Giriş, Büyüme, Olgunluk, Sarsıntı veya Düşüş evresini kesin olarak teşhis eder.",
    whyThisFormulaExists:
      "Bir şirketin kârlı görünmesi genç ve sağlıklı olduğunu kanıtlamaz. Şirket fabrikalarını satıp nakit yaratıyor olabilir ya da kârı kağıt üzerinde kalıp müşterilerden tahsilat yapamıyor olabilir. Nakit akış yönleri yalan söylemez.",
    variables: [
      {
        symbol: "CFO",
        name: "İşletme / Faaliyet Nakit Akışı (Cash from Operations)",
        description: "Şirketin ana işinden (mal/hizmet satıp tahsil ederek) ürettiği net nakit.",
        howToFindIt: "Nakit Akış Tablosu - İşletme Faaliyetlerinden Sağlanan Nakit.",
      },
      {
        symbol: "CFI",
        name: "Yatırım Nakit Akışı (Cash from Investing)",
        description: "Yeni fabrika, makine ve yazılım alımları (Negatif olması şirketin büyümeye yatırım yaptığını gösterir).",
        howToFindIt: "Nakit Akış Tablosu - Yatırım Faaliyetlerinden Nakit Akışı (Genellikle negatiftir).",
      },
      {
        symbol: "CFF",
        name: "Finansman Nakit Akışı (Cash from Financing)",
        description: "Banka borcu alma / ödeme, hisse ihracı veya temettü dağıtımı.",
        howToFindIt: "Nakit Akış Tablosu - Finansman Faaliyetlerinden Nakit Akışı.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Giriş Evresi (Introduction): ( - , - , + )",
        formula: "CFO: - , CFI: - , CFF: +",
        explanation: "Şirket henüz operasyonundan nakit üretemez (-), sürekli yeni makine yatırımı yapar (-) ve dışarıdan borç/yatırımcı parası çeker (+).",
        exampleValues: "Örnek: Erken Aşama Biyoteknoloji Girişimi",
      },
      {
        stepNumber: 2,
        title: "Büyüme Evresi (Growth): ( + , - , + )",
        formula: "CFO: + , CFI: - , CFF: +",
        explanation: "Operasyonlar nakit üretmeye başlamıştır (+), ancak büyüme o kadar hızlıdır ki hem yatırım yapılır (-) hem de ilave borç alınır (+).",
        exampleValues: "Örnek: Erken Dönem Tesla / Trendyol",
      },
      {
        stepNumber: 3,
        title: "Olgunluk / Nakit İneği Evresi (Mature): ( + , - , - ) [İDEAL HENDEK]",
        formula: "CFO: + , CFI: - , CFF: -",
        explanation: "Şirket devasa operasyonel nakit üretir (+), rutin yatırımlarını yapar (-) ve kalan dev nakitle borçlarını öder veya temettü dağıtır (-).",
        exampleValues: "Örnek: Apple, Coca-Cola, Microsoft",
      },
      {
        stepNumber: 4,
        title: "Düşüş Evresi (Decline): ( - , + , + / - )",
        formula: "CFO: - , CFI: + , CFF: +/-",
        explanation: "Operasyonlar nakit yakmaktadır (-), şirket batmamak için fabrikalarını ve binalarını satarak nakit yaratır (CFI +).",
        exampleValues: "Örnek: İflas Eşiğindeki Eski Sanayi Kuruluşu",
      },
    ],
    realWorldExample: {
      company: "Microsoft'un 2023 Nakit Akışı Röntgende",
      scenario: "Microsoft'un yıllık nakit akış tablosunu Dickinson testine tabi tutalım.",
      calculationSteps: [
        "CFO (Faaliyet): +87.6 Milyar USD (Muazzam pozitif).",
        "CFI (Yatırım): -22.7 Milyar USD (Yapay Zeka ve Sunucu yatırımları).",
        "CFF (Finansman): -43.9 Milyar USD (Temettü dağıtımı ve hisse geri alımı).",
      ],
      resultInterpretation:
        "Kombinasyon: ( + , - , - ). Bu kesin bir OLGUNLUK & NAKİT İNEĞİ profilidir. Şirket kendi kendine yetmekte, sıfır dış fona ihtiyaç duymakta ve hissedarlarına nakit akıtmaktadır.",
    },
    commonPitfalls: [
      "CFI'nin pozitif olmasını iyi bir şey sanmak (CFI pozitifse şirket fabrikalarını veya varlıklarını satıyordur!).",
      "Kâr eden bir şirketin CFO'sunun negatif olabileceğini unutmak (Alacaklarını tahsil edemeyen şirket kârlı görünür ama batar).",
    ],
    calculatorType: "dickinson",
  },
  "profit-pool": {
    id: "profit-pool",
    title: "Sektörel Kâr Havuzu (Profit Pool) Analizi",
    badge: "MODÜL 4: ENDÜSTRİ VE DEĞER ZİNCİRİ",
    subtitle: "Bir Sektördeki Sermaye Payı ile Ekonomik Kâr Payı Arasındaki Uçurum",
    coreEquation: "Ekonomik Kâr = Yatırılan Sermaye × (ROIC - WACC)",
    plainLanguageSummary:
      "Kâr Havuzu, bir sektörün tüm değer zincirinde (hammadde, üretim, dağıtım, yazılım, servis) toplam yatırılan sermayenin nerede toplandığını ve üretilen gerçek kârın (ekonomik rantın) kimin cebine aktığını haritalandırır.",
    whyThisFormulaExists:
      "Çoğu insan en çok ciro yapan veya en çok uçak/fabrika sahibi olan halkanın en çok parayı kazandığını zanneder. Oysa havayolu sektöründe tüm sermayeyi havayolları bağlar (%60) ama kârın %0'ını alır; rezervasyon yazılımları (GDS/Amadeus) ise sermayenin %2'sini bağlayıp kârın %40'ını toplar.",
    variables: [
      {
        symbol: "Sermaye Payı (%)",
        name: "Yatırılan Sermaye Payı",
        description: "O halkanın sektördeki toplam varlık/sermaye içindeki yüzdesi.",
        howToFindIt: "Sektör raporları ve şirket bilançoları toplamı.",
      },
      {
        symbol: "ROIC - WACC",
        name: "Ekonomik Kâr Marjı (Spread)",
        description: "O halkanın sermaye maliyetinin üzerinde ne kadar getiri elde ettiği.",
        howToFindIt: "Halkadaki şirketlerin ortalama ROIC'si - WACC'si.",
      },
      {
        symbol: "Kâr Havuzu Payı (%)",
        name: "Sektörel Ekonomik Kâr Payı",
        description: "Sektörün ürettiği toplam ekonomik katma değer içindeki payı.",
        howToFindIt: "(Halkanın Ekonomik Kârı) / (Sektörün Toplam Pozitif Ekonomik Kârı).",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Değer Zincirinin Halkalarını Tanımla",
        formula: "Zincir = Uçak Üreticileri + Havayolları + Havalimanları + Rezervasyon (GDS)",
        explanation: "Bir uçuş için müşterinin ödediği paranın paylaşıldığı tüm aktörleri sıraya diz.",
        exampleValues: "4 Ana Halka",
      },
      {
        stepNumber: 2,
        title: "Her Halkanın Yatırılan Sermayesini Hesapla",
        formula: "Sermaye_Payı = Halka_Sermayesi / Toplam_Sektör_Sermayesi",
        explanation: "Havayolları yüzlerce uçak aldığı için sermayenin %65'ini bağlar. Yazılım şirketleri sadece sunucu aldığı için %2 bağlar.",
        exampleValues: "Havayolu = 650M$, Yazılım = 20M$",
      },
      {
        stepNumber: 3,
        title: "Her Halkanın (ROIC - WACC) Spread'ini Bul",
        formula: "Spread = ROIC - WACC",
        explanation: "Havayollarında ROIC %6, WACC %8 (Spread: -%2.0). Yazılımda ROIC %35, WACC %9 (Spread: +%26.0).",
        exampleValues: "Havayolu: Negatif, Yazılım: +%26",
      },
      {
        stepNumber: 4,
        title: "Kâr Havuzunun Kazananını Belirle",
        formula: "Ekonomik Katma Değer = Sermaye × Spread",
        explanation: "Az sermaye bağlayıp devasa spread üreten 'Köprü Geçiş Noktaları' (Tollbooth) kâr havuzunun efendisidir.",
        exampleValues: "Yazılım ve Havalimanları kâr havuzunun %80'ini alır.",
      },
    ],
    realWorldExample: {
      company: "Amadeus / Sabre (GDS) vs Türk Hava Yolları / Lufthansa",
      scenario: "Yolcu 500$ bilet aldığında kâr nereye gider?",
      calculationSteps: [
        "Havayolu: Uçak amortismanı, yakıt ve personel masrafı sonrası koltuk başına 5$ net kâr bırakır.",
        "GDS Yazılımı (Amadeus): Her rezervasyon işleminden 4$ komisyon keser, sunucu maliyeti 0.10$ olduğundan 3.90$ net kâr üretir.",
      ],
      resultInterpretation:
        "Havayolu uçak satın alma riskini alırken, rezervasyon sistemi sıfır sermaye riskiyle bilet başına havayoluna yakın saf kâr elde eder.",
    },
    commonPitfalls: [
      "Yüksek cirolu halkayı kârlı sanmak.",
      "Giriş bariyerlerinin (Moat) sektörün hangi boğum noktasında olduğunu görememek.",
    ],
    calculatorType: "profit-pool",
  },
  "footnote": {
    id: "footnote",
    title: "10-K Dipnot Düzeltmeleri: Ar-Ge & Faaliyet Kiralamaları",
    badge: "MODÜL 5: MUHASEBE VE GERÇEK SERMAYE",
    subtitle: "Ar-Ge'yi Giderden Çıkarıp Varlığa Dönüştürme & Kiralama Kapitalizasyonu",
    coreEquation: "Düzeltilmiş NOPAT = EBIT + Ar-Ge Gideri - Ar-Ge Amortismanı",
    plainLanguageSummary:
      "Standart muhasebe kuralları (GAAP/IFRS), bir yazılım veya ilaç şirketinin geleceği inşa eden tüm Ar-Ge harcamalarını 'o yıl çöpe gitmiş sıradan bir elektrik faturası gibi' anında gider yazar. Bu da şirketin kârını ve bilançodaki gerçek sermayesini gizler. 10-K Dedektifi bu hatayı düzeltir.",
    whyThisFormulaExists:
      "Ar-Ge bir gider değil, uzun vadeli bir fabrikadır. İlaç şirketinin laboratuvarı ile çelik şirketinin fırını aynı şeydir. Ar-Ge'yi aktifleştirip 3-5 yıla yayarak amorti ettiğinizde şirketin gerçek NOPAT'ı ve gerçek Yatırılan Sermayesi ortaya çıkar.",
    variables: [
      {
        symbol: "Ar-Ge Gideri",
        name: "Yıllık Ar-Ge Harcaması",
        description: "Şirketin gelir tablosunda gider yazdığı cari yıl Ar-Ge bütçesi.",
        howToFindIt: "Gelir Tablosu - Research & Development.",
      },
      {
        symbol: "Faydalı Ömür (N)",
        name: "Ar-Ge İtfa Süresi (Yıl)",
        description: "Ar-Ge çıktısının gelir getirme süresi (Yazılım için 3 yıl, İlaç için 7-10 yıl).",
        howToFindIt: "Sektör standardı varsayımı.",
      },
      {
        symbol: "Kira Kapitalizasyonu",
        name: "Faaliyet Kirası Borç Eşdeğeri",
        description: "Gelecek yılların taahhüt edilen kira ödemelerinin bugünkü değeri (PV).",
        howToFindIt: "10-K dipnotlarındaki 'Future Lease Commitments' tablosu.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Cari Yıl Ar-Ge Giderini EBIT'e Geri Ekle",
        formula: "Düzeltilmiş EBIT = Raporlanan EBIT + Cari Yıl Ar-Ge",
        explanation: "100M TL EBIT ve 40M TL Ar-Ge varsa: Brüt EBIT = 140M TL olur.",
        exampleValues: "EBIT = 100M, Ar-Ge = 40M -> 140M TL",
      },
      {
        stepNumber: 2,
        title: "Geçmiş Yılların Ar-Ge Amortismanını Düş",
        formula: "Amortisman = Toplam Aktifleştirilmiş Ar-Ge / N",
        explanation: "Son 3 yılın Ar-Ge harcamalarının yıllık payı 25M TL ise düşülür.",
        exampleValues: "140M - 25M = 115M TL Düzeltilmiş EBIT",
      },
      {
        stepNumber: 3,
        title: "Ar-Ge Varlık Tablosunu Bilançoya Ekle",
        formula: "Düzeltilmiş Sermaye = Raporlanan Sermaye + Net Ar-Ge Varlığı",
        explanation: "Şirketin bilançosuna henüz amorti edilmemiş 60M TL'lik 'Ar-Ge Varlığı' eklenir.",
        exampleValues: "Sermaye tabanı gerçek boyutuna ulaşır.",
      },
      {
        stepNumber: 4,
        title: "Faaliyet Kiralamalarını Borç ve Varlık Olarak Ekle",
        formula: "Kira Borcu = Yıllık Kira × 8 (veya PV iskonto)",
        explanation: "Mağaza kiralayan perakendecinin gizli borcu bilançoya dahil edilir.",
        exampleValues: "Gerçek kaldıraç ortaya çıkar.",
      },
    ],
    realWorldExample: {
      company: "Pfizer / BioNTech Ar-Ge Düzeltmesi",
      scenario: "BioNTech aşı geliştirmek için yılda 1 Milyar Euro Ar-Ge harcadığında muhasebede zararda görünür.",
      calculationSteps: [
        "Raporlanan Muhasebe Kârı: -200M Euro (Zarar).",
        "Ar-Ge Harcaması: 1.000M Euro.",
        "Ar-Ge 5 yıla yayıldığında yıllık amortisman: 200M Euro.",
        "Düzeltilmiş NOPAT = -200M + 1000M - 200M = +600M Euro (Aslında şirket dev kârlıdır!).",
      ],
      resultInterpretation:
        "Düzeltme yapılmadığında harika inovasyon şirketleri 'zarar eden batık şirket' gibi görünür.",
    },
    commonPitfalls: [
      "Ar-Ge amortismanını düşmeyi unutup tüm Ar-Ge'yi saf kâr gibi eklemek.",
      "Tüm sektörlere aynı itfa ömrünü uygulamak (Hızlı tüketim yazılımı 3 yıl, biyoteknoloji 10 yıldır).",
    ],
    calculatorType: "footnote",
  },
  "dupont-ccc": {
    id: "dupont-ccc",
    title: "3 Bileşenli DuPont ROIC & Nakit Dönüşüm Süresi (CCC)",
    badge: "MODÜL 7: OPERASYONEL RÖNTGEN VE HIZ",
    subtitle: "ROIC = Faaliyet Marjı × Sermaye Devir Hızı & CCC = DIO + DSO - DPO",
    coreEquation: "ROIC = (NOPAT / Satış Geliri) × (Satış Geliri / Yatırılan Sermaye)",
    plainLanguageSummary:
      "Bir şirketin yüksek ROIC yapmasının iki yolu vardır: 1) Ya her sattığı üründen yüksek kâr marjı elde eder (Marj Şampiyonu: Apple, Ferrari), 2) Ya da az kâr eder ama elindeki sermayeyi yılda 15-20 kez döndürür (Hız Şampiyonu: Costco, Walmart). CCC ise şirketin tedarikçinin parasıyla bedava finanse olup olmadığını gösterir.",
    whyThisFormulaExists:
      "DuPont analizi şirketin hendek tipini cerrahi hassasiyetle ayırır. Amazon ve Costco gibi şirketlerin sırrı marj değil, negatif nakit dönüşüm süresidir (Müşteriden parayı bugün peşin al, tedarikçiye 90 gün sonra öde; aradaki parayla faizsiz büyü!).",
    variables: [
      {
        symbol: "NOPAT Marjı",
        name: "Net Faaliyet Kâr Marjı (%)",
        description: "NOPAT / Satış Gelirleri. Fiyatlama gücünü gösterir.",
        howToFindIt: "Gelir tablosu NOPAT / Ciro.",
      },
      {
        symbol: "Sermaye Devir Hızı",
        name: "Invested Capital Turnover (Kez)",
        description: "Satış Gelirleri / Yatırılan Sermaye. Varlıkların hızını gösterir.",
        howToFindIt: "Ciro / Yatırılan Sermaye.",
      },
      {
        symbol: "DIO",
        name: "Stokta Kalma Günü (Days Inventory Outstanding)",
        description: "Ürünün depoda bekleme süresi.",
        howToFindIt: "(Ortalama Stok / SMM) × 365.",
      },
      {
        symbol: "DSO",
        name: "Alacak Tahsilat Günü (Days Sales Outstanding)",
        description: "Müşteriden paranın tahsil edilme süresi.",
        howToFindIt: "(Ticari Alacaklar / Gelir) × 365.",
      },
      {
        symbol: "DPO",
        name: "Tedarikçiye Ödeme Günü (Days Payable Outstanding)",
        description: "Tedarikçiye faturanın kaç günde ödendiği.",
        howToFindIt: "(Ticari Borçlar / SMM) × 365.",
      },
      {
        symbol: "CCC",
        name: "Nakit Dönüşüm Süresi (Cash Conversion Cycle)",
        description: "CCC = DIO + DSO - DPO (Negatif olması şirketin bedava dış kaynakla fonlandığını gösterir).",
        howToFindIt: "DIO + DSO - DPO.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "NOPAT Marjını Hesapla",
        formula: "Marj = NOPAT / Ciro",
        explanation: "100M Ciro ve 20M NOPAT -> Marj = %20.0.",
        exampleValues: "Ciro = 100M, NOPAT = 20M -> %20",
      },
      {
        stepNumber: 2,
        title: "Sermaye Devir Hızını Hesapla",
        formula: "Hız = Ciro / Yatırılan Sermaye",
        explanation: "100M Ciro / 50M Sermaye -> Hız = 2.0x.",
        exampleValues: "Ciro = 100M, Sermaye = 50M -> 2.0x",
      },
      {
        stepNumber: 3,
        title: "DuPont ile ROIC'yi Çarp",
        formula: "ROIC = Marj × Hız = %20.0 × 2.0 = %40.0",
        explanation: "İki bileşenin çarpımı nihai ROIC'yi verir.",
        exampleValues: "ROIC = %40.0",
      },
      {
        stepNumber: 4,
        title: "Nakit Dönüşüm Süresini (CCC) Hesapla",
        formula: "CCC = DIO (30 gün) + DSO (5 gün) - DPO (65 gün) = -30 Gün",
        explanation: "CCC -30 gün ise şirket müşteriden parayı tahsil ettikten tam 30 gün sonra tedarikçiye ödeme yapar. Bu 30 günlük bedava faizsiz işletme kredisidir!",
        exampleValues: "CCC = -30 Gün (Negatif İşletme Sermayesi Gücü)",
      },
    ],
    realWorldExample: {
      company: "Costco vs Tiffany & Co.",
      scenario: "Costco düşük marj + yüksek hız ile, Tiffany yüksek marj + düşük hız ile kazanır.",
      calculationSteps: [
        "Costco: NOPAT Marjı %2.5, Devir Hızı 6.0x -> ROIC = %15.0 (CCC: -5 gün).",
        "Tiffany: NOPAT Marjı %15.0, Devir Hızı 1.0x -> ROIC = %15.0 (CCC: +180 gün).",
      ],
      resultInterpretation:
        "İkisi de %15 ROIC yapar ancak Costco parayı depoda bekletmez; negatif CCC ile tedarikçilerini banka gibi kullanır.",
    },
    commonPitfalls: [
      "Sadece kâr marjına bakıp devir hızını görmezden gelmek.",
      "CCC'nin pozitif olmasının her zaman iyi olduğunu sanmak (CCC ne kadar düşük veya negatifse şirket o kadar güçlüdür).",
    ],
    calculatorType: "dupont-ccc",
  },
  "reverse-dcf": {
    id: "reverse-dcf",
    title: "Tersine DCF & Rekabetçi Avantaj Dönemi (CAP Süresi)",
    badge: "MODÜL 8: DEĞERLEME VE HENDEK SÜRESİ",
    subtitle: "Geleceği Tahmin Etme, Piyasa Fiyatının Hangi Büyümeyi ve Hendek Yılını İma Ettiğini Çöz",
    coreEquation: "Hisse Fiyatı = Mevcut Operasyonel Değer + Gelecekteki Değer Yaratma (CAP Yılları)",
    plainLanguageSummary:
      "Klasik DCF değerlemesinde analist 10 yıl sonrasını tahmin etmeye çalışır ve genellikle yanılır. Tersine DCF'te ise soru tersine çevrilir: 'Mevcut hisse fiyatının haklı çıkması için bu şirketin kaç yıl boyunca WACC'nin üzerinde ROIC kazanması gerekiyor?'",
    whyThisFormulaExists:
      "Hisse senedi fiyatı geleceğe dair bir beklenti paketidir. Eğer piyasa bir şirket için 25 yıllık hendek (CAP) fiyatlıyorsa ve sektör hızla değişiyorsa hisse aşırı pahalıdır. Eğer piyasa şirkete sadece 3 yıllık hendek biçmiş ama şirketin 15 yıllık patenti varsa hisse muazzam bir fırsattır.",
    variables: [
      {
        symbol: "Hisse Fiyatı (P)",
        name: "Güncel Borsa Fiyatı",
        description: "Borsada işlem gören anlık hisse fiyatı.",
        howToFindIt: "Borsa ekranından anlık fiyat.",
      },
      {
        symbol: "Mevcut NOPAT / WACC",
        name: "Sıfır Büyüme Değeri (Steady-State Value)",
        description: "Şirketin hiç büyümediği ve sadece mevcut kârını sonsuza kadar koruduğu senaryodaki değeri.",
        howToFindIt: "NOPAT / WACC.",
      },
      {
        symbol: "CAP (Yıl)",
        name: "Rekabetçi Avantaj Dönemi (Competitive Advantage Period)",
        description: "Şirketin ROIC > WACC farkını koruyabileceği yıl sayısı.",
        howToFindIt: "Tersine DCF modelinde hisse fiyatını eşitleyen yıl çözümü.",
      },
      {
        symbol: "İma Edilen Büyüme (%)",
        name: "Piyasanın Fiyatladığı Ciro Büyümesi",
        description: "Piyasa fiyatının tutması için gereken asgari yıllık büyüme.",
        howToFindIt: "Model denkleminden geriye doğru çözülür.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Sıfır Büyüme Değerini (Steady-State Value) Hesapla",
        formula: "Sıfır Büyüme Değeri = NOPAT / WACC",
        explanation: "100M TL NOPAT ve %10 WACC için şirket hiç büyümezse 1.000M TL eder.",
        exampleValues: "NOPAT = 100M, WACC = %10 -> 1.000M TL",
      },
      {
        stepNumber: 2,
        title: "Piyasa Değerinden Sıfır Büyüme Değerini Çıkar",
        formula: "Gelecek Beklenti Değeri = Piyasa Değeri - Sıfır Büyüme Değeri",
        explanation: "Piyasa Değeri 2.500M TL ise: Gelecek Beklentisi = 2.500M - 1.000M = 1.500M TL (%60'ı geleceğe bağlı!).",
        exampleValues: "Fiyatın %60'ı gelecekteki hendek süresine prim ödüyor.",
      },
      {
        stepNumber: 3,
        title: "İma Edilen CAP Yılını Çöz",
        formula: "CAP Yılı = f(Piyasa Fiyatı, Büyüme Oranı, ROIC, WACC)",
        explanation: "Bu fiyatı haklı çıkarmak için şirketin %15 ROIC ile tam 14 yıl boyunca rakiplere yenilmeden büyümesi gerekir.",
        exampleValues: "İma Edilen CAP = 14 Yıl",
      },
      {
        stepNumber: 4,
        title: "Hendek Gerçekliği ile Karşılaştır",
        formula: "Karar = Şirketin Gerçek Hendeği vs Piyasanın İma Ettiği CAP",
        explanation: "Siz şirketin hendek süresini 20 yıl olarak görüyorsanız hisse ucuzdur; 5 yıl görüyorsanız hisse aşırı pahalıdır.",
        exampleValues: "Stratejik Değerleme Kararı",
      },
    ],
    realWorldExample: {
      company: "Coca-Cola vs Yüksek Fiyatlı Teknoloji Balonu",
      scenario: "Piyasanın ima ettiği büyüme beklentisini test etmek.",
      calculationSteps: [
        "Coca-Cola hisse fiyatının ima ettiği CAP: 18 Yıl (Makul, çünkü marka sadakati 50 yıldır sürüyor).",
        "Moda E-ticaret Şirketi ima edilen CAP: 22 Yıl (Tehlikeli, çünkü müşteriler anında rakip uygulamaya geçebilir).",
      ],
      resultInterpretation:
        "Tersine DCF, geleceği tahmin etme stresinden kurtarıp 'Piyasa ne kadar hayalperest?' sorusunu cevaplar.",
    },
    commonPitfalls: [
      "Piyasa fiyatının sadece geçmiş performansı yansıttığını sanmak.",
      "Sonsuz büyüme oranını (%g) gerçek dışı yüksek alarak modelin patlamasına yol açmak.",
    ],
    calculatorType: "reverse-dcf",
  },
};

export const FORMULA_GUIDES_MAP = FORMULA_GUIDES_DATA;
export const FORMULA_GUIDES_LIST = Object.values(FORMULA_GUIDES_DATA);

