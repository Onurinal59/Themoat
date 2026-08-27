import { LearningModule } from "../types";

export const MODULES_DATA: LearningModule[] = [
  {
    id: 1,
    slug: "hendek-ve-deger-yaratma",
    title: "1. Adım: Şato, Timsahlı Hendek & Gerçek Değer Yaratma",
    subtitle: "Sıfırdan Başlangıç: Bir Şirket Gerçekte Ne Zaman Değer Üretir?",
    estimatedMinutes: 14,
    iconName: "Shield",
    description:
      "Warren Buffett'ın ünlü ekonomik hendek metaforu, sermaye getirisi (ROIC), sermaye maliyeti (WACC) ve 'Ciro Yapmak' ile 'Hissedar Değeri Yaratmak' arasındaki hayati matematiksel fark.",
    zeroKnowledgeSummary:
      "Hiç finans bilmeseniz bile: Bir bakkal veya limonata tezgahı açtığınızı düşünün. Bankadan veya ailenizden %10 faizle para alıp, dükkandan sadece %5 kâr ediyorsanız; dükkan tıklım tıklım olsa ve rekor satış yapsanız bile gizlice servet eritiyorsunuzdur! Gerçek değer üretimi, faaliyet kârınızın (ROIC) sermaye maliyetinizi (WACC) aştığı anda başlar.",
    sourceAndAssumption: {
      primarySource: "Mauboussin & Callahan (2024), ss. 3–7",
      secondarySource: "Morningstar Equity Research (2024)",
      scopeNote: "Bu modül, Mauboussin & Callahan’ın ROIC–WACC ve sürdürülebilirlik yaklaşımından uyarlanmıştır. Hesaplamalar öğretim amaçlı bir modeldir; sonuçlar girilen NOPAT, sermaye ve WACC varsayımlarına bağlıdır.",
      assumptions: [
        "Vergi kalkanı kurumlar vergisi oranı üzerinden hesaplanmıştır.",
        "Simülatör çıktıları kesin tahmin değil, parametrik senaryo modellemesidir."
      ]
    },
    moduleBridge: {
      transitionQuestion: "Bir şirket ne zaman gerçek bir zenginlik üretir ve bu zenginliği rakiplerinden nasıl korur?",
      nextTitle: "2. Adım: Şirket Yaşam Döngüsü (Dickinson Modeli)",
      whyNext: "ROIC ve WACC'nin değer yaratma matematiğini öğrendik. Ancak şirketlerin bu yüksek getiriyi ömürleri boyunca sürekli üretmesi mümkün müdür? Şirketin takvim yaşına değil, nakit akışı evresine bakarak ne zaman zirvede olduğunu tespit etmeliyiz.",
      previewQuestion: "Bir şirketin nakit akış tablosundaki (+ / -) işaretleri onun gerçek yaşını ve ROIC potansiyelini nasıl ele verir?",
    },
    sections: [
      {
        id: "m1-s1",
        title: "1. Warren Buffett'ın Şato ve Hendek Metaforu",
        summary: "Şirketler birer ekonomik kale, rakipler ise o kaleyi ele geçirmek isteyen akıncılardır.",
        content: [
          "Düşünün ki sokağınızda çok lezzetli kahve yapan, tıklım tıklım dolu harika bir kafe açtınız. Kapitalizmin doğası gereği, sizin bu yüksek kârınızı gören onlarca girişimci hemen yan dükkanda benzer kafeler açacaktır.",
          "Warren Buffett şöyle der: 'Biz her işletmeyi bir ekonomik şato olarak düşünürüz. Ve serbest piyasada şatolar sürekli saldırıya uğramaya mahkumdur. Milyonlarca insan o kârı sizden nasıl alacağını düşünür. Asıl soru şudur: O şatoyu koruyan nasıl bir hendeğiniz var?'",
          "Ekonomik Hendek (Economic Moat), rakiplerinizin sizin kârınızı ve müşterilerinizi çalmasını engelleyen, aşılması son derece zor bir koruma kalkanıdır. Hendek ne kadar geniş ve derinse, şirket o kadar uzun yıllar yüksek kâr etmeye devam eder.",
          "Morningstar’ın 2024’te değerlendirdiği 1.600’den fazla şirketin yaklaşık %17’si 'wide moat' (geniş hendek) olarak derecelendirildi. Morningstar bu etiketi, rekabet avantajının 20 yıldan uzun sürebileceğini beklediği şirketler için kullanır. (Kaynak: Mauboussin & Callahan (2024), s. 5; Morningstar derecelendirmeleri.)"
        ],
        analogyBox: {
          title: "🏰 Şato ve Timsahlı Hendek Benzetmesi",
          description:
            "Kalenin içindeki hazine: Şirketin kârları. Kaleye hücum eden askerler: Rakipler. Kalenin etrafındaki timsahlı su hendeği: Şirketin patentleri, marka gücü, ağ etkisi veya maliyet avantajı."
        },
        keyTakeaway:
          "Bir şirkete uzun vadeli yatırım yaparken ilk ve en temel soru şudur: Bu şirketin kârını rakiplerin taklitlerinden koruyan sürdürülebilir bir rekabet avantajı var mı?"
      },
      {
        id: "m1-s2",
        title: "2. ROIC ve WACC: Gerçek Değer Yaratmanın Matematiği & Terminal Deneyi",
        summary: "ROIC > WACC ise şirket gerçek bir değer üretir. Aksi halde şirket büyüdükçe hissedar servetini eritir.",
        content: [
          "ROIC (Return on Invested Capital - Yatırılan Sermayenin Getirisi): Şirketin fabrikalarına, mağazalarına, makinelerine ve işletme sermayesine bağladığı her 100 TL ile yılda kaç TL net faaliyet kârı (NOPAT) ürettiğidir.",
          "WACC (Sermaye Maliyeti): Şirketin bu fonları bulmasının (özsermaye fırsat maliyeti + net borç faizi) ağırlıklı yıllık taban maliyetidir.",
          "Bu hesaplama öğretim amaçlı bir modeldir. Sonuç; NOPAT, yatırılmış sermaye ve maddi olmayan varlık düzeltmeleri için seçilen varsayımlara bağlıdır. (Kaynak: Mauboussin & Callahan (2024), s. 52 ve ss. 70–72.)",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde soldaki NOPAT sürgüsünü yukarı çekin; sağdaki grafikte yeşil Ekonomik Yayılım (Spread) çubuğunun nasıl büyüdüğünü ve yıllık refah üretiminin katlandığını canlı izleyin.",
          "Sermaye Tuzağını Keşfedin: WACC sürgüsünü ROIC'nin üzerine çıkarın. Şirket milyarlarca TL muhasebe kârı açıklasa bile sağdaki göstergenin kırmızıya dönüştüğünü ve büyüdükçe servet erittiğini (Value Destruction) anında teşhis edin."
        ],
        interactiveWidgetId: "roic-wacc",
        formulaBox: {
          title: "WACC & ROIC ve Ekonomik Yayılım (Spread) Eşitliği",
          equation: "WACC = (E/V × Ke) + (D/V × Kd × (1 - t))\nROIC = NOPAT / Yatırılan Sermaye\nEkonomik Yayılım (Spread) = ROIC - WACC",
          variables: [
            { symbol: "E / V", label: "Özsermaye Ağırlığı", desc: "Piyasa Değeri / Toplam Sermaye (%70)" },
            { symbol: "Ke", label: "Özsermaye Maliyeti", desc: "CAPM: Risksiz Faiz + Beta × Risk Primi (%16)" },
            { symbol: "D / V", label: "Net Borç Ağırlığı", desc: "Finansal Borç / Toplam Sermaye (%30)" },
            { symbol: "Kd × (1 - t)", label: "Net Borç Maliyeti", desc: "Vergi Kalkanı Sonrası Faiz Oranı (%9)" },
            { symbol: "NOPAT", label: "Faaliyet Kârı", desc: "Vergi Sonrası Net Faaliyet Kârı (EBIT × (1 - t))" }
          ],
          exampleCalculation: "WACC = (0.70 × %16) + (0.30 × %12 × (1 - 0.25)) = %11.2 + %2.7 = %13.9\nROIC = 180 TL / 1.000 TL = %18.0\nEkonomik Yayılım = %18.0 - %13.9 = +%4.1 (Hissedar Değeri Yaratılıyor)"
        },
        stepByStepMath: "Adım 1: Özsermaye Maliyeti = %10 Risksiz Faiz + (1.2 Beta × %5 Risk Primi) = %16.0\nAdım 2: Net Borçlanma = %12 Faiz × (1 - 0.25 Vergi) = %9.0\nAdım 3: Ağırlıklı Ortalama = (0.70 × %16.0) + (0.30 × %9.0) = %13.9 WACC\nAdım 4: ROIC (%18.0) > WACC (%13.9) -> Yıllık +%4.1 Pozitif Ekonomik Yayılım",
        formulaDeepDiveId: "wacc",
        analogyBox: {
          title: "🍋 Limonata Standı Örneği & Simülasyon",
          description:
            "Standı kurmak için ailenizden %10 faizle (WACC = %10) 1.000 TL borç aldınız. Yaz sonunda 180 TL net kâr ettiniz (ROIC = %18). Ailenize 100 TL faiz ödedikten sonra cebinize 80 TL net refah kalır. Ama sadece 60 TL kâr etseydiniz (%6 ROIC), borcun faizini bile karşılayamazdınız!"
        },
        keyTakeaway:
          "ROIC sermaye maliyetini (WACC) aşmadıkça, ciro rekoru kıran şirketler bile aslında gizlice hissedar servetini yok etmektedir."
      },
      {
        id: "m1-s3",
        title: "3. Değer Yaratmanın Üç Boyutu: Triad (Yayılım × Yatırım Pisti × CAP Süresi)",
        summary: "Değer = Ekonomik Yayılım (Spread) × Yeniden Yatırılan Sermaye (I) × Sürdürülebilirlik Süresi (CAP).",
        content: [
          "Michael Mauboussin ve Dan Callahan'ın 'Measuring the Moat' çerçevesinde değer yaratımı tek bir katsayı değildir; üç temel bileşenin çarpımıdır (The Triad):",
          "1. Büyüklük (Magnitude / Spread): ROIC - WACC farkının ne kadar geniş olduğu.",
          "2. Yeniden Yatırım Hacmi (Reinvestment Runway / I): Şirketin bu yüksek getiri oranıyla (RONIC) ne kadarlık yeni sermaye yatırabildiği. (Tek başına yüksek ROIC yetmez; yüksek getiriyle yeniden yatırım yapabilenler bileşik büyüme yaratır).",
          "3. Sürdürülebilirlik & Ortalamaya Dönüş (Sustainability / CAP): Rekabet, taklit ve bazen şansın etkisinin azalması nedeniyle aşırı yüksek getiriler zaman içinde aşınabilir. Mauboussin ve Callahan’ın ABD şirketleri için 2013–2023 verisi, ROIC’nin on yıllık dönemde belirgin biçimde ortalamaya döndüğünü gösterir. Ancak aşınma hızı sektör, iş modeli ve savunma mekanizmasına göre değişir. (Kaynak: Mauboussin & Callahan (2024), s. 3.)",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde başlangıç ROIC'sini ve Aşınma Hızını (Fade Rate) değiştirin; simülatörün öğretim amaçlı bir senaryo modeli olduğunu unutmadan, kâr yayılımının WACC çizgisine nasıl yaklaştığını gözlemleyin."
        ],
        interactiveWidgetId: "cap-fade",
        formulaBox: {
          title: "Bileşik Değer Yaratma Üçlüsü (The Value Triad)",
          equation: "Kümülatif Hissedar Değeri = Σ [ Yatırılan Sermaye(t) × (ROIC(t) - WACC) / (1 + WACC)^t ]\nBüyüme Hızı (g) = Yeniden Yatırım Oranı (b) × Yeni Yatırımların Getirisi (RONIC)",
          variables: [
            { symbol: "Spread", label: "Ekonomik Yayılım", desc: "ROIC - WACC (Birim sermaye başına yaratılan fazla getiri)" },
            { symbol: "Runway (b)", label: "Yatırım Pisti", desc: "Faaliyet kârının ne kadarının yüksek getiriyle işe geri yatırılabildiği" },
            { symbol: "CAP (Yıl)", label: "Hendek Süresi", desc: "Yayılımın pozitif kalabildiği rekabet koruma süresi" }
          ],
          exampleCalculation: "Şirket A: %40 ROIC, %10 Yeniden Yatırım = Yıllık %4 Büyüme (Temettü Makinesi)\nŞirket B: %18 ROIC, %80 Yeniden Yatırım = Yıllık %14.4 Büyüme (Bileşik Servet Devi)"
        },
        formulaDeepDiveId: "roic",
        analogyBox: {
          title: "🏃‍♂️ Depar vs Maraton Koşucusu",
          description:
            "Çok hızlı koşan bir koşucu 100 metrede rekor kırabilir ama 42 kilometrelik maratonda yorulup yavaşlayabilir. Geniş hendekli şirketler, maraton boyunca tempolarını koruyan dünya şampiyonlarıdır."
        },
        keyTakeaway:
          "Yatırım dünyasında en büyük servetler, yüksek yayılımı (Spread) geniş bir yeniden yatırım pisti (Runway) ve uzun bir hendek ömrüyle (CAP) birleştiren şirketlerden doğar."
      }
    ],
    quiz: [
      {
        id: "q1-1",
        question: "Warren Buffett'ın benzetmesinde 'Ekonomik Hendek' (Economic Moat) neyi ifade eder?",
        options: [
          "Şirketin aldığı banka kredisi miktarını",
          "Şirketin kârını rakiplerin taklit ve saldırılarından koruyan sürdürülebilir avantajını",
          "Şirketin bir yılda yaptığı toplam reklam harcamasını",
          "Şirketin çalışanlarına ödediği toplam maaş bütçesini"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Ekonomik hendek, şatoyu (şirketi ve kârlarını) dışarıdaki akıncılardan (rakiplerden) koruyan derin su çukuru gibi, rakiplerin kârları aşındırmasını engelleyen stratejik üstünlüktür."
      },
      {
        id: "q1-2",
        question: "Bir şirketin sermaye maliyeti (WACC) %10 ve yatırılan sermaye getirisi (ROIC) %7 ise ne gerçekleşmektedir?",
        options: [
          "Şirket hissedarları için harika bir ekonomik katma değer üretmektedir.",
          "Şirket muhasebede kâr etmesine rağmen sermaye fırsat maliyetini karşılayamadığı için değer yok etmektedir (Value Destruction).",
          "Şirketin hisse fiyatı kesinlikle ikiye katlanacaktır.",
          "Şirketin hiçbir borcu veya sermaye ihtiyacı kalmamıştır."
        ],
        correctAnswerIndex: 1,
        explanation:
          "ROIC (%7) < WACC (%10) olduğunda, şirket kullandığı paranın maliyetinden daha az getiri ürettiği için her yeni yatırımda aslında hissedar servetini eritmektedir."
      },
      {
        id: "q1-3",
        question: "WACC hesaplanırken borç faizinin (1 - t) ile çarpılmasının (Vergi Kalkanı) temel sebebi nedir?",
        options: [
          "Bankaların devlete ceza ödemesi",
          "Faiz giderlerinin kurumlar vergisinden düşülebilmesi sebebiyle borcun şirkete net maliyetinin ucuzlaması",
          "Hissedarların hiç vergi ödememesi",
          "Enflasyonun borçları silmesi"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Faiz ödemeleri gelir tablosunda vergiden önce düşüldüğü için şirketin vergi faturasını azaltır (Vergi Kalkanı). Bu yüzden borcun net maliyeti Kd × (1 - t) olur."
      }
    ]
  },
  {
    id: 2,
    slug: "sirket-yasam-donguleri",
    title: "2. Adım: Şirket Yaşam Döngüsü (Dickinson Modeli)",
    subtitle: "Önce Şirketin Hangi Yaşta Olduğunu Anla: Nakit Akışı Röntgeni",
    estimatedMinutes: 15,
    iconName: "TrendingUp",
    description:
      "Modül 1'de ROIC'i öğrendik. Peki şirketler hayatlarının hangi döneminde yüksek ROIC kazanır? Victoria Dickinson'ın 5 evreli nakit akışı yaşam döngüsü modeli ve 8 nakit akış kombinasyonu.",
    zeroKnowledgeSummary:
      "Bir bebeğin, üniversite öğrencisinin, çalışan bir yetişkinin ve emeklinin para harcama alışkanlıkları çok farklıdır. Şirketlerin yaşını da takvimdeki kuruluş yılı değil; nakit akış tablosundaki işaretler (+ / -) belirler. Kârı kağıt üstünde olup kasası boşalan şirketleri bu yöntemle anında yakalayabilirsiniz.",
    sourceAndAssumption: {
      primarySource: "Victoria Dickinson (2011), 'Cash Flow Patterns as a Proxy for Firm Life Cycle', The Accounting Review, 86(6), ss. 1969–1994.",
      scopeNote: "Nakit akışı işaretleri (+/-) şirket yaşam döngüsünü tespit etmek için ampirik bir göstergedir; tek başına mutlak bir tanı yerine sektörel ve operasyonel dinamiklerle birlikte değerlendirilmelidir.",
      assumptions: [
        "Faaliyet, yatırım ve finansman nakit akış yönleri standart muhasebe sınıflandırmasına dayanır.",
        "Simülatör çıktıları öğretim amaçlı senaryo analizidir."
      ]
    },
    moduleBridge: {
      prevTitle: "1. Adım: Şato, Timsahlı Hendek & Gerçek Değer Yaratma",
      takeawayFromPrev: "Bir şirket ancak ROIC > WACC olduğu zaman gerçek ekonomik refah üretir.",
      transitionQuestion: "Peki bir şirket ömrünün hangi evresinde bu yüksek ROIC'e ulaşır ve nakit basma makinesine dönüşür?",
      nextTitle: "3. Adım: Değer Çubuğu (Mikroekonomik Temeller)",
      whyNext: "Şirketin yaşam evresini ve nakit gücünü belirledik. Şimdi mikroskobumuzu tek bir ürünün fiyat ve maliyet yapısına yaklaştırıyoruz: Şirket kârını nereden çıkarır?",
      previewQuestion: "Müşterinin gönlündeki tavan değer (WTP) ile şirketin maliyet tabanı arasındaki rant nasıl paylaşılır?",
    },
    sections: [
      {
        id: "m2-s1",
        title: "1. Takvim Yaşı Neden Yanıltıcıdır?",
        summary: "100 yıllık bir şirket yeni bir sektöre girip gençleşebilir; 2 yıllık bir girişim erkenden çökebilir.",
        content: [
          "Geleneksel analizde şirketlerin kuruluş yılına bakılırdı. Ancak teknoloji çağında kuruluş tarihi şirketin hangi aşamada olduğunu göstermez.",
          "Muhasebe profesörü Victoria Dickinson (2011), şirketleri sınıflandırmak için ampirik bir yöntem geliştirdi: Şirketin Nakit Akış Tablosundaki 3 ana damarın işaretine (+ veya -) bakmak!",
          "Bu 3 damar: 1. CFO: Faaliyet Nakit Akışı (İşten gelen gerçek nakit), 2. CFI: Yatırım Nakit Akışı (Geleceğe harcanan fabrika/makine/Ar-Ge parası), 3. CFF: Finansman Nakit Akışı (Borçlanma/Hisse ihracı veya temettü/borç ödeme).",
          "Nakit akışı işaretleri güçlü bir ipucudur, ancak tek başına kesin ve değişmez bir tanı değildir; şirketin sektörel dinamikleriyle birlikte okunmalıdır."
        ],
        analogyBox: {
          title: "🌱 İnsan Yaşamı ile Şirket Yaşamı",
          description:
            "Bir üniversite öğrencisi henüz maaş alamaz (Faaliyet -), eğitimine para harcar (Yatırım -) ve ailesinden harçlık alır (Finansman +). Bu tam olarak 'Giriş Evresi' şirketidir!"
        },
        keyTakeaway:
          "Şirketin biyolojik yaşı yoktur; nakit hareketlerinin yönü şirketin yaşam evresini belirleyen ampirik bir göstergedir."
      },
      {
        id: "m2-s2",
        title: "2. 5 Yaşam Döngüsü Evresi ve Dickinson İşaretleri",
        summary: "Faaliyet, Yatırım ve Finansman akışlarının kombinasyonundan 5 temel evre türer.",
        content: [
          "1. Giriş (Introduction) [CFO: (-), CFI: (-), CFF: (+)]: Şirket henüz işinden nakit üretemez, yoğun yatırım yapar ve dışarıdan borç/yatırımcı parası bulur.",
          "2. Büyüme (Growth) [CFO: (+), CFI: (-), CFF: (+)]: Artık kendi işinden nakit üretir ama o kadar hızlı büyür ki hem kendi nakdini hem dış kaynakları yatırıma gömer.",
          "3. Olgunluk (Maturity) [CFO: (+), CFI: (-), CFF: (-)]: Şirket nakit basma makinesine dönmüştür! İşten nakit girer, yatırımlarını kendi karşılar ve üstüne borç öder ya da temettü dağıtır.",
          "4. Sarsıntı (Shake-Out) [Karışık Akışlar]: Sektörde büyüme yavaşlar, zayıf şirketler elenir, kârlar dalgalanır.",
          "5. Düşüş (Decline) [CFO: (-), CFI: (+), CFF: (+/-)]: İşten para gelmez, şirket varlıklarını ve fabrikalarını satarak nakit yaratmaya çalışır (CFI +).",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde soldaki kontrol panelinde örnek senaryoları seçin veya CFO/CFI/CFF işaretlerini manuel değiştirin. Sağdaki dağılım grafiğinde şirketin ömür evresini ve nakit profilini anında doğrulayın."
        ],
        interactiveWidgetId: "dickinson",
        interactiveVisualId: "dickinson-lifecycle",
        formulaBox: {
          title: "Victoria Dickinson Nakit Akışı Yaşam Döngüsü Modeli",
          equation: "Yaşam Döngüsü Evresi = Kombinasyon( CFO [Faaliyet], CFI [Yatırım], CFF [Finansman] )",
          variables: [
            { symbol: "CFO", label: "Faaliyet Nakit Akışı", desc: "Müşterilerden gelen gerçek nakit eksi faaliyet giderleri" },
            { symbol: "CFI", label: "Yatırım Nakit Akışı", desc: "Fabrika, makine, Ar-Ge ve duran varlık harcamaları (-: Alım, +: Satış)" },
            { symbol: "CFF", label: "Finansman Nakit Akışı", desc: "Kredi, hisse ihracı (+: Para Girişi) veya temettü/borç ödeme (-: Para Çıkışı)" }
          ],
          exampleCalculation: "Olgunluk Evresi: CFO (+300M TL) / CFI (-80M TL) / CFF (-150M TL)\nSonuç: Operasyon kendi kendini finanse ediyor, borçlar kapatılıyor ve hissedara temettü ödeniyor!"
        },
        formulaDeepDiveId: "dickinson",
        companyExample: {
          company: "Apple Inc. (Öğretim Senaryosu)",
          context: "Apple 1976'da garajda Giriş evresindeydi. 2007'de iPhone ile devasa bir Büyüme evresine girdi. Bugün ise operasyonel nakit fazlasıyla hisse geri alımı yapan Olgunluk evresindedir."
        },
        analogyBox: {
          title: "🍎 Büyüme ile Olgunluk Arasındaki Çizgi",
          description:
            "Bir şirket ne kadar hızlı büyürse büyüsün, olgunluğa ulaştığında kendi yatırımlarını finanse edip dış kaynağa ihtiyaç duymadan hissedara serbest nakit akışı (FCF) üretmelidir."
        },
        keyTakeaway:
          "Halka açık şirketlerin büyük kısmı Büyüme veya Olgunluk evresindedir; en sağlam ekonomik hendekler Olgunluk döneminde test edilir."
      }
    ],
    quiz: [
      {
        id: "q2-1",
        question: "Faaliyet Nakit Akışı (+), Yatırım Nakit Akışı (-) ve Finansman Nakit Akışı (-) olan bir şirket hangi evrededir?",
        options: [
          "Giriş (Introduction)",
          "Büyüme (Growth)",
          "Olgunluk (Maturity)",
          "Düşüş (Decline)"
        ],
        correctAnswerIndex: 2,
        explanation:
          "Olgunluk evresinde şirket kendi operasyonundan yüksek nakit üretir (+), yatırımlarını finanse eder (-) ve kalan nakitle borç öder veya temettü/hisse geri alımı yaparak finansman çıkışı (-) gerçekleştirir."
      },
      {
        id: "q2-2",
        question: "Dickinson analizinde Yatırım Nakit Akışının (CFI) pozitif (+) olması neyin işaretidir?",
        options: [
          "Şirketin harika yeni fabrikalar açtığının",
          "Şirketin operasyonel nakit açığını kapatmak için eski fabrikalarını veya duran varlıklarını sattığının (Düşüş/Kriz işareti)",
          "Şirketin borçsuz olduğunun",
          "Hissedarlara rekor temettü ödendiğinin"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Yatırım nakit akışının pozitif olması şirketin varlık satın almadığını, aksine elindeki bina, makine veya fabrikaları satarak nakit çıkardığını gösterir."
      }
    ]
  },
  {
    id: 3,
    slug: "deger-cubugu-mikroekonomi",
    title: "3. Adım: Değer Çubuğu (Mikroekonomik Temeller)",
    subtitle: "Müşterinin Gönlündeki Değer (WTP) vs Şirketin Maliyeti",
    estimatedMinutes: 16,
    iconName: "Sliders",
    description:
      "Şirketin evresini belirledik. Peki şirket ürün seviyesinde nasıl kâr yaratır? Felix Oberholzer-Gee'nin Değer Çubuğu (Value Stick): WTP, Fiyat, Maliyet ve WTS arasındaki rant paylaşımı.",
    zeroKnowledgeSummary:
      "İş dünyası sadece fiyata zam yapmaktan ibaret değildir. Başarılı şirketler müşterinin ürüne verdiği değeri (WTP) artırır veya tedarikçilerin maliyet tabanını (WTS) düşürerek pastayı herkes için büyütür. Müşteri aldığı fiyattan mutlu, tedarikçi sattığı maliyetten mutluysa şirket sürdürülebilir bir kâr marjı yakalar.",
    sourceAndAssumption: {
      primarySource: "Felix Oberholzer-Gee (2021), Better, Simpler Strategy: A Value-Based Guide to Exceptional Performance, Harvard Business Review Press.",
      scopeNote: "Değer Çubuğu modeli, birim mikroekonomiyi ve değer dağılımını görselleştiren analitik bir çerçevedir. Sayısal değerler öğretim amaçlı hipotetik birim senaryolarıdır.",
      assumptions: [
        "WTP = Tüketicinin ödemeye istekli olduğu azami tavan değer (Fiyat değildir).",
        "WTS = Tedarikçinin kabul edeceği asgari dip maliyet tabanı (Fiili maliyet değildir)."
      ]
    },
    moduleBridge: {
      prevTitle: "2. Adım: Şirket Yaşam Döngüsü (Dickinson Modeli)",
      takeawayFromPrev: "Şirketin nakit akış profili onun olgunluk kalesinde olduğunu kanıtladı.",
      transitionQuestion: "Peki bu kale, tek bir ürün veya hizmet satarken kârını mikro düzeyde nereden üretir?",
      nextTitle: "4. Adım: Sektör Haritası ve Kâr Havuzları",
      whyNext: "Ürün bazında kârın WTP ve Maliyet farkından doğduğunu gördük. Peki şirket bu kârı tek başına mı kazanır, yoksa sektördeki diğer oyuncular (tedarikçiler, aracılar) bu kârı süpürür mü?",
      previewQuestion: "Bir sektörde milyarlarca liralık toplam kâr gerçekte hangi halkada toplanır?",
    },
    sections: [
      {
        id: "m3-s1",
        title: "1. Değer Çubuğunun 4 Kritik Çizgisi: WTP vs Fiyat, Maliyet vs WTS",
        summary: "Bir ürünün yolculuğu müşterinin kafasındaki tavan değer ile tedarikçinin dip maliyeti arasında gerçekleşir.",
        content: [
          "Değer Çubuğunda iki yaygın kavram karmaşasını düzeltmek gerekir:",
          "1. WTP (Willingness to Pay) ile Fiyat aynı şey DEĞİLDİR: WTP, müşterinin o ürün için cebinden çıkarmaya razı olduğu en yüksek tavan değerdir. Fiyat ise kasada fiilen talep edilen etiket tutarıdır. Tüketici Rantı = WTP - Fiyat.",
          "2. WTS (Willingness to Sell) ile Maliyet aynı şey DEĞİLDİR: WTS, tedarikçinin veya çalışanın razı olduğu asgari dip taban fiyattır. Maliyet ise şirketin fiilen ödediği tutardır. Tedarikçi Rantı = Maliyet - WTS.",
          "Şirket Kârı = Fiyat - Maliyet. Toplam Yaratılan Değer = WTP - WTS.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde WTP, Fiyat, Maliyet ve WTS sürgülerini oynatın. Değer Çubuğu grafiğinde Tüketici Rantı (mavi), Şirket Kârı (yeşil) ve Tedarikçi Rantının (mor) nasıl genişleyip daraldığını gözlemleyin."
        ],
        interactiveVisualId: "value-stick",
        formulaBox: {
          title: "Felix Oberholzer-Gee Değer Çubuğu Eşitlikleri",
          equation: "Toplam Yaratılan Değer = WTP - WTS\nTüketici Rantı = WTP - Fiyat\nŞirket Kârı = Fiyat - Maliyet\nTedarikçi Rantı = Maliyet - WTS",
          variables: [
            { symbol: "WTP", label: "Ödemeye İsteklilik", desc: "Müşterinin ürüne biçtiği azami tavan değer (Fiyat değil)" },
            { symbol: "Fiyat", label: "Etiket Fiyatı", desc: "Kasada fiilen tahsil edilen satış bedeli" },
            { symbol: "Maliyet", label: "Birim Maliyet", desc: "Şirketin hammadde, işçilik ve operasyon maliyeti" },
            { symbol: "WTS", label: "Satmaya İsteklilik", desc: "Tedarikçinin razı olduğu asgari taban eşiği (Maliyet değil)" }
          ],
          exampleCalculation: "WTP (100 TL) - Fiyat (60 TL) = 40 TL Tüketici Rantı\nFiyat (60 TL) - Maliyet (25 TL) = 35 TL Şirket Kârı\nMaliyet (25 TL) - WTS (15 TL) = 10 TL Tedarikçi Rantı\nToplam Refah = 100 - 15 = 85 TL"
        },
        formulaDeepDiveId: "value-stick",
        interactiveWidgetId: "value-stick",
        analogyBox: {
          title: "☕ Bir Fincan Özel Kahve",
          description:
            "Çok sevdiğiniz bir kahve için 100 TL vermeye razısınız (WTP = 100 TL). Kafe bunu 60 TL'ye satıyor (Fiyat = 60 TL). Kahvenin kafe için maliyeti 25 TL (Maliyet = 25 TL). Kahve çekirdeğini getiren çiftçi ise en az 15 TL'ye razıydı (WTS = 15 TL)."
        },
        keyTakeaway:
          "Toplam yaratılan değer (WTP - WTS) ne kadar genişse, paylaşılabilecek refah o kadar büyüktür. Kalıcı hendek, bu çubuğu iki uçtan genişletmekle inşa edilir."
      },
      {
        id: "m3-s2",
        title: "2. Rantlar ve Değer Bölüşümü: Kim Ne Kazanır?",
        summary: "Pasta 3 parça arasında paylaşılır: Tüketici Rantı, Şirket Kârı ve Tedarikçi Rantı.",
        content: [
          "Tüketici Rantı (Consumer Surplus) = WTP - Fiyat. Müşteri 100 TL değer biçtiği şeye 60 TL ödeyince 40 TL'lik 'iyi ki aldım' mutluluğu yaşar. Memnun müşteri sadakat gösterir.",
          "Şirket Değer Yaratımı / Kârı (Firm Value Creation) = Fiyat - Maliyet. Şirket 60 TL'ye satıp 25 TL harcadığında 35 TL brüt faaliyet kârı elde eder.",
          "Tedarikçi / Çalışan Rantı (Supplier Surplus) = Maliyet - WTS. Tedarikçi en az 15 TL'ye razıyken şirketten 25 TL aldığında 10 TL'lik kazanç elde eder.",
          "Şirketlerin değer yaratmasının 2 yolu vardır: Ya üst çizgiyi (WTP) yukarı itmek (Farklılaşma Stratejisi) ya da alt çizgiyi (WTS) aşağı çekmek (Düşük Maliyet Liderliği)."
        ],
        analogyBox: {
          title: "🤝 Sıfır Toplamlı Oyun vs Kazan-Kazan",
          description:
            "Kötü şirketler tedarikçinin boğazını sıkarak maliyeti düşürmeye çalışır (sıfır toplamlı). Harika şirketler ise tedarikçiye veri paylaşımı yaparak onun işini kolaylaştırır ve WTS'ini aşağı çeker (kazan-kazan)."
        },
        keyTakeaway:
          "Sadece zam yaparak kâr artırmaya çalışmak tehlikelidir; sürdürülebilir başarı müşterinin ödeme isteğini (WTP) yükselterek tüketici rantını büyütmekten geçer."
      }
    ],
    quiz: [
      {
        id: "q3-1",
        question: "Bir müşteri bir kulaklığa en fazla 2.000 TL ödemeye razıyken (WTP), mağaza bu kulaklığı 1.400 TL'ye satıyorsa Tüketici Rantı (Consumer Surplus) nedir?",
        options: ["3.400 TL", "2.000 TL", "600 TL", "0 TL"],
        correctAnswerIndex: 2,
        explanation:
          "Tüketici Rantı = WTP (2.000 TL) - Fiyat (1.400 TL) = 600 TL. Müşteri zihninde 600 TL'lik bir kâr ve memnuniyet elde ettiğini hisseder."
      },
      {
        id: "q3-2",
        question: "Değer Çubuğunda (Value Stick) 'Farklılaşma Stratejisi' (Differentiation) temel olarak hangi çizgiyi yukarı taşımayı hedefler?",
        options: ["WTS (Satmaya İsteklilik)", "Maliyet (Cost)", "WTP (Ödemeye İsteklilik)", "Banka Kredi Faizi"],
        correctAnswerIndex: 2,
        explanation:
          "Farklılaşma stratejisi; üstün tasarım, kalite, marka ve hizmetle müşterinin ürüne biçtiği tavan değeri (WTP - Willingness to Pay) yukarı taşır."
      }
    ]
  },
  {
    id: 4,
    slug: "sektor-analizi-ve-haritasi",
    title: "4. Adım: Sektör Haritası ve Kâr Havuzları",
    subtitle: "Dış Çevre: Sektörün Cazibesi vs Şirketin Üstünlüğü",
    estimatedMinutes: 16,
    iconName: "Compass",
    description:
      "Ürün bazında değer yaratmayı anladık. Şimdi mikrodan sektöre çıkıyoruz: Sektörün cazibesi ile şirketin bireysel üstünlüğünü ayırt etme, kâr havuzu haritalama ve Bruce Greenwald pazar payı istikrarı.",
    zeroKnowledgeSummary:
      "Dünyanın en yetenekli kaptanı bile olsanız, su alan batık bir gemide yüzemezsiniz. Bazı sektörler doğası gereği para yutar, bazıları ise yüksek getiri üretir. Ancak unutmayın: Sektörün kârlı olması şirketin hendeği olduğu anlamına gelmez. Bu modülde sektör haritasını ve kâr havuzlarını inceliyoruz.",
    sourceAndAssumption: {
      primarySource: "Mauboussin & Callahan (2024), ss. 10–18; Michael E. Porter (2008), 'The Five Competitive Forces That Shape Strategy', HBR.",
      secondarySource: "Bruce Greenwald & Judd Kahn (2005), Competition Demystified.",
      scopeNote: "Sektörel kâr havuzu analizi, sermaye dağılımı ile ekonomik kâr yoğunlaşmasını inceler. Havacılık ve teknoloji verileri tarihsel öğretim senaryolarıdır.",
      assumptions: [
        "Pazar payı istikrarı için Greenwald kuralı (5 yıllık ortalama değişim ≤ %2) kullanılmıştır.",
        "Kâr havuzu kutu alanı = Sermaye Payı × (ROIC - WACC)."
      ]
    },
    moduleBridge: {
      prevTitle: "3. Adım: Değer Çubuğu (Mikroekonomik Temeller)",
      takeawayFromPrev: "Tek bir ürün satışında kârın WTP ve Maliyet farkından doğduğunu öğrendik.",
      transitionQuestion: "Peki bu kârı sektör genelinde kim kazanıyor? Neden bazı halkalar kan ağlarken bazıları köşeyi dönüyor?",
      nextTitle: "5. Adım: Porter'ın 5 Gücü, Giriş Engelleri & 10-K Dipnotları",
      whyNext: "Kâr havuzunda paranın nereye aktığını tespit ettik. Peki o kârlı havuza yeni rakiplerin hücum etmesini ne engeller? Michael Porter'ın 5 gücünü ve kaleyi koruyan 7 giriş engelini çözüyoruz.",
      previewQuestion: "Rakipleri kapıda tutan 7 zırh (Ölçek, Ağ Etkisi, Geçiş Maliyeti vb.) nedir?",
    },
    sections: [
      {
        id: "m4-s1",
        title: "1. Sektör Haritası Çıkarmak: Sektör Cazibesi vs Şirket Avantajı",
        summary: "Sektörün genel getirisi yüksek olabilir; ancak sürdürülebilir kâr için şirketin kendine has bir avantajı olmalıdır.",
        content: [
          "Analizde ilk kural sektörün cazibesi ile şirketin rekabet avantajını birbirine karıştırmamaktır. Cazip bir sektörde vasat bir şirket kısa vadede para kazanabilir, fakat kalıcı hendek şirketin kendi yapısal korumasına bağlıdır.",
          "Havacılık Ekosistemi Örneği (Öğretim Senaryosu): Uçak üreticileri (Boeing, Airbus), Motor üreticileri (GE, Rolls-Royce), Havalimanları, Pilot sendikaları ve Rezervasyon sistemleri (Amadeus, Sabre).",
          "Havayolu operatörleri, güçlü tedarikçiler ile fiyata aşırı duyarlı müşteriler arasına sıkışmıştır."
        ],
        analogyBox: {
          title: "🥪 Sandviç Arasındaki Havayolları",
          description:
            "Havayolu şirketi sandviçin arasındaki peynir gibidir; üstten tekel uçak üreticileri ve havalimanları bastırır, alttan ise en ucuz bilet arayan yolcular bastırır."
        },
        keyTakeaway:
          "Sektör yapısı oyunun kurallarını belirler; şirketin hendeği ise bu oyunda ortalamanın üzerinde getiri elde etmesini sağlar."
      },
      {
        id: "m4-s2",
        title: "2. Kâr Havuzu (Profit Pool) Analizi",
        summary: "Sektörde sermayeyi kim bağlıyor, kârı kim cebe indiriyor?",
        content: [
          "Kâr Havuzu, X ekseninde yatırılan sermaye payını (%0-%100), Y ekseninde ise ekonomik getiri oranını (ROIC - WACC) gösterir.",
          "Kutunun Alanı = Şirketin Toplam Ekonomik Kârı veya Zararıdır. Formül: Ekonomik Kâr = Yatırılan Sermaye × (ROIC - WACC).",
          "Havacılık Örneği: Havacılık sektörünün toplam sermayesinin büyük kısmını havayolları bağlamış ve tarihsel olarak düşük/negatif ekonomik kâr üretmiştir. Buna karşın az sermaye bağlayan Rezervasyon Sistemleri (GDS) yüksek ekonomik getiri oranlarına ulaşmıştır.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde sektör segmentlerini inceleyin; sermaye payı genişliği (X) ile getiri yayılımı (Y) alanının net ekonomik kâra nasıl dönüştüğünü senaryo parametreleriyle gözlemleyin."
        ],
        formulaBox: {
          title: "Ekonomik Kâr Havuzu (Profit Pool) Geometrisi",
          equation: "Ekonomik Kâr ($) = Yatırılan Sermaye ($) × [ ROIC (%) - WACC (%) ]\nSegment Alanı = Segment Sermaye Payı × Segment Yayılımı (Spread)",
          variables: [
            { symbol: "Sermaye Payı", label: "X Ekseni Genişliği", desc: "Segmentin sektördeki toplam sermaye ağırlığı" },
            { symbol: "ROIC - WACC", label: "Y Ekseni Yüksekliği", desc: "Segmentin birim sermaye başına yarattığı net yayılım" },
            { symbol: "Kutu Alanı", label: "Toplam Ekonomik Kâr", desc: "Segmentin hissedarlarına ürettiği net dolar bazlı değer" }
          ],
          exampleCalculation: "Havayolları: 100M$ Sermaye × (%5 ROIC - %9 WACC) = -4M$ Değer Yıkımı\nRezervasyon Sistemleri: 10M$ Sermaye × (%35 ROIC - %9 WACC) = +2.6M$ Net Değer!"
        },
        formulaDeepDiveId: "profit-pool",
        interactiveWidgetId: "profit-pool",
        analogyBox: {
          title: "🍿 Sinema Salonu vs Mısır Büfesi",
          description:
            "Sinema salonu devasa bina ve ses sistemi yatırımı yapar ama asıl net kârı lobideki 2 metrekarelik mısır ve gazoz standı kazanır."
        },
        keyTakeaway:
          "Büyük ciro veya devasa fabrikalar kâr garantisi değildir; kâr havuzunda yüksek getiri sağlayan niş halkayı bulmak esastır."
      },
      {
        id: "m4-s3",
        title: "3. Pazar Payı Değişkenliği (Bruce Greenwald Kuralı)",
        summary: "5 yıllık pazar payı değişimi ortalamada %2'nin altındaysa sektör istikrarlıdır.",
        content: [
          "Columbia Üniversitesi'nden Bruce Greenwald'a göre pazar paylarının sürekli el değiştirdiği aşırı oynak sektörlerde hendek kurmak zordur.",
          "Formül: Sektördeki her şirketin 5 yıllık pazar payı değişimlerinin mutlak değerlerinin ortalaması alınır.",
          "Eğer ortalama değişim ≤ %2 ise pazar istikrarlıdır.",
          "Eğer ortalama değişim > %2 ise sektör istikrarsızdır ve yıkıcı fiyat rekabeti riski yüksektir."
        ],
        analogyBox: {
          title: "💺 Sandalye Kapmaca Oyunu",
          description:
            "Müzik çaldıkça herkesin yer değiştirdiği oynak bir oyunda kalıcı kâr elde edemezsiniz; sandalyelerin sabit olduğu oturmuş salonlarda kârlar korunur."
        },
        keyTakeaway:
          "Pazar payı istikrarı yüksek olan sektörlerde şirketler fiyat kırmak yerine daha rasyonel rekabet eder."
      }
    ],
    quiz: [
      {
        id: "q4-1",
        question: "Kâr Havuzu (Profit Pool) analizinde bir sektör parçasının toplam ekonomik kârı geometrik olarak neye eşittir?",
        options: [
          "Sadece Y eksenindeki ROIC oranına",
          "Kutunun Alanına (Yatırılan Sermaye Payı × [ROIC - WACC] Getiri Oranı)",
          "Şirketin çalışan sayısına",
          "Yıllık enflasyon oranına"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Kâr havuzunda X ekseni yatırılan sermayeyi, Y ekseni (ROIC - WACC) farkını temsil eder; dikdörtgenin alanı ise o grubun toplam net ekonomik kârını verir."
      },
      {
        id: "q4-2",
        question: "Bruce Greenwald'ın pazar payı istikrarı kuralına göre 5 yıllık ortalama pazar payı değişimi neyin altında olduğunda sektör 'istikrarlı' kabul edilir?",
        options: ["%20", "%10", "%2 veya daha az", "%0.01"],
        correctAnswerIndex: 2,
        explanation:
          "5 yıllık ortalama mutlak pazar payı değişimi %2 veya daha düşükse sektörün istikrarlı ve hendek korumaya elverişli olduğu kabul edilir."
      }
    ]
  },
  {
    id: 5,
    slug: "porter-bes-guc-giris-engelleri",
    title: "5. Adım: Porter'ın 5 Gücü, Giriş Engelleri & 10-K Dipnotları",
    subtitle: "Rakipleri Kapıda Tutan Zırh: 7 Giriş Engeli ve Raporlanan vs Düzeltilmiş ROIC",
    estimatedMinutes: 18,
    iconName: "Lock",
    description:
      "Sektör haritasını çıkardık. Şimdi rakiplerin içeri girmesini engelleyen kaleleri inceliyoruz: Michael Porter'ın 5 Gücü, 7 Giriş Engeli ve Ar-Ge/Kira kapitalizasyonu ile düzeltilmiş ROIC analizi.",
    zeroKnowledgeSummary:
      "Yüksek pazar payı tek başına bir hendek değildir; asıl mesele yeni bir rakibin pazara girmesinin ne kadar zor olduğudur. Ayrıca muhasebe kuralları Ar-Ge harcamalarını gider yazar; bu modülde raporlanan muhasebe rakamları ile analitik düzeltilmiş ROIC arasındaki farkı inceliyoruz.",
    sourceAndAssumption: {
      primarySource: "Mauboussin & Callahan (2024), ss. 20–35 & ss. 70–72 (Capitalizing Intangibles).",
      secondarySource: "Michael E. Porter (2008), 'The Five Competitive Forces That Shape Strategy', HBR.",
      scopeNote: "Ar-Ge ve faaliyet kiralaması kapitalizasyonu, muhasebe standartlarının yarattığı zamanlama çarpıklıklarını gidermek için kullanılan analitik yöntemlerdir; sonuçlar seçilen itfa süresi ve iskonto oranına bağlıdır.",
      assumptions: [
        "Yüksek pazar payı tek başına hendek kanıtı değildir.",
        "Ar-Ge 3–5 yıllık doğrusal itfa varsayımıyla aktifleştirilir."
      ]
    },
    moduleBridge: {
      prevTitle: "4. Adım: Sektör Haritası ve Kâr Havuzları",
      takeawayFromPrev: "Sektörün en kârlı havuzunun nerede oluştuğunu belirledik.",
      transitionQuestion: "Peki bu kârlı havuza yeni rakiplerin hücum etmesini hangi kaleler ve engeller durdurur?",
      nextTitle: "6. Adım: Oyun Teorisi & Yıkıcı İnovasyon",
      whyNext: "Mevcut kaleleri ve giriş engellerini tanıdık. Ancak rakipler sadece doğrudan saldırmaz; fiyat kırma oyunları oynar veya yıkıcı yeniliklerle eski devleri gafil avlar!",
      previewQuestion: "Rakipler fiyat savaşında nasıl disipline edilir ve eski devler neden yeni girişimcilere yenilir?",
    },
    sections: [
      {
        id: "m5-s1",
        title: "1. Michael Porter'ın 5 Güç Modeli: Yüksek Pazar Payı Otomatik Hendek Değildir",
        summary: "Sektör kârlılığını belirleyen 5 temel çekim gücü ve yeni girenlerin tehdidi.",
        content: [
          "Michael Porter'ın 5 Güç Çerçevesi: 1. Yeni Girenlerin Tehdidi, 2. Mevcut Rakipler Arası Rekabet, 3. Tedarikçilerin Gücü, 4. Alıcıların Gücü, 5. İkame Tehdidi.",
          "Kritik Uyarı: Yüksek bir pazar payına sahip olmak tek başına hendek kanıtı DEĞİLDİR. Eğer pazara giriş engeli yoksa, pazar lideri yüksek kâr elde ettiği anda yeni rakipler akın eder ve marjlar hızla çöker.",
          "Asıl koruma kalkanı, pazar payının kendisi değil; o pazar payını koruyan yapısal giriş engelleridir."
        ],
        interactiveVisualId: "porter-forces",
        analogyBox: {
          title: "🌊 5 Farklı Yönden Esen Rüzgarlar",
          description:
            "Bir gemidesiniz (şirket). 5 farklı yönden fırtına esiyor: Mal satanlar, mal alanlar, yanınızdaki gemiler, yeni gelen korsanlar ve uçaklar (ikame ürünler). Geminizin sağlamlığı bu 5 kuvvete dayanabilmesindedir."
        },
        keyTakeaway:
          "Yüksek pazar payı koruyucu bir giriş engeliyle desteklenmedikçe geçici bir büyüklükten ibarettir."
      },
      {
        id: "m5-s2",
        title: "2. İncumbent'ı (Mevcut Lideri) Koruyan 7 Giriş Engeli",
        summary: "Rakiplerin pazara girmesini zorlaştıran veya onları maliyet dezavantajına mahkum eden 7 mekanizma.",
        content: [
          "1. Arz Yönlü Ölçek Ekonomisi & MES (Minimum Efficient Scale): Lider devasa üretim hacmiyle birim maliyeti minimuma indirir.",
          "2. Sermaye Gereksinimi: İleri teknoloji tesisleri gibi devasa peşin yatırım ihtiyacı.",
          "3. Ağ Etkileri (Demand-side scale): Kullanıcı sayısı arttıkça platformun değerinin katlanması.",
          "4. Müşteri Geçiş Maliyetleri (Lock-in): Müşterinin başka ürüne geçmesinin çok zahmetli veya riskli olması.",
          "5. Büyüklükten Bağımsız Avantajlar & Wright Yasası: Kümülatif üretim ikiye katlandıkça birim maliyet düşer (Öğrenme eğrisi).",
          "6. Dağıtım Kanallarına Eşitsiz Erişim: Raf payı veya varsayılan dijital dağıtım kanalı olma üstünlüğü.",
          "7. Hükümet Düzenlemeleri & Ruhsatlar: Lisans zorunlulukları ve yasal korumalar."
        ],
        analogyBox: {
          title: "🔌 Wright Yasası ve Bataryalar",
          description:
            "İlk elektrikli araç bataryaları kilovat-saat başına binlerce dolarken, fabrikalar milyonlarca batarya ürettikçe maliyet 100 doların altına düşmüştür."
        },
        keyTakeaway:
          "Yüksek giriş engelleri olan sektörlerde mevcut liderler yüksek ROIC oranlarını uzun yıllar boyunca koruyabilir."
      },
      {
        id: "m5-s3",
        title: "3. 10-K Dipnot Düzeltmeleri: Raporlanan ROIC vs Düzeltilmiş ROIC",
        summary: "Ar-Ge harcamasını tek seferde gider yazmak yerine bilançoda varlık olarak aktifleştirmek.",
        content: [
          "Muhasebe standartlarında tek bir evrensel 'doğru ROIC' yoktur. Raporlanan ROIC ile analitik düzeltilmiş ROIC arasındaki farkı anlamak için varsayımları şeffafça ortaya koymak gerekir.",
          "Ar-Ge Kapitalizasyonu: Standart muhasebe Ar-Ge'yi cari yılda doğrudan gider yazar. Mauboussin ve Callahan yaklaşımında, geleceğe değer katan Ar-Ge harcaması EBIT'e eklenir, faydalı ömrü boyunca amorti edilir ve net Ar-Ge varlığı bilançonun Yatırılan Sermaye tabanına eklenir. (Kaynak: Mauboussin & Callahan (2024), ss. 70–72.)",
          "Faaliyet Kiralamaları: Gelecek kira ödemelerinin bugünkü değeri (PV) hesaplanarak hem borçlara hem duran varlıklara dahil edilir.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde 10-K vaka senaryolarını seçin veya Ar-Ge giderini ve itfa süresini ayarlayın. Raporlanan muhasebe kârı ile düzeltilmiş ROIC arasındaki farkı gözlemleyin."
        ],
        interactiveWidgetId: "footnote-detective",
        formulaBox: {
          title: "10-K Bilanço Düzeltmeleri & Ar-Ge / Faaliyet Kiralaması",
          equation: "Düzeltilmiş NOPAT = [ Raporlanan EBIT + Cari Ar-Ge - Yıllık Ar-Ge İtfası + Faiz Bileşeni ] × (1 - t)\nDüzeltilmiş Sermaye = Raporlanan Sermaye + Net Ar-Ge Varlığı + Kiralama PV'si - Fazla Nakit",
          variables: [
            { symbol: "Net Ar-Ge Varlığı", label: "Aktifleştirilmiş Ar-Ge", desc: "Son 3-5 yılın itfa edilmemiş kümülatif Ar-Ge bilançosu" },
            { symbol: "Kiralama PV'si", label: "Faaliyet Kirası Borcu", desc: "Gelecek kira taahhütlerinin iskonto edilmiş bugünkü değeri" },
            { symbol: "Fazla Nakit", label: "Atıl Hazine Bonosu", desc: "Operasyona bağlı olmayan, bilançoda uyuyan nakit (çıkarılır)" }
          ],
          exampleCalculation: "Raporlanan EBIT: 500M TL | Cari Ar-Ge: 300M TL | İtfa: 100M TL\nDüzeltilmiş EBIT = 500 + (300 - 100) = 700M TL\nBilançoya Eklenen Sermaye Tabanı = +500M TL Net Ar-Ge Varlığı"
        },
        formulaDeepDiveId: "footnote",
        analogyBox: {
          title: "🧪 Laboratuvar vs Çelik Fırını",
          description:
            "Bir çelik şirketi fabrika kurduğunda bunu 30 yıla yayıp varlık yazar; teknoloji şirketi yazılım geliştirdiğinde ise muhasebe bunu bir günlük masraf sayabilir. Dipnot düzeltmesi bu zamanlama farkını dengeler."
        },
        keyTakeaway:
          "Düzeltilmiş ROIC hesaplaması bir varsayım setidir; Ar-Ge ömrü, kiralama iskonto oranı ve fazla nakit tercihlerine göre sonuç değişir."
      }
    ],
    quiz: [
      {
        id: "q5-1",
        question: "Wright Yasası'na (Öğrenme Eğrisi) göre kümülatif üretim miktarı her iki katına çıktığında birim üretim maliyeti yaklaşık ne kadar düşer?",
        options: ["%1", "%20", "%50", "%0 (maliyet hiç değişmez)"],
        correctAnswerIndex: 1,
        explanation: "Wright Yasası'na göre kümülatif üretim ikiye katlandığında birim maliyet ampirik olarak yaklaşık %20 azalır."
      },
      {
        id: "q5-2",
        question: "Ar-Ge harcamalarının muhasebede doğrudan gider yazılmayıp 'aktifleştirilmesi ve amorti edilmesi' bilançoyu nasıl etkiler?",
        options: [
          "Şirketin iflas etmesine yol açar",
          "Maddi olmayan yatırımları sermaye tabanına dahil ederek düzeltilmiş NOPAT ve düzeltilmiş sermaye büyüklüğünü ortaya koyar",
          "Şirketin vergi oranını sıfıra indirir",
          "Hisse senedi sayısını artırır"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Ar-Ge aktifleştirildiğinde geleceğe değer katan bir varlık olarak bilançoya eklenir ve NOPAT ile Yatırılan Sermaye analitik olarak düzeltilmiş olur."
      }
    ]
  },
  {
    id: 6,
    slug: "yikici-inovasyon-ve-cozulme",
    title: "6. Adım: Yıkıcı İnovasyon ve Oyun Teorisi",
    subtitle: "Davud Golyat'ı Nasıl Yener? Christensen Modeli & Tit-for-Tat",
    estimatedMinutes: 17,
    iconName: "Zap",
    description:
      "Kalenin duvarları çok yüksek olsa bile, ya düşman içeriye alttan tünel kazarsa? Clayton Christensen'ın Yıkıcı İnovasyon Teorisi, Fiyat Savaşlarında Mahkumlar İkilemi ve Axelrod'un Tit-for-Tat stratejisi.",
    zeroKnowledgeSummary:
      "Bazen dev şirketler işlerini çok iyi yaptıkları ve en kârlı müşterilerine odaklandıkları için alt segmentteki yeni tehditleri kaçırırlar. Ancak dikkat: Her yeni teknolojik gelişme bir 'yıkıcı inovasyon' değildir. Bu modülde iş modeli kırılımlarını ve fiyat savaşlarında oyun teorisini inceliyoruz.",
    sourceAndAssumption: {
      primarySource: "Clayton M. Christensen (1997), The Innovator’s Dilemma: When New Technologies Cause Great Firms to Fail.",
      secondarySource: "Robert Axelrod (1984), The Evolution of Cooperation; Mauboussin & Callahan (2024), ss. 38–48.",
      scopeNote: "Yıkıcı inovasyon ve oyun teorisi simülasyonları, rekabet stratejisinin davranışsal ve dinamik boyutunu açıklayan teorik modellerdir.",
      assumptions: [
        "Her teknoloji değişimi yıkıcı inovasyon değildir; alt pazar ve iş modeli kırılımı aranmalıdır.",
        "Fiyat savaşlarında tekrarlanan oyunlar rasyonel koordinasyon sağlar."
      ]
    },
    moduleBridge: {
      prevTitle: "5. Adım: Porter'ın 5 Gücü, Giriş Engelleri & 10-K Dipnotları",
      takeawayFromPrev: "Rakipleri kapıda tutan 7 giriş engelini ve bilançodaki gizli Ar-Ge sermayesini inceledik.",
      transitionQuestion: "Peki ya rakipler kaleye önden saldırmak yerine alttan sessizce iş modelini değiştirirse?",
      nextTitle: "7. Adım: Şirket İçi Analiz & DuPont ROIC Röntgeni",
      whyNext: "Dış rekabeti, yıkıcı tehditleri ve oyun teorisini tamamladık. Şimdi şirketin kendi bilançosuna girip kâr motorunu röntgene alıyoruz: Marjla mı yoksa Devir Hızıyla mı kazanıyor?",
      previewQuestion: "Coca-Cola ile Costco tamamen farklı iş modelleriyle aynı %16 ROIC'e nasıl ulaşır?",
    },
    sections: [
      {
        id: "m6-s1",
        title: "1. Sürdürücü vs Yıkıcı İnovasyon",
        summary: "Sürdürücü inovasyon mevcut ürünü daha iyi yapar; yıkıcı inovasyon ise iş modelini değiştirir.",
        content: [
          "Sürdürücü İnovasyon (Sustaining): Mevcut en iyi müşteriler için ürünü daha hızlı, daha kaliteli ve daha pahalı hale getirmektir. Bu oyunda yerleşik devler neredeyse her zaman kazanır.",
          "Yıkıcı İnovasyon (Disruptive): İlk başta ana akım müşteriler için 'yetersiz' görünen ama çok daha ucuz, basit ve erişilebilir olan yeni bir iş modelidir.",
          "Önemli Ayrım: Her teknolojik sıçrama 'disruption' değildir. Gerçek yıkıcı inovasyon, alt segmente hitap eden ve yerleşik oyuncuların kârsız bularak terk ettiği bir iş modeliyle başlar.",
          "Pazarın Aşılması (Overshooting): Dev şirketler ürünlerine müşterinin ihtiyaç duyduğundan fazla özellik eklediğinde rekabet ekseni pratikliğe kayar."
        ],
        companyExample: {
          company: "Netflix vs Blockbuster (Öğretim Senaryosu)",
          context: "Blockbuster mağazalarıyla en yeni filmleri kiralıyordu ve gelirinin bir kısmı gecikme cezalarından geliyordu. Netflix posta ile DVD ve ardından streaming modeline geçerek iş modelini dönüştürdü."
        },
        analogyBox: {
          title: "📼 İş Modeli Kırılımı",
          description:
            "Yıkıcı inovasyon bir teknoloji probleminden ziyade, yerleşik oyuncunun düşük marjlı alt pazarı terk etmesiyle başlayan bir İŞ MODELİ problemidir."
        },
        keyTakeaway:
          "Güçlü kalelere sahip devler bile alt segmentten gelen iş modeli kırılımlarına karşı savunmasız kalabilir."
      },
      {
        id: "m6-s2",
        title: "2. Mini-Mills Çelik Fabrikaları ve 'Kaçma Motivasyonu'",
        summary: "Dev şirketler düşük kârlı alt segmentten kaçtıkça kendi sonlarını hazırlarlar.",
        content: [
          "Christensen'ın klasik Mini-Mills örneği: Entegre dev çelik fabrikaları demir cevherini eritip yüksek kaliteli çelik üretiyordu. Mini-mills ise hurda eriten küçük tesislerdi.",
          "Mini-mills önce en ucuz ürün olan inşaat demirine girdi. Dev fabrikalar 'bu ürünün kâr marjı çok düşük, bırakalım onlar üretsin biz lüks çeliğe odaklanalım' diyerek alt segmentten çekildi.",
          "Fakat mini-mills zamanla teknolojisini ve kalitesini geliştirdi, adım adım üst segmentlere tırmandı."
        ],
        analogyBox: {
          title: "🪜 Merdivenin Alt Basamağı",
          description:
            "Düşmanınız merdivenin en alt basamağına bastığında 'zaten orası kirliydi' deyip bir üst basamağa kaçarsanız, eninde sonunda merdivenin tepesinde sıkışıp kalırsınız."
        },
        keyTakeaway:
          "Liderlerin en kârlı müşterilerine odaklanıp alt pazarı küçümsemesi, yıkıcı rakiplerin güçlenmesine zemin hazırlayabilir."
      },
      {
        id: "m6-s3",
        title: "3. Mahkumlar İkilemi & Fiyat Savaşlarında Tit-for-Tat",
        summary: "Fiyat kırma savaşlarında Robert Axelrod'un Kısasa Kısas (Tit-for-Tat) kuralı.",
        content: [
          "İki rakip havayolu aynı rotada yarışır. İkisi de yüksek fiyatta kalırsa (İşbirliği) yüksek kâr eder. Biri fiyat kırıp diğerini gafil avlarsa kısa vadede pazar çalar.",
          "Ancak diğeri de fiyat kırınca ikisi de maliyetin altına düşüp zarar eder (Nash Dengesi Tuzağı).",
          "Robert Axelrod turnuvasında kanıtlanan en kârlı strateji 'Tit-for-Tat'tır: 1. İlk turda işbirliğiyle (fiyat kırmadan) başla, 2. Rakip fiyat kırarsa derhal misilleme yap, 3. Rakip tekrar fiyatı yükseltirse anında affet ve işbirliğine dön.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde stratejileri seçin ve turları ilerletin. Misillemeli işbirliğinin yıkıcı fiyat savaşlarını uzun vadede nasıl dengelediğini inceleyin."
        ],
        interactiveWidgetId: "game-theory",
        analogyBox: {
          title: "🕊️ Barış Güvercini vs Şahin",
          description:
            "Fiyat savaşları başlatan şirketler genellikle kendi kâr havuzlarını dinamitler. En akıllı şirketler rasyonel rekabet ve koordinasyon sinyalleri gönderir."
        },
        keyTakeaway:
          "Rakipleri yok etmeye çalışmak sektörel kârlılığı eritir; disiplinli oyun teorisi ve örtük koordinasyon refahı korur."
      }
    ],
    quiz: [
      {
        id: "q6-1",
        question: "Clayton Christensen'a göre 'Pazarın Aşılması' (Overshooting) ne anlama gelir?",
        options: [
          "Şirketin iflas edip kapılarını kapatması",
          "Ürün performansındaki iyileşmenin, ana akım müşterinin ihtiyaç ve ödeme isteğinin üzerine çıkması",
          "Devletin sektöre aşırı vergi koyması",
          "Şirketin sadece tek bir ülkede satış yapması"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Pazarın aşılması; şirketlerin ürüne müşterinin aslında ihtiyaç duymadığı ve parasını ödemek istemediği kadar çok özellik eklemesi durumudur."
      },
      {
        id: "q6-2",
        question: "Oyun teorisinde tekrarlanan fiyat savaşlarında 'Tit-for-Tat' (Kısasa Kısas) stratejisinin ilk adımı nedir?",
        options: [
          "İlk turda hemen fiyat kırıp rakibe saldırmak",
          "İlk turda işbirliği yaparak fiyat kırmadan başlamak",
          "Oyundan tamamen çekilmek",
          "Rastgele fiyat belirlemek"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Tit-for-Tat stratejisi her zaman işbirliğiyle (fiyat kırmadan) başlar; rakip saldırırsa anında misilleme yapar, rakip barışırsa hemen barışır."
      }
    ]
  },
  {
    id: 7,
    slug: "sirket-ici-analiz-dupont-roic",
    title: "7. Adım: Şirket İçi Analiz & DuPont ROIC Röntgeni",
    subtitle: "Marj Şampiyonu mu Hız Şampiyonu mu? Costco vs Coca-Cola",
    estimatedMinutes: 18,
    iconName: "PieChart",
    description:
      "Sektör ve rekabet dinamiklerini kavradık. Şimdi bir şirketin bilançosunu açıp ROIC motorunun içine giriyoruz: DuPont ayrıştırması (Marj × Devir Hızı) ve Amazon'un Negatif Nakit Döngüsü (CCC = DIO + DSO - DPO).",
    zeroKnowledgeSummary:
      "Aynı %16 sermaye getirisine sahip iki şirketten biri pahalı satarak (yüksek kâr marjı: Coca-Cola), diğeri ise ucuza satıp rafları hızla boşaltarak (yüksek devir hızı: Costco) bu başarıya ulaşır. Bu bölümde yüksek ROIC'nin nereden geldiğini sorgulamayı öğreniyoruz.",
    sourceAndAssumption: {
      primarySource: "Mauboussin & Callahan (2024), ss. 50–58.",
      scopeNote: "DuPont ayrıştırması ve Nakit Dönüşüm Süresi (CCC), şirketin operasyonel kâr motorunu inceler. Veriler şirketin 10-K ve faaliyet raporu dipnotlarından türetilen öğretim modelleridir.",
      assumptions: [
        "ROIC = NOPAT Marjı (%) × Sermaye Devir Hızı (x).",
        "CCC = Günlük Stok Süresi (DIO) + Alacak Tahsilat Süresi (DSO) - Borç Ödeme Süresi (DPO)."
      ]
    },
    moduleBridge: {
      prevTitle: "6. Adım: Yıkıcı İnovasyon ve Oyun Teorisi",
      takeawayFromPrev: "Fiyat savaşları dinamiklerini ve alttan gelen yıkıcı inovasyon tuzaklarını kavradık.",
      transitionQuestion: "Peki bir şirketin kâr motoru içten nasıl çalışır? Kâr marjıyla mı yoksa varlık devir hızıyla mı kazanıyor?",
      nextTitle: "8. Adım: Tersine DCF, Markalar ve Sustainable Value Creation Checklist",
      whyNext: "Şirketin tüm iç ve dış anatomisini çözdük! Şimdi büyük finale ulaşıyoruz: Piyasanın hisse fiyatına gizlediği hendek süresini (CAP) tersine mühendislikle çözeceğiz.",
      previewQuestion: "Hisse fiyatının kaç yıllık kusursuz bir kâr süresi ima ettiğini nasıl hesaplarız?",
    },
    sections: [
      {
        id: "m7-s1",
        title: "1. Operasyonel Etkinlik vs Stratejik Konumlanma",
        summary: "Herkes gibi yapıp sadece 'daha iyi' yapmaya çalışmak strateji değildir; strateji 'farklı seçimler' yapmaktır.",
        content: [
          "Michael Porter uyarır: Operasyonel etkinlik, rakiplerinizle aynı şeyleri yapıp biraz daha hızlı olmaktır. Bu bir strateji değildir çünkü en iyi uygulamalar hızla taklit edilir ve marjlar erir.",
          "Stratejik Konumlanma ise rakiplerden bilerek FARKLI aktiviteler seçmek ve ödünleşimler (trade-offs) yapmaktır.",
          "Southwest Airlines Örneği (Öğretim Senaryosu): Yalnızca tek tip uçak (Boeing 737) kullandı, aktarmalı merkezler yerine noktadan noktaya uçtu, yemek vermedi. Bu sayede kapıda bekleme süresini 15 dakikaya indirerek maliyet avantajı elde etti."
        ],
        analogyBox: {
          title: "🎯 Herkesi Memnun Etmeye Çalışmak",
          description:
            "Hem dünyanın en lüks restoranı hem de en ucuz fast-food zinciri olamazsınız. Birini seçip diğerinden bilinçli olarak vazgeçmek zorundasınız."
        },
        keyTakeaway:
          "Strateji, ne yapacağınızı seçmek kadar neyi YAPMAYACAĞINIZI seçmektir."
      },
      {
        id: "m7-s2",
        title: "2. DuPont ROIC Röntgeni: Marj Şampiyonları vs Hız Şampiyonları",
        summary: "ROIC = NOPAT Marjı (%) × Yatırılan Sermaye Devir Hızı (x).",
        content: [
          "Yüksek bir ROIC gördüğünüzde ilk soru: 'Bu getiri yüksek marjdan mı, yüksek devir hızından mı, yoksa geçici bir işletme sermayesi etkisinden mi geliyor?' olmalıdır.",
          "Farklılaşma Yolu (Yüksek Marj / Düşük Devir): Coca-Cola (%26 marj, 0.6x devir = %16 ROIC), Apple.",
          "Maliyet Liderliği Yolu (Düşük Marj / Yüksek Devir): Costco (%3.8 marj, 4.2x devir = %16 ROIC), Walmart.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde profil butonlarını test edin veya marj ve devir sürgülerini ayarlayın. DuPont saçılım matrisinde şirketinizin hangi eksende kâr motorunu çalıştırdığını inceleyin."
        ],
        formulaBox: {
          title: "DuPont ROIC Ayrıştırma Eşitliği",
          equation: "ROIC (%) = NOPAT Marjı (%) × Yatırılan Sermaye Devir Hızı (x)\nROIC = ( NOPAT / Satışlar ) × ( Satışlar / Yatırılan Sermaye )",
          variables: [
            { symbol: "NOPAT Marjı", label: "Kâr Marjı (Fiyatlama Gücü)", desc: "Şirketin her 100 TL'lik satışından kalan net faaliyet kârı" },
            { symbol: "Sermaye Devri", label: "Devir Hızı (Varlık Verimi)", desc: "Bağlanan her 1 TL sermayenin yılda kaç kez ciroya döndüğü" },
            { symbol: "Satışlar", label: "Sadeleşen Terim", desc: "Formülde pay ve paydayı birbirine bağlayan köprü cirodur" }
          ],
          exampleCalculation: "Coca-Cola: %26.2 NOPAT Marjı × 0.61x Sermaye Devri = %16.0 ROIC\nCostco: %3.8 NOPAT Marjı × 4.21x Sermaye Devri = %16.0 ROIC"
        },
        formulaDeepDiveId: "dupont-ccc",
        interactiveWidgetId: "dupont",
        analogyBox: {
          title: "🏎️ Tır vs Ferrari",
          description:
            "Ferrari tek bir arabadan yüksek kâr marjı elde eder. Tır ise tonlarca yükü durmaksızın taşıyarak aynı toplam parayı kazanır (yüksek devir)."
        },
        keyTakeaway:
          "Yüksek ROIC'nin kaynağını ayrıştırmak, avantajın fiyatlama gücünden mi yoksa varlık verimliliğinden mi geldiğini anlamanın anahtarıdır."
      },
      {
        id: "m7-s3",
        title: "3. Amazon'un Negatif Nakit Dönüşüm Süresi (CCC)",
        summary: "Müşteriden parayı anında alıp tedarikçiye vadeli ödeyerek başkasının parasıyla büyümek.",
        content: [
          "Nakit Dönüşüm Süresi (CCC) = Stokta Kalma Süresi (DIO) + Tahsilat Süresi (DSO) - Tedarikçiye Ödeme Süresi (DPO).",
          "Geleneksel Perakende Örneği (Öğretim Senaryosu): Kitap 149 gün rafta kalır, tahsilat 6 gün, ödeme 75 gün -> CCC = +80 Gün (Sermaye raflarda kilitlenir).",
          "Amazon Örneği: Kitap 29 günde satılır, karttan 2 günde tahsil edilir, yayıncıya 60 günde ödenir -> CCC = -29 Gün!",
          "Negatif CCC, şirketin malı satıp parasını aldıktan sonra tedarikçisine ödeme yapması anlamına gelir. Bu sayede şirket operasyonel likidite üretir."
        ],
        formulaBox: {
          title: "Nakit Dönüşüm Döngüsü (Cash Conversion Cycle - CCC)",
          equation: "CCC (Gün) = DIO (Stok Günü) + DSO (Tahsilat Günü) - DPO (Ödeme Günü)",
          variables: [
            { symbol: "DIO", label: "Stokta Kalma Süresi", desc: "(Ortalama Stok / Satılan Mal Maliyeti) × 365 Gün" },
            { symbol: "DSO", label: "Alacak Tahsilat Süresi", desc: "(Ticari Alacaklar / Toplam Gelir) × 365 Gün" },
            { symbol: "DPO", label: "Borç Ödeme Süresi", desc: "(Ticari Borçlar / Satılan Mal Maliyeti) × 365 Gün" }
          ],
          exampleCalculation: "Barnes & Noble: 149 (DIO) + 6 (DSO) - 75 (DPO) = +80 Gün (Pozitif CCC: Para Bağlar)\nAmazon: 29 (DIO) + 2 (DSO) - 60 (DPO) = -29 Gün (Negatif CCC: Faizsiz Fon Üretir)"
        },
        formulaDeepDiveId: "dupont-ccc",
        interactiveWidgetId: "ccc",
        analogyBox: {
          title: "🏦 Başkasının Parasıyla Ticaret",
          description:
            "Müşteri size parayı 1 Ocak'ta ödüyor, siz malı teslim ediyorsunuz ama tedarikçiye 1 Mart'ta ödüyorsunuz. İki ay boyunca para sizin hesabınızda durur!"
        },
        keyTakeaway:
          "Negatif işletme sermayesi döngüsü, şirketlerin dış finansmana ihtiyaç duymadan büyümesini sağlayan güçlü bir operasyonel kaldıraçtır."
      }
    ],
    quiz: [
      {
        id: "q7-1",
        question: "Costco %4 NOPAT kâr marjına ve 4.0x sermaye devir hızına sahipse, ROIC oranı kaçtır?",
        options: ["%8", "%16 (%4 × 4.0)", "%1", "%40"],
        correctAnswerIndex: 1,
        explanation: "DuPont formülüne göre ROIC = NOPAT Marjı (%4) × Sermaye Devir Hızı (4.0) = %16."
      },
      {
        id: "q7-2",
        question: "Bir şirketin Nakit Dönüşüm Süresinin (CCC) negatif olması ne anlama gelir?",
        options: [
          "Şirketin iflas etmek üzere olduğu",
          "Şirketin müşterilerden parayı tahsil ettikten çok sonra tedarikçilerine ödeme yaptığı ve operasyonunun nakit ürettiği",
          "Şirketin hiç ürün satamadığı",
          "Şirketin sadece nakit para ile alışveriş yaptığı"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Negatif CCC, şirketin malı satıp parasını tahsil ettikten sonra tedarikçisine ödeme yapması demektir; bu sayede şirket kendi büyümesini işletme sermayesi fazlasıyla finanse eder."
      }
    ]
  },
  {
    id: 8,
    slug: "oyun-teorisi-markalar-ve-kontrol-listesi",
    title: "8. Adım: Tersine DCF, Markalar ve Sustainable Value Creation Checklist",
    subtitle: "Büyük Final: Piyasa Beklentisini Çöz, Tiffany Testi ve Değer Yaratımı Denetimi",
    estimatedMinutes: 20,
    iconName: "CheckSquare",
    description:
      "Tüm parçaları birleştiriyoruz: Tersine DCF ile piyasanın kaç yıllık hendek (CAP) fiyatladığını çözme, Marka bir hendek midir? (Tiffany pırlanta testi) ve rapordan uyarlanan Sustainable Value Creation Checklist.",
    zeroKnowledgeSummary:
      "Geleceği tahmin etmek yerine, mevcut hisse fiyatının kaç yıllık olağanüstü performans ima ettiğini Tersine DCF ile çözebilirsiniz. Bu beklentinin kesin bir gerçek değil, modele dayalı bir yorum olduğunu bilerek, öğrendiklerinizi sistematik bir kontrol listesiyle denetleyebilirsiniz.",
    sourceAndAssumption: {
      primarySource: "Mauboussin & Callahan (2024), 'Checklist for Measuring Sustainable Value Creation', ss. 67–69 ve Tersine DCF, ss. 60–65.",
      scopeNote: "Tersine DCF ve Kontrol Listesi, şirketin piyasa beklentilerini ve rekabet avantajını sistematik denetlemek için rapordan uyarlanmış analitik çerçevelerdir.",
      assumptions: [
        "Tersine DCF çıktısı piyasa beklentisinin analitik bir yorumudur, kesin tahmin değildir.",
        "Kontrol listesi rapordaki 75 maddelik orijinal anketten odak çalışma sorularına uyarlanmıştır."
      ]
    },
    moduleBridge: {
      prevTitle: "7. Adım: Şirket İçi Analiz & DuPont ROIC Röntgeni",
      takeawayFromPrev: "DuPont ve Negatif Nakit Dönüşüm Süresi (CCC) ile şirketin kâr ve nakit motorunu çözdük.",
      transitionQuestion: "Peki borsadaki hisse fiyatı bu şirketin hendeğine kaç yıllık bir ömür biçiyor? Şirket ucuz mu pahalı mı?",
      nextTitle: "Tebrikler! 8 Adımlı Moat Academy Eğitim Yolculuğunu Tamamladınız 🎓",
      whyNext: "Artık bir hendek analiz uzmanısınız. Öğrendiklerinizi interaktif simülatörler ve kontrol listesiyle gerçek şirketlere uygulayabilirsiniz.",
      previewQuestion: "Gerçek bilançoları analiz etmeye ve hendek avına başlamaya hazır mısınız?",
    },
    sections: [
      {
        id: "m8-s1",
        title: "1. Tersine DCF (Reverse DCF) ve İma Edilen CAP Süresi",
        summary: "Geleceği tahmin etmeyin; hisse fiyatının hangi geleceği fiyatladığını tersine mühendislikle çözün.",
        content: [
          "Geleneksel DCF modelinde analist 10 yıl sonrasını tahmin etmeye çalışır ve tahmin hatalarına düşer.",
          "Mauboussin ve Callahan'ın Tersine DCF Yöntemi: Soru tersine çevrilir: 'Mevcut hisse fiyatının haklı çıkması için bu şirketin kaç yıl boyunca WACC'nin üzerinde ROIC kazanması gerekiyor?' (Competitive Advantage Period - CAP).",
          "Hisse Fiyatı = Sıfır Büyüme Değeri (Steady-State Value) + Gelecekteki Değer Yaratma Beklentisi (PVGO).",
          "Unutmayın: İma edilen CAP süresi kesin bir gerçek değil, girilen NOPAT ve WACC parametrelerine dayalı öğretim amaçlı bir senaryo yorumudur. (Kaynak: Mauboussin & Callahan (2024), ss. 60–65.)",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde Hisse Fiyatı, Mevcut NOPAT, Büyüme Hızı ve WACC sürgüleriyle oynayın. Sıfır Büyüme Değeri ile PVGO Gelecek Değer Yaratımının hisse fiyatı içindeki payını ve piyasanın ima ettiği CAP süresini senaryo bazında tespit edin."
        ],
        interactiveWidgetId: "reverse-dcf",
        formulaBox: {
          title: "Michael Mauboussin Tersine DCF & İma Edilen CAP",
          equation: "Hisse Fiyatı ($) = Sıfır Büyüme Değeri (NOPAT / WACC) + Gelecek Büyüme Beklentisi (PVGO)\nİma Edilen CAP Yılı = f( Piyasa Fiyatı, ROIC, WACC, Büyüme Hızı )",
          variables: [
            { symbol: "Sıfır Büyüme Değeri", label: "Steady-State Value", desc: "Şirketin hiç büyümeden mevcut faaliyet kârını sonsuza kadar üretmesi (NOPAT / WACC)" },
            { symbol: "PVGO", label: "Gelecek Büyüme Opsiyonu", desc: "Piyasa fiyatının gelecekteki değer yaratımına ve yeni yatırımlara biçtiği prim" },
            { symbol: "CAP (Yıl)", label: "İma Edilen Hendek Süresi", desc: "Fiyatı haklı çıkarmak için ROIC > WACC getirisinin sürmesi gereken yıl sayısı" }
          ],
          exampleCalculation: "NOPAT: 10 TL/hisse | WACC: %8.0 | Hisse Fiyatı: 350 TL\nSıfır Büyüme Değeri = 10 / 0.08 = 125 TL (%36)\nPVGO (Gelecek Büyüme Payı) = 350 - 125 = 225 TL (%64)\nİma Edilen CAP = 18 Yıl (Piyasa 18 yıl boyunca aralıksız yüksek getiri fiyatlıyor!)"
        },
        formulaDeepDiveId: "reverse-dcf",
        analogyBox: {
          title: "🎯 Hedefe Göre Nişan Almak",
          description:
            "Hisse senedi fiyatı bir hedeftir. 'Bu oku kim attı?' diye tahmin etmek yerine 'Bu hedefi vurmak için şirketin ne kadar hızlı ve kaç yıl koşması gerekiyor?' diye soruyoruz."
        },
        keyTakeaway:
          "Tersine DCF, geleceği tahmin etme stresinden kurtarıp 'Piyasa ne kadar iyimser?' sorusunu cevaplar."
      },
      {
        id: "m8-s2",
        title: "2. Marka Tek Başına Bir Hendek midir? (Marka Asit Testi)",
        summary: "Bilinir olmak değer yaratmak değildir. Marka, WTP'yi artırabiliyorsa veya WTS'i düşürüyorsa hendektir.",
        content: [
          "En değerli marka listeleri ile bu şirketlerin ROIC oranları karşılaştırıldığında korelasyonun sanıldığı kadar güçlü olmadığı görülür.",
          "Tiffany vs Costco Pırlanta Testi (Öğretim Senaryosu): Benzer kalitedeki iki tektaş yüzükten Tiffany'nin ciddi fiyat primiyle satılabilmesi, müşterinin ikonik kutu ve prestij güvencesi için fazladan ödeme yapmasından (WTP artışı) kaynaklanır.",
          "Marka Asit Testi: Bir marka fiyat artışı yaptığında müşteri sadakatini koruyorsa (inelastic demand) ve pazar payını tutmak için ciroya oranla devasa reklam harcamasına bağımlı değilse hendek niteliği taşır.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde farklı marka modellerini karşılaştırın; fiyat zammı şokunda faaliyet kârının nasıl tepki verdiğini canlı test edin."
        ],
        interactiveWidgetId: "brand-acid-test",
        formulaBox: {
          title: "Marka Fiyatlama Gücü ve Talep Esnekliği",
          equation: "Fiyat Talep Esnekliği (e) = | %Δ Miktar / %Δ Fiyat |\nNet Faaliyet Marjı = [ (Fiyat × (1 - e × %ΔP)) - Değişken Maliyet - CAC - Reklam Gideri ] / Gelir",
          variables: [
            { symbol: "e < 1", label: "İnelastik (Fiyatlama Gücü)", desc: "Müşteri zammı kabullenir, kâr marjı doğrudan büyür" },
            { symbol: "CAC", label: "Müşteri Edinme Maliyeti", desc: "Güçlü marka organik müşteri çeker ve CAC'ı düşürür" },
            { symbol: "Reklam %", label: "Marka Savunma Bütçesi", desc: "Pazar payını korumak için gereken mecburi harcama" }
          ],
          exampleCalculation: "Tiffany (e = 0.35): %10 Fiyat Artışı -> Satış Hacminde sadece %3.5 Düşüş -> Toplam Faaliyet Kârı +%18 Artar!\nKozmetik Marka (e = 2.2): %10 Fiyat Artışı -> Hacimde %22 Çöküş -> Toplam Kâr -%34 Erir!"
        },
        analogyBox: {
          title: "💎 Mavi Kutu Büyüsü",
          description:
            "Pırlanta aynı pırlantadır; ancak hediye edilen kutunun yarattığı algı farklıdır. İşte o algı farkı WTP artışıdır."
        },
        keyTakeaway:
          "Bir markanın gücü logosunda değil; müşterinin onun için fazladan para ödemeye (WTP) ne kadar razı olduğunda ve fiyatlama gücünde saklıdır."
      },
      {
        id: "m8-s3",
        title: "3. Sustainable Value Creation Checklist",
        summary: "Bir şirketi analiz ederken rapordaki metodolojiden uyarlanan odak sorularla sistematik denetim.",
        content: [
          "Mauboussin ve Callahan'ın 'Checklist for Measuring Sustainable Value Creation' (ss. 67–69) bölümü toplam 75 soru ve alt sorudan oluşur. Bu akademide, öğrencilerin pratik yapabilmesi için bu sorular 5 ana kategoride odak çalışma maddelerine uyarlanmıştır:",
          "1. Sektör Yapısı ve Kâr Havuzu (Tedarikçi/Müşteri pazarlık gücü)",
          "2. Giriş Engelleri ve Ölçek Avantajları (MES, Wright Yasası, Ağ Etkisi)",
          "3. Tüketici Avantajları ve Geçiş Maliyetleri (WTP tavanı, Lock-in)",
          "4. Yönetimin Sermaye Tahsisi Disiplini (Gereksiz satın almalardan kaçınma, hisse geri alımı)",
          "5. Hendek Sürdürülebilirliği ve Yıkım Tehdidi (CAP süresi, teknolojik ikameler)",
          "Öneri: Maddeleri sadece evet/hayır şeklinde işaretlemek yerine, 10-K faaliyet raporundan somut kanıtlar ve belirsizlik notları ekleyerek değerlendirin.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde kontrol listesi maddelerini inceleyin ve hazır senaryoları yükleyerek şirketlerin hendek profilini test edin."
        ],
        interactiveWidgetId: "checklist",
        analogyBox: {
          title: "📋 Pilot Kontrol Listesi",
          description:
            "Nasıl ki bir uçak kalkmadan önce pilot tek tek tüm sistemleri kontrol ederse; dikkatli bir analist de kritik kriterleri denetlemeden yatırım kararı vermez."
        },
        keyTakeaway:
          "Sistematik bir kontrol listesi, duygusal önyargılardan arınmış objektif kararlar almanın en güvenilir rehberidir. (Kaynak: Mauboussin & Callahan (2024), ss. 67–69.)"
      }
    ],
    quiz: [
      {
        id: "q8-1",
        question: "Tersine DCF (Reverse DCF) analizinin geleneksel değerlemeye göre en büyük avantajı nedir?",
        options: [
          "Geleceği 10 yıl boyunca tahmin etme zorunluluğunu ortadan kaldırıp mevcut hisse fiyatının kaç yıllık hendek (CAP) ima ettiğini çözmesi",
          "Şirketin borçlarını tamamen silmesi",
          "Sadece geçmiş yılın net kârına bakması",
          "Hiçbir matematiksel hesaplama gerektirmemesi"
        ],
        correctAnswerIndex: 0,
        explanation:
          "Tersine DCF, geleceği tahmin etmeye çalışmak yerine borsa fiyatının içine gömülü olan büyüme ve hendek süresi (CAP) beklentisini ortaya çıkarır."
      },
      {
        id: "q8-2",
        question: "Tiffany pırlanta yüzüğünün benzer kalitedeki pırlantadan yüksek fiyat primiyle satılabilmesi Değer Çubuğunda neyi gösterir?",
        options: [
          "Pırlantanın maden çıkarma maliyetinin arttığını",
          "Marka ve prestij sinyali sayesinde tüketicinin ödemeye istekliliğinin (WTP) yükseldiğini",
          "Tüm diğer markaların pırlanta satmasının yasak olduğunu",
          "Tiffany'nin iflas ettiğini"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Tiffany markası, statü ve güven sinyali vererek tüketicinin ödeme isteğini (WTP) yukarı taşımakta ve fiyatlama gücü sağlamaktadır."
      }
    ]
  }
];
