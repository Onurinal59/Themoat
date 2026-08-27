import { ChecklistItem } from "../types";

export const CHECKLIST_ITEMS_TR: ChecklistItem[] = [
  // 1. Giriş ve Temel Getiri
  {
    id: "chk-1",
    category: "1. Giriş & Getiri",
    question: "Şirket WACC (Sermaye Maliyeti) üzerinde bir ROIC (Sermaye Getirisi) elde ediyor mu?",
    explanation: "Şirketin yatırdığı paradan elde ettiği getiri, para maliyetinden yüksek olmalıdır (ROIC > WACC).",
    highScoreIndicator: "ROIC belirgin şekilde WACC'ın üzerinde (%15+ vs %8 WACC)",
    lowScoreIndicator: "ROIC WACC'ın altında veya başabaş",
  },
  {
    id: "chk-2",
    category: "1. Giriş & Getiri",
    question: "ROIC oranı artıyor mu, düşüyor mu yoksa istikrarlı mı?",
    explanation: "Yıllar içinde ROIC'in korunabilmesi rekabet avantajının kalıcılığını gösterir.",
    highScoreIndicator: "10+ yıldır istikrarlı veya yükselen yüksek ROIC",
    lowScoreIndicator: "Hızla düşen veya aşırı dalgalanan ROIC",
  },
  {
    id: "chk-3",
    category: "1. Giriş & Getiri",
    question: "Hisse fiyatının ne kadarı gelecekte yaratılacak yeni değeri yansıtıyor?",
    explanation: "Piyasanın şirketten aşırı agresif büyüme bekleyip beklemediğinin ölçümü.",
    highScoreIndicator: "Makul oranda (Fiyatın <%40'ı gelecek değer)",
    lowScoreIndicator: "Aşırı spekülatif (Fiyatın >%80'i gerçekleşmesi zor geleceğe bağlı)",
  },

  // 2. Sektör Yapısı ve Haritası (Lay of the Land)
  {
    id: "chk-4",
    category: "2. Sektör Haritası",
    question: "Sektördeki toplam ekonomik kâr (Profit Pool) nasıl dağılıyor ve şirket nerede?",
    explanation: "Kâr havuzunda şirket kârın büyük kısmını üreten kolda mı yoksa sermaye yutan kısımda mı?",
    highScoreIndicator: "Kâr havuzunun en yüksek getirili diliminde konumlanmış",
    lowScoreIndicator: "Sektörün para yutan ve zarar eden halkasında (Örn: Havayolu operatörlüğü)",
  },
  {
    id: "chk-5",
    category: "2. Sektör Haritası",
    question: "Sektördeki 5 yıllık pazar payı değişimi ne kadar istikrarlı?",
    explanation: "Greenwald kuralı: 5 yıllık ortalama pazar payı değişimi ≤ %2 ise istikrarlıdır.",
    highScoreIndicator: "Pazar payları çok stabil (Ortalama değişim < %2)",
    lowScoreIndicator: "Sürekli el değiştiren oynak pazar payları (Değişim > %5)",
  },
  {
    id: "chk-6",
    category: "2. Sektör Haritası",
    question: "Sektör yoğunlaşması (HHI / C4) nasıl bir seyir izliyor?",
    explanation: "İlk 4 şirketin pazar payı toplamı ve pazar liderlerinin gücü.",
    highScoreIndicator: "Oligopol yapı, az sayıda rasyonel büyük oyuncu",
    lowScoreIndicator: "Aşırı parçalanmış, binlerce fiyat kıran küçük rakip",
  },

  // 3. Porter 5 Güç: Tedarikçi, Alıcı, İkame
  {
    id: "chk-7",
    category: "3. Porter 5 Güç (Tedarikçi, Alıcı, İkame)",
    question: "Tedarikçilerin şirket üzerindeki pazarlık gücü ne düzeyde?",
    explanation: "Tedarikçi tekeli var mı, şirket maliyet artışlarını fiyata yansıtabiliyor mu?",
    highScoreIndicator: "Tedarikçiler parçalanmış, şirketin alım gücü ve alternatifi çok",
    lowScoreIndicator: "Tedarikçiler ikili tekel veya güçlü sendikalar (Örn: Havacılıkta Boeing/Airbus ve Pilotlar)",
  },
  {
    id: "chk-8",
    category: "3. Porter 5 Güç (Tedarikçi, Alıcı, İkame)",
    question: "Alıcıların (Müşterilerin) fiyat duyarlılığı ve pazarlık gücü ne düzeyde?",
    explanation: "Müşteriler fiyat karşılaştırmasını anında yapıp kolayca başka şirkete kaçabiliyor mu?",
    highScoreIndicator: "Müşteriler fiyat duyarsız, ürüne bağımlı ve sadık",
    lowScoreIndicator: "Müşteriler en ucuz 1 kuruşun peşinde, sadakat sıfır",
  },
  {
    id: "chk-9",
    category: "3. Porter 5 Güç (Tedarikçi, Alıcı, İkame)",
    question: "İkame ürünlerin tehdidi ne kadar yüksek?",
    explanation: "Farklı bir sektörden gelen ürün veya hizmet müşterinin ihtiyacını çözebilir mi?",
    highScoreIndicator: "Ürünün doğrudan veya dolaylı hiçbir ikamesi yok",
    lowScoreIndicator: "Hızlı tren veya görüntülü görüşme gibi güçlü ikameler mevcut",
  },

  // 4. Giriş Engelleri
  {
    id: "chk-10",
    category: "4. Giriş Engelleri",
    question: "Asgari Verimli Ölçek (MES) toplam pazarın büyük bir kısmını mı oluşturuyor?",
    explanation: "Yeni bir rakibin kârlı olabilmesi için devasa pazar payı kapması gerekiyor mu?",
    highScoreIndicator: "MES çok yüksek, küçük kalan rakipler birim maliyetten batar",
    lowScoreIndicator: "MES çok düşük, herkes ucuza dükkan açıp rekabet edebilir",
  },
  {
    id: "chk-11",
    category: "4. Giriş Engelleri",
    question: "Şirket güçlü doğrudan veya dolaylı Ağ Etkilerine (Network Effects) sahip mi?",
    explanation: "Kullanıcı sayısı arttıkça platformun değeri katlanarak büyüyor mu?",
    highScoreIndicator: "Kullanıcılar platformu terk edemiyor çünkü herkes orada (Uber, Visa, Apple)",
    lowScoreIndicator: "Ağ etkisi yok, tekil bağımsız ürün",
  },
  {
    id: "chk-12",
    category: "4. Giriş Engelleri",
    question: "Müşteri geçiş maliyetleri (Switching Costs / Lock-in) yüksek mi?",
    explanation: "Veri taşıma, yeniden öğrenme veya sözleşme cezaları müşteriyi tutuyor mu?",
    highScoreIndicator: "Geçiş maliyeti aşırı yüksek (Tüm kurumsal veriler ve alışkanlıklar bağlı)",
    lowScoreIndicator: "Sıfır geçiş maliyeti, tek tıkla rakibe geçilebilir",
  },
  {
    id: "chk-13",
    category: "4. Giriş Engelleri",
    question: "Şirket Wright Yasası (Öğrenme Eğrisi) sayesinde maliyet avantajına sahip mi?",
    explanation: "Yılların üretim birikimi ve tecrübesi birim maliyetleri rakiplerin erişemeyeceği yere çekti mi?",
    highScoreIndicator: "Kümülatif üretim devasa, birim maliyette rakipsiz lider",
    lowScoreIndicator: "Öğrenme eğrisi etkisi yok, standart jenerik süreç",
  },
  {
    id: "chk-14",
    category: "4. Giriş Engelleri",
    question: "Devlet regülasyonları, patentler ve lisanslar şirketi koruyor mu?",
    explanation: "'Regülasyon mevcut liderin dostudur' (Bill Gurley).",
    highScoreIndicator: "20 yıllık güçlü patentler, zorlu lisanslar ve mevzuat koruması",
    lowScoreIndicator: "Hiçbir yasal veya lisans engeli yok",
  },

  // 5. Yıkıcı İnovasyon ve Sektör Çözülmesi
  {
    id: "chk-15",
    category: "5. Yıkım ve Çözülme",
    question: "Sektör alt segmentten gelebilecek yıkıcı bir iş modeline açık mı?",
    explanation: "Liderler en pahalı müşteriye odaklanıp pazarın altını boş bıraktı mı (Overshooting)?",
    highScoreIndicator: "Şirket alt segmenti de kapsayan çok esnek ve verimli bir modele sahip",
    lowScoreIndicator: "Aşırı pahalı, karmaşık ve alt segmentten gelecek saldırılara karşı kırılgan",
  },
  {
    id: "chk-16",
    category: "5. Yıkım ve Çözülme",
    question: "Sektör dikey entegrasyondan yatay modüler yapıya dönüştü mü?",
    explanation: "Sektör standartlaştı mı yoksa hala tek çatı altında sıkı koordinasyon mu gerektiriyor?",
    highScoreIndicator: "Şirket sektörün ihtiyaç duyduğu doğru mimariyi (Dikey/Modüler) yönetiyor",
    lowScoreIndicator: "Modülerleşemeyen karmaşık yapıda tedarikçiler arasında kayboluyor",
  },

  // 6. Şirket İçi Analiz & Değer Çubuğu
  {
    id: "chk-17",
    category: "6. Şirket Analizi ve Değer Yaratımı",
    question: "Şirket müşterinin Ödemeye İstekliliğini (WTP) yukarı taşımayı başardı mı?",
    explanation: "Sadece fiyata zam yapmak yerine prestij, kalite veya zaman tasarrufu yarattı mı?",
    highScoreIndicator: "Müşteriler gönüllü olarak yüksek prim ödemeye razı",
    lowScoreIndicator: "Fiyat artırıldığı anda müşteriler hemen rakibe kaçıyor",
  },
  {
    id: "chk-18",
    category: "6. Şirket Analizi ve Değer Yaratımı",
    question: "Şirket tedarikçi ve çalışanların WTS'ini düşüren verimlilik ve kültüre sahip mi?",
    explanation: "Veri paylaşımı (Walmart-P&G) veya çalışan özerkliği (Costco/Lehman) ile maliyet tabanı indi mi?",
    highScoreIndicator: "Tedarikçiler ve çalışanlar şirketle çalışmaktan mutlu ve daha verimli",
    lowScoreIndicator: "Yüksek personel sirkülasyonu, tedarikçilerle sürekli kanlı bıçaklı kavga",
  },
  {
    id: "chk-19",
    category: "6. Şirket Analizi ve Değer Yaratımı",
    question: "DuPont ROIC ayrıştırmasında şirket hangi net avantaja sahip?",
    explanation: "Farklılaşma (Yüksek NOPAT Marjı) mı yoksa Maliyet Liderliği (Yüksek Sermaye Devri) mi?",
    highScoreIndicator: "Net ve tutarlı bir strateji (Ya Apple gibi devasa marj ya Costco gibi devasa devir hızı)",
    lowScoreIndicator: "Ortada sıkışmış (Stuck in the middle - Ne ucuz ne kaliteli)",
  },
  {
    id: "chk-20",
    category: "6. Şirket Analizi ve Değer Yaratımı",
    question: "Nakit Dönüşüm Süresi (CCC) ve işletme sermayesi verimli mi?",
    explanation: "Şirket parasını stoklara mı bağlıyor yoksa Amazon gibi negatif CCC ile mi büyüyor?",
    highScoreIndicator: "Negatif veya çok düşük CCC (Parayı peşin alıp tedarikçiyi vadeli öder)",
    lowScoreIndicator: "Parası aylarca depolardaki stoklarda kilitli kalıyor",
  },

  // 7. Oyun Teorisi ve Markalar
  {
    id: "chk-21",
    category: "7. Oyun Teorisi & Markalar",
    question: "Şirket komşu pazarlara 'Bağla ve Kaldıraçla' (Linking & Leveraging) stratejisiyle yayılabiliyor mu?",
    explanation: "Mevcut altyapısını kullanarak sıfır maliyetle yeni iş kolları açabiliyor mu (Amazon AWS)?",
    highScoreIndicator: "Ana platformunu kaldıraç yaparak devasa yan sektörlere hükmediyor",
    lowScoreIndicator: "Tek bir ürüne sıkışmış, genişleme yeteneği yok",
  },
  {
    id: "chk-22",
    category: "7. Oyun Teorisi & Markalar",
    question: "Marka, tüketicinin arama maliyetini veya risk algısını azaltarak somut bir WTP primi yaratıyor mu?",
    explanation: "Tiffany vs Costco pırlanta testi: İnsanlar marka güvencesi için fazladan ödüyor mu?",
    highScoreIndicator: "Marka tartışmasız fiyat primi veya alışkanlık yaratıyor (Tiffany, Coca-Cola)",
    lowScoreIndicator: "Marka sadece bir logo, hiçbir fiyat esnekliği sağlamıyor",
  }
];

export const CHECKLIST_ITEMS_EN: ChecklistItem[] = [
  // 1. Introduction & Return
  {
    id: "chk-1",
    category: "1. Intro & Returns (Introduction)",
    question: "Does the company earn a ROIC (Return on Invested Capital) well above its WACC (Cost of Capital)?",
    explanation: "The return earned on deployed capital must sustainably exceed capital financing cost (ROIC > WACC).",
    highScoreIndicator: "ROIC substantially above WACC (15%+ vs 8% WACC)",
    lowScoreIndicator: "ROIC below or parity with WACC",
  },
  {
    id: "chk-2",
    category: "1. Intro & Returns (Introduction)",
    question: "Is the ROIC spread expanding, stable, or rapidly decaying toward market mean?",
    explanation: "Preserving superior ROIC over 10+ years signals an authentic durable moat.",
    highScoreIndicator: "10+ years of high, stable or rising ROIC",
    lowScoreIndicator: "Rapidly decaying or erratic ROIC swings",
  },
  {
    id: "chk-3",
    category: "1. Intro & Returns (Introduction)",
    question: "How much of current stock valuation reflects future value creation vs steady-state value?",
    explanation: "Measuring whether market expectations demand hyper-aggressive future growth (Reverse DCF).",
    highScoreIndicator: "Prudent valuation (Future growth <40% of market cap)",
    lowScoreIndicator: "Hyper-speculative (Future expectations >80% of price)",
  },

  // 2. Lay of the Land (Industry Map)
  {
    id: "chk-4",
    category: "2. Industry Map (Lay of the Land)",
    question: "How is total economic profit distributed across the industry's profit pool, and where is the firm?",
    explanation: "Is the firm positioned in the high-spread segment or in a capital-draining bottleneck?",
    highScoreIndicator: "Dominates the highest-spread segment of the value chain",
    lowScoreIndicator: "Stuck in capital-intensive, commoditized segment (e.g. Airline operator)",
  },
  {
    id: "chk-5",
    category: "2. Industry Map (Lay of the Land)",
    question: "How stable has market share been across the last 5 years (Greenwald Metric)?",
    explanation: "Greenwald rule: An average 5-year market share fluctuation ≤2% indicates stable moat dynamics.",
    highScoreIndicator: "Very stable market shares (Average annual shift <2%)",
    lowScoreIndicator: "Volatile, constantly shifting market shares (Shift >5%)",
  },
  {
    id: "chk-6",
    category: "2. Industry Map (Lay of the Land)",
    question: "What is the industry concentration level (HHI / C4 ratio) and competitor rationality?",
    explanation: "High concentration among rational players limits destructive price wars.",
    highScoreIndicator: "Disciplined oligopoly with rational leaders",
    lowScoreIndicator: "Hyper-fragmented with thousands of desperate price-cutting rivals",
  },

  // 3. Porter's Five Forces
  {
    id: "chk-7",
    category: "3. Porter 5 Forces (Suppliers, Buyers, Subs)",
    question: "What is the degree of supplier bargaining power over the firm?",
    explanation: "Does a supplier monopoly exist, or can the firm dictate procurement terms and pass on costs?",
    highScoreIndicator: "Fragmented suppliers; firm holds monopsony purchasing scale",
    lowScoreIndicator: "Duopoly suppliers or powerful unions (e.g. Boeing/Airbus & Pilot unions in aviation)",
  },
  {
    id: "chk-8",
    category: "3. Porter 5 Forces (Suppliers, Buyers, Subs)",
    question: "What is buyer price sensitivity and bargaining leverage?",
    explanation: "Can customers easily compare prices and defect to alternatives with zero penalty?",
    highScoreIndicator: "Inelastic demand; captive, loyal customer base",
    lowScoreIndicator: "Extreme price sensitivity; zero switching loyalty",
  },
  {
    id: "chk-9",
    category: "3. Porter 5 Forces (Suppliers, Buyers, Subs)",
    question: "How severe is the threat of direct and indirect substitute products?",
    explanation: "Can alternative technologies from other sectors fulfill the same job-to-be-done?",
    highScoreIndicator: "No viable direct or indirect technological substitutes exist",
    lowScoreIndicator: "Strong emerging substitutes (e.g. High-speed rail or video conferencing for regional flights)",
  },

  // 4. Barriers to Entry
  {
    id: "chk-10",
    category: "4. Barriers to Entry",
    question: "Does Minimum Efficient Scale (MES) constitute a substantial share of total market demand?",
    explanation: "Must a new entrant capture huge market share immediately to avoid crushing unit-cost penalties?",
    highScoreIndicator: "MES is very high; sub-scale entrants suffer fatal cost disadvantages",
    lowScoreIndicator: "MES is minimal; anyone can enter with negligible capital",
  },
  {
    id: "chk-11",
    category: "4. Barriers to Entry",
    question: "Does the company benefit from direct or two-sided Network Effects?",
    explanation: "Does each new user non-linearly increase platform value for all other users?",
    highScoreIndicator: "Self-reinforcing network lock-in (Visa, Apple iOS, Uber)",
    lowScoreIndicator: "No network effects; standalone commodity product",
  },
  {
    id: "chk-12",
    category: "4. Barriers to Entry",
    question: "Are customer Switching Costs and procedural lock-in substantial?",
    explanation: "Do data migration, retraining, contract fees, or operational risk deter switching?",
    highScoreIndicator: "Mission-critical enterprise software / deep workflow entanglement",
    lowScoreIndicator: "Zero friction switching; customer can defect in one click",
  },
  {
    id: "chk-13",
    category: "4. Barriers to Entry",
    question: "Does the firm hold an insurmountable cost advantage from Wright's Law (Learning Curve)?",
    explanation: "Has cumulative production volume driven down unit costs below any rival's reach?",
    highScoreIndicator: "Decades of cumulative scale and proprietary yield advantages",
    lowScoreIndicator: "Standard generic manufacturing with no proprietary learning curves",
  },
  {
    id: "chk-14",
    category: "4. Barriers to Entry",
    question: "Are government regulations, patents, and exclusive concessions protecting the incumbent?",
    explanation: "'Regulation is the incumbent's best friend' (Bill Gurley).",
    highScoreIndicator: "20-year unexpired patents, strict regulatory licenses and concessions",
    lowScoreIndicator: "No legal, regulatory, or intellectual property protections",
  },

  // 5. Disruption & Unbundling
  {
    id: "chk-15",
    category: "5. Disruption & Unbundling",
    question: "Is the industry vulnerable to low-end or new-market Christensen Disruption?",
    explanation: "Have incumbents overshot mainstream needs with complex, expensive products?",
    highScoreIndicator: "Firm actively controls low-end modular models with extreme cost agility",
    lowScoreIndicator: "Overshot high-end product, highly vulnerable to agile low-cost entrants",
  },
  {
    id: "chk-16",
    category: "5. Disruption & Unbundling",
    question: "Has the industry architecture shifted from proprietary vertical integration to horizontal modularity?",
    explanation: "Does performance still require tight proprietary integration, or is it commoditized?",
    highScoreIndicator: "Firm commands the critical integration interface capturing all economic rents",
    lowScoreIndicator: "Trapped in commoditized layer with margins extracted by module standards",
  },

  // 6. Firm-Level Value Creation (Value Stick & DuPont)
  {
    id: "chk-17",
    category: "6. Value Stick & Firm Analysis",
    question: "Has the company successfully elevated customer Willingness-to-Pay (WTP)?",
    explanation: "Creating perceived differentiation through prestige, reliability, or time savings beyond price hikes.",
    highScoreIndicator: "Customers eagerly pay a significant premium for authentic differentiation",
    lowScoreIndicator: "Immediate customer defection on any price increase",
  },
  {
    id: "chk-18",
    category: "6. Value Stick & Firm Analysis",
    question: "Does the firm lower supplier Willingness-to-Sell (WTS) via operational culture and trust?",
    explanation: "Symbiotic data sharing (Walmart-P&G) or high employee efficiency lowering true cost base.",
    highScoreIndicator: "Suppliers & staff achieve superior productivity partnering with the firm",
    lowScoreIndicator: "High employee turnover and adversarial, zero-sum supplier disputes",
  },
  {
    id: "chk-19",
    category: "6. Value Stick & Firm Analysis",
    question: "Which clear strategic vector dominates the DuPont ROIC decomposition?",
    explanation: "Differentiation (High NOPAT Margin) vs Cost Leadership (High Capital Turnover)?",
    highScoreIndicator: "Focused, coherent strategy (e.g. Apple luxury margins or Costco asset velocity)",
    lowScoreIndicator: "Stuck in the middle (neither cost leader nor premium differentiator)",
  },
  {
    id: "chk-20",
    category: "6. Value Stick & Firm Analysis",
    question: "Is the Cash Conversion Cycle (CCC) and working capital engine optimized?",
    explanation: "Does the company fund growth with supplier credit via negative CCC (like Amazon)?",
    highScoreIndicator: "Negative or minimal CCC (collects cash upfront, pays vendors on term)",
    lowScoreIndicator: "Working capital tied up in slow-moving inventory and overdue receivables",
  },

  // 7. Game Theory & Brand Equity
  {
    id: "chk-21",
    category: "7. Game Theory & Brand Moat",
    question: "Can the firm execute 'Linking & Leveraging' into adjacent markets at near-zero marginal cost?",
    explanation: "Leveraging core infrastructure to dominate secondary verticals (like Amazon AWS)?",
    highScoreIndicator: "Mastery of platform infrastructure scaling effortlessly into huge adjacencies",
    lowScoreIndicator: "Trapped in single stagnant vertical with zero cross-leverage",
  },
  {
    id: "chk-22",
    category: "7. Game Theory & Brand Moat",
    question: "Does brand equity tangibly reduce customer search costs or perceived risk to generate WTP premium?",
    explanation: "Tiffany vs Costco diamond test: Do customers pay a verifiable premium for brand trust?",
    highScoreIndicator: "Brand generates indisputable pricing power and ingrained consumer habit (Coca-Cola, Tiffany)",
    lowScoreIndicator: "Brand is merely a logo with zero pricing flexibility",
  }
];

export const CHECKLIST_ITEMS = CHECKLIST_ITEMS_TR;

export function getChecklistItems(isEnglish: boolean): ChecklistItem[] {
  return isEnglish ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS_TR;
}
