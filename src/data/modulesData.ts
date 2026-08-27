import { LearningModule } from "../types";

export const MODULES_DATA: LearningModule[] = [
  {
    id: 1,
    slug: "hendek-ve-deger-yaratma",
    title: "1. Adım: Şato, Timsahlı Hendek & Gerçek Değer Yaratma",
    subtitle: "Sıfırdan Başlangıç: Bir Şirket Gerçekte Ne Zaman Para Kazanır?",
    estimatedMinutes: 14,
    iconName: "Shield",
    description:
      "Warren Buffett'ın ünlü ekonomik hendek metaforu, sermaye getirisi (ROIC), sermaye maliyeti (WACC) ve 'Ciro Yapmak' ile 'Hissedar Değeri Yaratmak' arasındaki hayati matematiksel fark.",
    zeroKnowledgeSummary:
      "Hiç finans bilmeseniz bile: Bir bakkal veya limonata tezgahı açtığınızı düşünün. Bankadan veya ailenizden %10 faizle para alıp, dükkandan sadece %5 kâr ediyorsanız; dükkan tıklım tıklım olsa ve rekor satış yapsanız bile gizlice batıyorsunuzdur! Gerçek zenginlik, kârınızın (ROIC) borç/sermaye maliyetinizi (WACC) aştığı anda başlar.",
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
          "Michael Mauboussin'in Morgan Stanley araştırmalarına göre, şirketlerin yalnızca %17'si 20 yıldan uzun sürebilen 'Geniş Hendek' (Wide Moat) sahibidir."
        ],
        analogyBox: {
          title: "🏰 Şato ve Timsahlı Hendek Benzetmesi",
          description:
            "Kalenin içindeki hazine: Şirketin kârları. Kaleye hücum eden askerler: Rakipler. Kalenin etrafındaki timsahlı su hendeği: Şirketin patentleri, marka gücü, ağ etkisi veya maliyet avantajı."
        },
        keyTakeaway:
          "Bir şirkete uzun vadeli yatırım yaparken ilk ve en temel soru şudur: Bu şirketin kârını rakiplerin taklitlerinden koruyan sürdürülebilir bir hendeği var mı?"
      },
      {
        id: "m1-s2",
        title: "2. ROIC ve WACC: Gerçek Değer Yaratmanın Matematiği & Terminal Deneyi",
        summary: "ROIC > WACC ise şirket gerçek bir değer üretir. Aksi halde şirket büyüdükçe hissedar servetini eritir.",
        content: [
          "ROIC (Return on Invested Capital - Yatırılan Sermayenin Getirisi): Şirketin fabrikalarına, mağazalarına, makinelerine ve işletme sermayesine bağladığı her 100 TL ile yılda kaç TL net faaliyet kârı (NOPAT) ürettiğidir.",
          "WACC (Sermaye Maliyeti): Şirketin bu fonları bulmasının (özsermaye fırsat maliyeti + net borç faizi) ağırlıklı yıllık taban maliyetidir.",
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
          "2. Yeniden Yatırım Hacmi (Reinvestment Runway / I): Şirketin bu yüksek getiri oranıyla (RONIC) ne kadarlık yeni sermaye yatırabildiği. (Tek başına yüksek ROIC yetmez; See's Candies gibi %80 ROIC kazansanız bile yeniden yatıracak mağaza bulamazsanız şirket sadece bir temettü dağıtıcısı olur; Costco veya Amazon gibi kârını yüksek getiriyle tekrar işe yatıranlar gerçek bileşik servet makineleridir).",
          "3. Sürdürülebilirlik & Ortalamaya Dönüş (Sustainability / CAP): Serbest piyasada yüksek kârlar rakipleri mıknatıs gibi çeker. Ampirik veriler en kârlı şirketlerin bile 5-10 yıl içinde kâr marjlarının piyasa ortalamasına hızla gerilediğini (Fade Rate) gösterir.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde sol paneldeki başlangıç ROIC'sini ve Aşınma Hızını (Fade Rate) değiştirin; sağdaki grafikte rekabet akıncıları geldikçe yeşil kâr yayılımının WACC çizgisine nasıl gerilediğini ve asıl servetin 'eğrinin altındaki toplam alandan' doğduğunu keşfedin."
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
          "Muhasebe profesörü Victoria Dickinson (2011), şirketleri sınıflandırmak için mükemmel bir yöntem geliştirdi: Şirketin Nakit Akış Tablosundaki 3 ana damarın işaretine (+ veya -) bakmak!",
          "Bu 3 damar: 1. CFO: Faaliyet Nakit Akışı (İşten gelen gerçek nakit), 2. CFI: Yatırım Nakit Akışı (Geleceğe harcanan fabrika/makine parası), 3. CFF: Finansman Nakit Akışı (Borçlanma/Hisse basımı veya temettü/borç ödeme)."
        ],
        analogyBox: {
          title: "🌱 İnsan Yaşamı ile Şirket Yaşamı",
          description:
            "Bir üniversite öğrencisi henüz maaş alamaz (Faaliyet -), eğitimine para harcar (Yatırım -) ve ailesinden harçlık alır (Finansman +). Bu tam olarak 'Giriş Evresi' şirketidir!"
        },
        keyTakeaway:
          "Şirketin biyolojik yaşı yoktur; nakit hareketlerinin yönü şirketin yaşam evresini belirler."
      },
      {
        id: "m2-s2",
        title: "2. 5 Yaşam Döngüsü Evresi ve Dickinson İşaretleri",
        summary: "Faaliyet, Yatırım ve Finansman akışlarının kombinasyonundan 5 temel evre türer.",
        content: [
          "1. Giriş (Introduction) [CFO: (-), CFI: (-), CFF: (+)]: Şirket henüz işinden nakit üretemez, yoğun yatırım yapar ve dışarıdan borç/yatırımcı parası bulur. (Ortalama ROIC: -%2.8)",
          "2. Büyüme (Growth) [CFO: (+), CFI: (-), CFF: (+)]: Artık kendi işinden nakit üretir ama o kadar hızlı büyür ki hem kendi nakdini hem dış kaynakları yatırıma gömer. (Ortalama ROIC: +%10.6)",
          "3. Olgunluk (Maturity) [CFO: (+), CFI: (-), CFF: (-)]: Şirket nakit basma makinesine dönmüştür! İşten devasa nakit girer, yatırımlarını kendi karşılar ve üstüne borç öder ya da temettü dağıtır. (Ortalama ROIC: +%11.2 - İDEAL HENDEK EVRESİ)",
          "4. Sarsıntı (Shake-Out) [Karışık Akışlar]: Sektörde büyüme yavaşlar, zayıf şirketler elenir, kârlar dalgalanır. (Ortalama ROIC: +%3.8)",
          "5. Düşüş (Decline) [CFO: (-), CFI: (+), CFF: (+/-)]: İşten para gelmez, şirket varlıklarını ve fabrikalarını satarak nakit yaratmaya çalışır (CFI +). (Ortalama ROIC: -%12.0)",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde soldaki kontrol panelinde hazır şirket profillerine (Apple, Erken Aşama Girişim, Düşüşteki Şirket) tıklayın veya CFO/CFI/CFF işaretlerini manuel değiştirin. Sağdaki Recharts dağılım grafiğinde şirketin ömür evresini ve nakit profilini anında doğrulayın."
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
        analogyBox: {
          title: "🍎 Apple'ın Evreleri",
          description:
            "Apple 1976'da garajda Giriş evresindeydi. 2007'de iPhone ile devasa bir Büyüme evresine girdi. Bugün ise her yıl 100 milyar dolar nakit üreten, hisselerini geri alan tam bir Olgunluk kalesidir."
        },
        keyTakeaway:
          "Halka açık şirketlerin yaklaşık %74'ü Büyüme (%38) veya Olgunluk (%36) evresindedir; en sağlam ekonomik hendekler Olgunluk döneminde test edilir."
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
      "İş dünyası sadece fiyata zam yapmaktan ibaret değildir. Başarılı şirketler müşterinin ürüne verdiği değeri (WTP) artırır veya tedarikçilerin maliyet tabanını (WTS) düşürerek pastayı herkes için büyütür. Müşteri aldığı fiyattan mutlu, tedarikçi sattığı maliyetten mutluysa şirket dev bir kâr marjı yakalar.",
    moduleBridge: {
      prevTitle: "2. Adım: Şirket Yaşam Döngüsü (Dickinson Modeli)",
      takeawayFromPrev: "Şirketin nakit akış profili (CFO+, CFI-, CFF-) onun olgunluk kalesinde olduğunu kanıtladı.",
      transitionQuestion: "Peki bu kale, tek bir ürün veya hizmet satarken kârını mikro düzeyde nereden üretir?",
      nextTitle: "4. Adım: Sektör Haritası ve Kâr Havuzları",
      whyNext: "Ürün bazında kârın WTP ve Maliyet farkından doğduğunu gördük. Peki şirket bu kârı tek başına mı kazanır, yoksa sektördeki diğer oyuncular (tedarikçiler, aracılar) bu kârı süpürür mü?",
      previewQuestion: "Bir sektörde milyarlarca liralık toplam kâr gerçekte hangi halkada toplanır?",
    },
    sections: [
      {
        id: "m3-s1",
        title: "1. Değer Çubuğunun 4 Kritik Çizgisi",
        summary: "Bir ürünün yolculuğu müşterinin kafasındaki tavan değer ile tedarikçinin dip maliyeti arasında gerçekleşir.",
        content: [
          "1. WTP (Willingness to Pay - Ödemeye İsteklilik): Müşterinin o ürün için cebinden çıkarmaya razı olduğu en yüksek tavan fiyattır. (Algılanan değer ve fayda).",
          "2. Fiyat (Price): Şirketin kasada müşteriden fiilen talep ettiği etiket fiyatı.",
          "3. Maliyet (Cost): Şirketin o ürünü üretmek, taşımak ve sunmak için harcadığı toplam kaynak tutarı.",
          "4. WTS (Willingness to Sell - Satmaya İsteklilik): Tedarikçinin veya çalışanın o girdi/emek için kabul edeceği asgari dip taban fiyat (fırsat maliyeti).",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde soldaki kontrol panelinde WTP, Fiyat, Maliyet ve WTS sürgülerini oynatın veya Apple/Costco hazır butonlarına tıklayın. Sağdaki Değer Çubuğu Recharts grafiğinde Tüketici Rantı (mavi), Şirket Kârı (yeşil) ve Tedarikçi Rantının (mor) anlık olarak nasıl genişleyip daraldığını gözlemleyin."
        ],
        interactiveVisualId: "value-stick",
        formulaBox: {
          title: "Felix Oberholzer-Gee Değer Çubuğu Eşitlikleri",
          equation: "Toplam Yaratılan Değer = WTP - WTS\nTüketici Rantı = WTP - Fiyat\nŞirket Kârı = Fiyat - Maliyet\nTedarikçi Rantı = Maliyet - WTS",
          variables: [
            { symbol: "WTP", label: "Ödemeye İsteklilik", desc: "Müşterinin ürüne biçtiği azami tavan değer (Fayda)" },
            { symbol: "Fiyat", label: "Etiket Fiyatı", desc: "Kasada fiilen tahsil edilen satış bedeli" },
            { symbol: "Maliyet", label: "Birim Maliyet", desc: "Şirketin hammadde, işçilik ve operasyon maliyeti" },
            { symbol: "WTS", label: "Satmaya İsteklilik", desc: "Tedarikçinin razı olduğu asgari dip taban maliyet" }
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
          "Toplam yaratılan değer (WTP - WTS) ne kadar genişse, paylaşılabilecek refah o kadar büyüktür."
      },
      {
        id: "m3-s2",
        title: "2. Rantlar ve Değer Bölüşümü: Kim Ne Kazanır?",
        summary: "Pasta 3 parça arasında paylaşılır: Tüketici Rantı, Şirket Kârı ve Tedarikçi Rantı.",
        content: [
          "Tüketici Rantı (Consumer Surplus) = WTP - Fiyat. Müşteri 100 TL değer biçtiği şeye 60 TL ödeyince 40 TL'lik 'iyi ki aldım' mutluluğu yaşar. Memnun müşteri geri gelir!",
          "Şirket Değer Yaratımı / Kârı (Firm Value Creation) = Fiyat - Maliyet. Şirket 60 TL'ye satıp 25 TL harcadığında 35 TL brüt kâr eder.",
          "Tedarikçi / Çalışan Rantı (Supplier Surplus) = Maliyet - WTS. Tedarikçi en az 15 TL'ye razıyken şirketten 25 TL aldığında 10 TL'lik kazanç elde eder.",
          "Şirketlerin değer yaratmasının 2 yolu vardır: Ya üst çizgiyi (WTP) yukarı itmek (Farklılaşma Stratejisi - Apple) ya da alt çizgiyi (WTS) aşağı çekmek (Düşük Maliyet Liderliği - Costco)."
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
    subtitle: "Dış Çevre: Balık İyi Olabilir Ama Deniz Fırtınalı mı?",
    estimatedMinutes: 16,
    iconName: "Compass",
    description:
      "Ürün bazında değer yaratmayı anladık. Şimdi mikrodan sektöre çıkıyoruz: Sektör haritası çıkarma, havacılık sektörü kâr havuzu (-$69 milyar analiz) ve pazar payı istikrarı (%2 kuralı).",
    zeroKnowledgeSummary:
      "Dünyanın en yetenekli kaptanı bile olsanız, su alan batık bir gemide yüzemezsiniz. Bazı sektörler doğası gereği para yutar, bazıları ise altın madenidir. Bu modülde sektördeki tüm paranın gerçekte hangi halkada toplandığını haritalandırıyoruz.",
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
        title: "1. Sektör Haritası Çıkarmak (Örnek: ABD Havacılık Sektörü)",
        summary: "Tedarikçilerden müşterilere, sendikalardan regülatörlere tüm ekosistemi tek bir şemada görmek.",
        content: [
          "Bir şirketin kârlılığı havada asılı durmaz; sağında müşteriler, solunda tedarikçiler, üstünde devlet düzenleyicileri ve çevresinde rakipler vardır.",
          "Havacılık Örneği: Uçak üreticileri (Boeing, Airbus - ikili tekel), Motor üreticileri (GE, Rolls-Royce), Havalimanları (yerel tekeller), Pilot sendikaları ve Rezervasyon sistemleri (Amadeus, Sabre).",
          "Havayolları bu güçlü tedarikçiler ile fiyata aşırı duyarlı müşteriler arasına sıkışmıştır!"
        ],
        analogyBox: {
          title: "🥪 Sandviç Arasındaki Havayolları",
          description:
            "Havayolu şirketi lezzetli bir sandviçin arasındaki ince peynir gibidir; üstten dev tekel uçak üreticileri ve havalimanları bastırır, alttan ise en ucuz bilet arayan yolcular bastırır."
        },
        keyTakeaway:
          "Bir şirketin başarısı, sadece kendi yönetimine değil, değer zincirindeki oyuncuların pazarlık gücüne bağlıdır."
      },
      {
        id: "m4-s2",
        title: "2. Kâr Havuzu (Profit Pool) Analizi",
        summary: "Sektörde sermayeyi kim bağlıyor, kârı kim cebe indiriyor?",
        content: [
          "Kâr Havuzu, X ekseninde yatırılan sermaye payını (%0-%100), Y ekseninde ise ekonomik getiri oranını (ROIC - WACC) gösterir.",
          "Kutunun Alanı = Şirketin Toplam Ekonomik Kârı veya Zararıdır. Formül: Ekonomik Kâr = Yatırılan Sermaye × (ROIC - WACC).",
          "Havacılık Şoku: Havacılık sektörünün toplam ekonomik kârında sermayenin %75'inden fazlasını havayolları bağlamış ve zarar etmiştir. Buna karşın az sermaye bağlayan Jet Yakıtı üreticileri ve Bilet Sistemleri (GDS/Amadeus) dev kârlar elde etmiştir.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde sol paneldeki sektör segmentleri listesinden Havayolları, Uçak Üreticileri ve Rezervasyon Sistemleri (GDS) kartlarına tıklayın veya ROIC/WACC oranlarını manuel değiştirin. Sağdaki Recharts Havuz grafiğinde sermaye payı genişliği (X) ile getiri yayılımı (Y) alanının net dolar kârına nasıl dönüştüğünü anında görün."
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
          "Columbia Üniversitesi'nden Bruce Greenwald'a göre pazar paylarının yerinde durmadığı oynak sektörlerde hendek kurmak imkansıza yakındır.",
          "Formül: Sektördeki her şirketin 5 yıllık pazar payı değişimlerinin mutlak değerlerinin ortalaması alınır.",
          "Eğer ortalama değişim ≤ %2 ise pazar istikrarlıdır (Örn: Arama Motorlarında Google %89, Otomotivde GM/Ford/Toyota %1 değişim).",
          "Eğer ortalama değişim > %2 ise sektör istikrarsızdır ve yoğun fiyat savaşları yaşanır."
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
    subtitle: "Rakipleri Kapıda Tutan Zırh: Ölçek, Ağ Etkisi ve Ar-Ge Düzeltmeleri",
    estimatedMinutes: 18,
    iconName: "Lock",
    description:
      "Sektör haritasını çıkardık. Şimdi rakiplerin içeri girmesini engelleyen kaleleri inceliyoruz: Michael Porter'ın 5 Gücü, 7 Giriş Engeli ve Ar-Ge/Kira kapitalizasyonu dipnot dedektifliği.",
    zeroKnowledgeSummary:
      "Yeni bir rakibin sizin işinize girmesi ne kadar zorsa, kârınız o kadar güvendedir. Ayrıca muhasebe kuralları yazılım ve ilaç şirketlerinin Ar-Ge harcamalarını 'çöpe gitmiş masraf' gibi gösterir; bu modülde gerçek bilanço sermayesini düzeltmeyi öğreniyoruz.",
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
        title: "1. Michael Porter'ın 5 Güç Modeli ve Giriş Engelleri",
        summary: "Sektör kârlılığını belirleyen 5 temel çekim gücü ve yeni girenlerin tehdidi.",
        content: [
          "1. Yeni Girenlerin Tehdidi (Threat of New Entrants) - En kritik güç!",
          "2. Mevcut Rakipler Arasındaki Rekabet (Rivalry)",
          "3. Tedarikçilerin Pazarlık Gücü (Supplier Power)",
          "4. Alıcıların Pazarlık Gücü (Buyer Power)",
          "5. İkame Ürünlerin Tehdidi (Threat of Substitutes)"
        ],
        interactiveVisualId: "porter-forces",
        analogyBox: {
          title: "🌊 5 Farklı Yönden Esen Rüzgarlar",
          description:
            "Bir gemidesiniz (şirket). 5 farklı yönden fırtına esiyor: Mal satanlar, mal alanlar, yanınızdaki gemiler, yeni gelen korsanlar ve uçaklar (ikame ürünler). Geminizin sağlamlığı bu 5 kuvvete dayanabilmesindedir."
        },
        keyTakeaway:
          "Bruce Greenwald'a göre 'Yeni girenlerin tehdidi' diğer 4 gücü domine eden en belirleyici kuvvettir."
      },
      {
        id: "m5-s2",
        title: "2. İncumbent'ı (Mevcut Lideri) Koruyan 7 Giriş Engeli",
        summary: "Rakiplerin pazara girmesini imkansız kılan veya onları zarara mahkum eden 7 mekanizma.",
        content: [
          "1. Arz Yönlü Ölçek Ekonomisi & MES (Minimum Efficient Scale): Lider devasa üretim hacmiyle birim maliyeti minimuma indirmiştir. Yeni giren küçük kaldıkça birim maliyeti yüksek kalır ve ezilir.",
          "2. Sermaye Gereksinimi: TSMC'nin tek bir çip fabrikası için 20 milyar dolar harcaması gibi devasa peşin yatırım ihtiyacı.",
          "3. Ağ Etkileri (Demand-side scale): Kullanıcı sayısı arttıkça platformun değerinin katlanması (Örn: Uber, WhatsApp, Instagram).",
          "4. Müşteri Geçiş Maliyetleri (Lock-in): Müşterinin başka ürüne geçmesinin çok zahmetli veya pahalı olması (Örn: SAP muhasebe sistemi veya Apple ekosistemi).",
          "5. Büyüklükten Bağımsız Avantajlar & Wright Yasası: Kümülatif üretim ikiye katlandıkça maliyet %20 düşer (Öğrenme eğrisi).",
          "6. Dağıtım Kanallarına Eşitsiz Erişim: Süpermarket raf payı veya varsayılan arama motoru olmak (Google'ın Apple'a yılda 20 milyar dolar ödemesi).",
          "7. Hükümet Düzenlemeleri & Ruhsatlar: Lisans zorunlulukları ('Regülasyon mevcut liderin dostudur')."
        ],
        analogyBox: {
          title: "🔌 Wright Yasası ve Bataryalar",
          description:
            "İlk elektrikli araç bataryaları kilovat-saat başına binlerce dolarken, fabrikalar milyonlarca batarya ürettikçe maliyet 100 doların altına düşmüştür."
        },
        keyTakeaway:
          "Yüksek giriş engelleri olan sektörlerde mevcut liderler yüksek ROIC oranlarını on yıllarca koruyabilir."
      },
      {
        id: "m5-s3",
        title: "3. 10-K Dipnot Düzeltmeleri: Ar-Ge & Faaliyet Kirası Kapitalizasyonu",
        summary: "Ar-Ge harcamasını tek seferde gider yazmak yerine bilançoda varlık olarak aktifleştirmek.",
        content: [
          "GAAP/IFRS muhasebesi, bir yazılım veya biyoteknoloji şirketinin geleceği inşa eden Ar-Ge bütçesini cari yılda gider yazar. Bu da şirketi zararda gösterir ve bilançodaki gerçek sermayeyi gizler.",
          "Mauboussin Düzeltmesi: Ar-Ge harcamasını EBIT'e geri ekleyin ve 3-5 yıllık faydalı ömrü boyunca amorti edin. Net Ar-Ge varlığını bilançonun 'Yatırılan Sermaye' tabanına ekleyin.",
          "Faaliyet Kiralamaları: Şirketin kiraladığı mağaza ve uçakların gelecek kira ödemelerinin bugünkü değerini (PV) bularak hem borçlara hem duran varlıklara ekleyin.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde sol paneldeki 10-K vaka senaryolarından (Örn: Biyoteknoloji & Yazılım Şirketi) birini seçin veya Ar-Ge giderini ve itfa süresini manuel ayarlayın. Sağdaki grafikte düzeltilmemiş muhasebe kârı ile düzeltilmiş gerçek ROIC arasındaki muazzam farkı anında teşhis edin."
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
            "Bir çelik şirketi fabrika kurduğunda bunu 30 yıla yayıp varlık yazar; ilaç şirketi aşı geliştirdiğinde ise muhasebeci bunu bir günlük masraf sanır! Dipnot düzeltmesi bu adaletsizliği giderir."
        },
        keyTakeaway:
          "Teknoloji ve ilaç şirketlerinin gerçek ROIC'sini görmek için Ar-Ge aktifleştirmesi ve faaliyet kiralaması kapitalizasyonu zorunludur."
      }
    ],
    quiz: [
      {
        id: "q5-1",
        question: "Wright Yasası'na (Öğrenme Eğrisi) göre kümülatif üretim miktarı her iki katına çıktığında birim üretim maliyeti yaklaşık ne kadar düşer?",
        options: ["%1", "%20", "%50", "%0 (maliyet hiç değişmez)"],
        correctAnswerIndex: 1,
        explanation: "Wright Yasası'na göre kümülatif üretim ikiye katlandığında birim maliyet yaklaşık %20 azalır."
      },
      {
        id: "q5-2",
        question: "Ar-Ge harcamalarının muhasebede doğrudan gider yazılmayıp 'aktifleştirilmesi ve amorti edilmesi' şirketin bilançosuna nasıl etki eder?",
        options: [
          "Şirketin iflas etmesine yol açar",
          "Şirketin gerçek Yatırılan Sermaye tabanını ve düzeltilmiş NOPAT kârını gerçeğe uygun şekilde ortaya çıkarır",
          "Şirketin vergi oranını sıfıra indirir",
          "Hisse senedi sayısını artırır"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Ar-Ge aktifleştirildiğinde geleceğe değer katan bir varlık olarak bilançoya eklenir ve NOPAT ile Yatırılan Sermaye gerçek ekonomik boyutuna kavuşur."
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
      "Kalenin duvarları çok yüksek olsa bile, ya düşman içeriye yer altından tünel kazarsa? Clayton Christensen'ın Yıkıcı İnovasyon Teorisi, Fiyat Savaşlarında Mahkumlar İkilemi ve Albay Blotto stratejisi.",
    zeroKnowledgeSummary:
      "Bazen dev şirketler işlerini çok iyi yaptıkları, müşterilerini dinledikleri ve kârlarını maksimize ettikleri için batarlar! Çünkü küçük bir girişimci alt segmentten sessizce gelip onları yıkar. Ayrıca rakiplerle fiyat kırma yarışına giren şirketler birbirini mahveder.",
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
          "Sürdürücü İnovasyon (Sustaining): Mevcut en iyi müşteriler için ürünü daha hızlı, daha kaliteli ve daha pahalı hale getirmektir. Bu oyunda yerleşik devler (incumbent) neredeyse her zaman kazanır.",
          "Yıkıcı İnovasyon (Disruptive): İlk başta ana akım müşteriler için 'kalitesiz ve yetersiz' görünen ama çok daha ucuz, basit ve erişilebilir olan yeni bir iş modelidir.",
          "Pazarın Aşılması (Overshooting): Dev şirketler ürünlerine müşterinin ihtiyaç duyduğundan ve para ödemek istediğinden daha fazla özellik ekler. Bu noktada rekabet ekseni 'saf güçten', 'hız, pratiklik ve kolaylığa' kayar."
        ],
        analogyBox: {
          title: "📼 Blockbuster vs Netflix",
          description:
            "Blockbuster dev mağazalarıyla en yeni filmleri kiralıyordu ve gelirinin %15'i müşterilerin nefret ettiği 'gecikme cezalarından' geliyordu. Netflix posta ile DVD gönderip gecikme cezasını sıfırladı; ardından streaming'e geçti. Blockbuster 2010'da iflas etti!"
        },
        keyTakeaway:
          "Yıkıcı inovasyon bir teknoloji problemi değil, bir İŞ MODELİ problemidir."
      },
      {
        id: "m6-s2",
        title: "2. Mini-Mills Çelik Fabrikaları ve 'Kaçma Motivasyonu'",
        summary: "Dev şirketler düşük kârlı alt segmentten kaçtıkça kendi sonlarını hazırlarlar.",
        content: [
          "Christensen'ın en ünlü örneği: Entegre dev çelik fabrikaları demir cevherini eritip yüksek kaliteli çelik üretiyordu. Mini-mills (hurda eriten küçük tesisler) ise kalitesiz hurda eritiyordu.",
          "Mini-mills önce en ucuz ürün olan inşaat demirine (rebar) girdi. Dev fabrikalar 'bu ürünün kâr marjı çok düşük, bırakalım onlar üretsin biz lüks çeliğe odaklanalım' diyerek alt segmentten çekildi. Devlerin kâr marjı ilk başta arttı!",
          "Fakat mini-mills zamanla teknolojisini geliştirdi, bir üst segmente geçti ve en sonunda dev fabrikaları lüks çelikte bile yenerek iflasa sürükledi."
        ],
        analogyBox: {
          title: "🪜 Merdivenin Alt Basamağı",
          description:
            "Düşmanınız merdivenin en alt basamağına bastığında 'zaten orası kirliydi' deyip bir üst basamağa kaçarsanız, eninde sonunda merdivenin tepesinde sıkışıp düşersiniz."
        },
        keyTakeaway:
          "Liderlerin en kârlı müşterilerine odaklanıp alt pazarı küçümsemesi, yıkıcı rakiplerin güçlenip onları tahttan indirmesine zemin hazırlar."
      },
      {
        id: "m6-s3",
        title: "3. Mahkumlar İkilemi & Fiyat Savaşlarında Tit-for-Tat",
        summary: "Fiyat kırma savaşlarında Nash dengesini kırmak için Robert Axelrod'un Kısasa Kısas kuralı.",
        content: [
          "İki rakip havayolu aynı rotada yarışır. İkisi de yüksek fiyatta kalırsa (İşbirliği) yüksek kâr eder. Biri fiyat kırıp diğerini gafil avlarsa kısa vadede pazar çalar.",
          "Ancak diğeri de fiyat kırınca ikisi de maliyetin altına düşüp zarar eder (Nash Dengesi Tuzağı).",
          "Robert Axelrod turnuvasında kanıtlanan en kârlı strateji 'Tit-for-Tat'tır: 1. İlk turda işbirliğiyle (yüksek fiyat) başla, 2. Rakip fiyat kırarsa derhal misilleme yap, 3. Rakip tekrar fiyatı yükseltirse anında affet ve işbirliğine dön.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde sol paneldeki strateji menüsünden Tit-for-Tat veya Agresif Fiyat Kırıcı'yı seçin; 'Adım Adım Oyna' butonuna basarak turları ilerletin. Sağdaki Recharts Kümülatif Kâr Grafiğinde misillemeli işbirliğinin yıkıcı fiyat savaşlarını uzun vadede nasıl ezdiğini gözlerinizle görün."
        ],
        interactiveWidgetId: "game-theory",
        analogyBox: {
          title: "🕊️ Barış Güvercini vs Şahin",
          description:
            "Fiyat savaşları başlatan şirketler genellikle kendi kâr havuzlarını dinamitler. En akıllı şirketler örtük işbirliği (tacit coordination) sinyalleri gönderir."
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
        question: "Oyun teorisinde tekrarlanan fiyat savaşlarında en yüksek kârlılığı sağlayan 'Tit-for-Tat' (Kısasa Kısas) stratejisinin ilk adımı nedir?",
        options: [
          "İlk turda hemen fiyat kırıp rakibe saldırmak",
          "İlk turda işbirliği yaparak yüksek fiyattan başlamak",
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
      "Aynı %16 kârlılığa sahip iki şirketten biri pahalı satarak (yüksek kâr marjı: Coca-Cola), diğeri ise ucuza satıp rafları ışık hızında boşaltarak (yüksek devir hızı: Costco) bu başarıya ulaşır. Bu bölümde bilanço röntgenini çekmeyi öğreniyoruz.",
    moduleBridge: {
      prevTitle: "6. Adım: Yıkıcı İnovasyon ve Oyun Teorisi",
      takeawayFromPrev: "Fiyat savaşları dinamiklerini ve alttan gelen yıkıcı inovasyon tuzaklarını kavradık.",
      transitionQuestion: "Peki bir şirketin kâr motoru içten nasıl çalışır? Kâr marjıyla mı yoksa varlık devir hızıyla mı kazanıyor?",
      nextTitle: "8. Adım: Tersine DCF, Markalar ve 60 Maddelik Hendek Denetimi",
      whyNext: "Şirketin tüm iç ve dış anatomisini çözdük! Şimdi büyük finale ulaşıyoruz: Piyasanın hisse fiyatına gizlediği hendek süresini (CAP) tersine mühendislikle çözeceğiz.",
      previewQuestion: "Hisse fiyatının kaç yıllık kusursuz bir kâr süresi ima ettiğini nasıl hesaplarız?",
    },
    sections: [
      {
        id: "m7-s1",
        title: "1. Operasyonel Etkinlik vs Stratejik Konumlanma",
        summary: "Herkes gibi yapıp sadece 'daha iyi' yapmaya çalışmak strateji değildir; strateji 'farklı seçimler' yapmaktır.",
        content: [
          "Michael Porter uyarır: Operasyonel etkinlik, rakiplerinizle aynı şeyleri yapıp biraz daha hızlı olmaktır. Bu bir strateji değildir çünkü en iyi uygulamalar hızla taklit edilir ve kârlar erir.",
          "Stratejik Konumlanma ise rakiplerden bilerek FARKLI aktiviteler seçmek ve ödünleşimler (trade-offs) yapmaktır.",
          "Southwest Airlines Örneği: Yalnızca tek tip uçak (Boeing 737) kullandı, aktarmalı merkezler yerine noktadan noktaya uçtu, yemek/ikram vermedi. Bu sayede uçak bakım maliyetlerini kırdı ve kapıda bekleme süresini 15 dakikaya indirerek rakipleri ezip geçti."
        ],
        analogyBox: {
          title: "🎯 Herkesi Memnun Etmeye Çalışmak",
          description:
            "Hem dünyanın en lüks Michelin yıldızlı restoranı hem de en ucuz fast-food zinciri olamazsınız. Birini seçip diğerinden bilinçli olarak vazgeçmek zorundasınız."
        },
        keyTakeaway:
          "Strateji, ne yapacağınızı seçmek kadar neyi YAPMAYACAĞINIZI seçmektir."
      },
      {
        id: "m7-s2",
        title: "2. DuPont ROIC Röntgeni: Marj Şampiyonları vs Hız Şampiyonları",
        summary: "ROIC = NOPAT Marjı (%) × Yatırılan Sermaye Devir Hızı (x).",
        content: [
          "Bu matematiksel formülde Satışlar sadeleşir: (NOPAT / Satışlar) × (Satışlar / Sermaye) = NOPAT / Sermaye = ROIC.",
          "Farklılaşma Yolu (Yüksek Marj / Düşük Devir): Coca-Cola (%26 marj, 0.6x devir = %16 ROIC), Apple, Ferrari.",
          "Maliyet Liderliği Yolu (Düşük Marj / Yüksek Devir): Costco (%3.8 marj, 4.2x devir = %16 ROIC), Walmart.",
          "Görüldüğü gibi Costco ve Coca-Cola tamamen aynı %16 ROIC'e sahiptir ama biri marjla, diğeri süratle kazanır!",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde sol paneldeki hazır profillerden Coca-Cola (Marj) ve Costco (Devir Hızı) butonlarına tıklayın; veya marj ve devir sürgülerini kendiniz ayarlayın. Sağdaki grafikte DuPont saçılım matrisinde şirketinizin hangi eksende kâr motorunu çalıştırdığını anında keşfedin."
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
            "Ferrari tek bir arabadan devasa kâr eder (yüksek marj). Tır ise tonlarca yükü durmaksızın taşıyarak aynı toplam parayı kazanır (yüksek devir)."
        },
        keyTakeaway:
          "Uzun vadede en kalıcı başarıyı yakalayanlar 'Ucuzluktan önce Kalite' (Better before Cheaper) ve 'Maliyetten önce Gelir' (Revenues before Cost) diyen Farklılaşma şirketleridir."
      },
      {
        id: "m7-s3",
        title: "3. Amazon'un Gizli Silahı: Negatif Nakit Dönüşüm Süresi (CCC)",
        summary: "Müşteriden parayı anında alıp tedarikçiye aylar sonra ödeyerek başkasının parasıyla bedava büyümek.",
        content: [
          "Nakit Dönüşüm Süresi (CCC) = Stokta Kalma Süresi (DIO) + Tahsilat Süresi (DSO) - Tedarikçiye Ödeme Süresi (DPO).",
          "1999 Barnes & Noble: Kitabı 149 gün rafta tuttu, parayı 6 günde tahsil etti, toptancıya 75 günde ödedi. CCC = 149 + 6 - 75 = +80 Gün! (Parası 80 gün boyunca raflarda kilitli kaldı).",
          "1999 Amazon: Kitabı 29 günde sattı, parayı karttan 2 günde aldı, yayıncıya 60 günde ödedi. CCC = 29 + 2 - 60 = -29 Gün!",
          "Bu ne anlama gelir? Amazon sattığı kitabın parasını 58 gün boyunca bankada faizsiz işletme sermayesi olarak tuttu ve tek kuruş kredi çekmeden devasa büyümesini finanse etti!",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde sol paneldeki şirket profillerinden Amazon vs Barnes & Noble butonlarını test edin veya DIO, DSO, DPO sürgülerini kendiniz değiştirin. Sağdaki Recharts Waterfall grafiğinde nakit dönüşüm günlerinin sıfırın altına inerek nasıl dev bir faizsiz likidite kalkanı yarattığını canlı izleyin."
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
            "Müşteri size parayı 1 Ocak'ta peşin ödüyor, siz malı teslim ediyorsunuz ama malı aldığınız fabrikaya 1 Mart'ta ödüyorsunuz. İki ay boyunca para sizin hesabınızda büyür!"
        },
        keyTakeaway:
          "Bilanço verimliliği ve negatif işletme sermayesi döngüsü, yıkıcı şirketlerin en güçlü kaldıraçlarından biridir."
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
          "Negatif CCC, şirketin malı satıp parasını cebine koyduktan günler/aylar sonra tedarikçisine ödeme yapması demektir; bu sayede şirket kendi büyümesini tedarikçi kredisiyle finanse eder."
      }
    ]
  },
  {
    id: 8,
    slug: "oyun-teorisi-markalar-ve-kontrol-listesi",
    title: "8. Adım: Tersine DCF, Markalar ve 60 Maddelik Hendek Denetimi",
    subtitle: "Büyük Final: Piyasa Beklentisini Çöz, Tiffany Testi ve Morgan Stanley Listesi",
    estimatedMinutes: 20,
    iconName: "CheckSquare",
    description:
      "Tüm parçaları birleştiriyoruz: Tersine DCF ile piyasanın kaç yıllık hendek (CAP) fiyatladığını çözme, Marka bir hendek midir? (Tiffany pırlanta testi) ve Morgan Stanley 60 Maddelik Hendek Kontrol Listesi.",
    zeroKnowledgeSummary:
      "Geleceği kristal küreyle tahmin edemezsiniz. Ama hisse fiyatının kaç yıllık kusursuz büyüme ima ettiğini tersine mühendislikle (Reverse DCF) çözebilirsiniz. Bu son modülde tüm öğrendiklerimizi profesyonel bir yatırımcı kontrol listesiyle taçlandırıyoruz.",
    moduleBridge: {
      prevTitle: "7. Adım: Şirket İçi Analiz & DuPont ROIC Röntgeni",
      takeawayFromPrev: "DuPont ve Negatif Nakit Dönüşüm Süresi (CCC) ile şirketin kâr ve nakit motorunu çözdük.",
      transitionQuestion: "Peki borsadaki hisse fiyatı bu şirketin hendeğine kaç yıllık bir ömür biçiyor? Şirket ucuz mu pahalı mı?",
      nextTitle: "Tebrikler! 8 Adımlı Moat Academy Eğitim Yolculuğunu Tamamladınız 🎓",
      whyNext: "Artık profesyonel bir hendek analiz uzmanısınız. Öğrendiklerinizi interaktif simülatörler ve kontrol listesiyle gerçek şirketlere uygulayabilirsiniz.",
      previewQuestion: "Gerçek bilançoları analiz etmeye ve hendek avına başlamaya hazır mısınız?",
    },
    sections: [
      {
        id: "m8-s1",
        title: "1. Tersine DCF (Reverse DCF) ve İma Edilen CAP Süresi",
        summary: "Geleceği tahmin etmeyin; hisse fiyatının hangi geleceği fiyatladığını tersine mühendislikle çözün.",
        content: [
          "Geleneksel DCF modelinde analist 10 yıl sonrasını tahmin etmeye çalışır ve genellikle yanılır.",
          "Mauboussin'in Tersine DCF Yöntemi: Soru tersine çevrilir: 'Mevcut hisse fiyatının haklı çıkması için bu şirketin kaç yıl boyunca WACC'nin üzerinde ROIC kazanması gerekiyor?' (Competitive Advantage Period - CAP).",
          "Hisse Fiyatı = Sıfır Büyüme Değeri (Steady-State Value) + Gelecekteki Değer Yaratma (CAP Yılları).",
          "Eğer piyasa bir şirket için 25 yıllık hendek (CAP) fiyatlıyorsa ve sektör hızla değişiyorsa hisse aşırı pahalıdır. Eğer piyasa sadece 4 yıllık hendek fiyatlıyor ama şirketin 15 yıllık patenti varsa hisse muazzam bir fırsattır.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde sol panelde Hisse Fiyatı, Mevcut NOPAT, Büyüme Hızı ve WACC sürgüleriyle oynayın veya Apple/Coca-Cola/Pahalı Teknoloji hazır senaryolarına tıklayın. Sağdaki grafikte Sıfır Büyüme Değeri ile PVGO Gelecek Değer Yaratımının hisse fiyatı içindeki payını ve piyasanın ima ettiği CAP (Hendek) süresini canlı tespit edin."
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
          exampleCalculation: "NOPAT: 10 TL/hisse | WACC: %8.0 | Hisse Fiyatı: 350 TL\nSıfır Büyüme Değeri = 10 / 0.08 = 125 TL (%36)\nPVGO (Gelecek Büyüme Payı) = 350 - 125 = 225 TL (%64)\nİma Edilen CAP = 18 Yıl (Piyasa 18 yıl boyunca aralıksız rekabetsiz yüksek getiri fiyatlıyor!)"
        },
        formulaDeepDiveId: "reverse-dcf",
        analogyBox: {
          title: "🎯 Hedefe Göre Nişan Almak",
          description:
            "Hisse senedi fiyatı bir hedeftir. 'Bu oku kim attı?' diye tahmin etmek yerine 'Bu hedefi vurmak için şirketin ne kadar hızlı ve kaç yıl koşması gerekiyor?' diye soruyoruz."
        },
        keyTakeaway:
          "Tersine DCF, geleceği tahmin etme stresinden kurtarıp 'Piyasa ne kadar hayalperest?' sorusunu cevaplar."
      },
      {
        id: "m8-s2",
        title: "2. Marka Tek Başına Bir Hendek midir? (Marka Asit Testi)",
        summary: "Bilinir olmak değer yaratmak değildir. Marka, WTP'yi artırabiliyorsa veya WTS'i düşürüyorsa hendektir.",
        content: [
          "Interbrand'in 'Dünyanın En Değerli 25 Markası' listesi ile bu şirketlerin ROIC oranları karşılaştırıldığında korelasyonun çok zayıf olduğu görülür!",
          "Tiffany vs Costco Pırlanta Testi: Neredeyse tamamen aynı kalitede iki tektaş pırlanta yüzükten Tiffany 16.600$'a, Costco 6.600$'a satıyordu. Bağımsız eksper aradaki farkın sadece 2.500$ olduğunu söyledi. Müşteri aradaki 10.000$ farkı Tiffany'nin ikonik 'mavi kutusu ve sosyal statüsü' için ödemiştir (WTP artışı).",
          "Charlie Munger'ın Sakız Testi: 'Uzak bir ülkeye gittiğimde rafta bilmediğim Glotz sakızı 30 cent, bildiğim Wrigley sakızı 40 cent ise; ağzıma sokacağım şey için 10 cent tasarruf edip risk almam!' (Arama maliyeti ve risk azaltımı).",
          "Marka Asit Testi: Bir marka fiyat artışı yaptığında müşteri kaçmıyorsa (esneklik < 1) ve pazar payını korumak için ciroya oranla devasa reklam harcaması gerekmiyorsa gerçek bir hendektir. Aksi halde marka sadece pahalı bir illüzyondur.",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde Tiffany (Gerçek Hendek) vs CPG vs Reklam Bağımlısı markaları karşılaştırın; fiyat zammı şokunda faaliyet kârının nasıl tepki verdiğini canlı test edin."
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
            "Pırlanta aynı pırlantadır; ancak Tiffany kutusunu hediye ettiğinizde aldığınız tebessüm ile süpermarket poşetiyle verdiğinizdeki tebessüm farklıdır. İşte o fark WTP'dir."
        },
        keyTakeaway:
          "Bir markanın gücü logosunda değil; müşterinin onun için fazladan para ödemeye (WTP) ne kadar razı olduğunda ve fiyat zammına karşı esnekliğinde saklıdır."
      },
      {
        id: "m8-s3",
        title: "3. Morgan Stanley 60 Maddelik Hendek Kontrol Listesi",
        summary: "Bir şirketi yatırım komitesine sunmadan önce 5 kategoride 60 maddelik titiz denetim.",
        content: [
          "1. Sektör Yapısı ve Kâr Havuzu (Tedarikçi/Müşteri pazarlık gücü)",
          "2. Giriş Engelleri ve Ölçek Avantajları (MES, Wright Yasası, Ağ Etkisi)",
          "3. Tüketici Avantajları ve Geçiş Maliyetleri (WTP tavanı, Lock-in)",
          "4. Yönetimin Sermaye Tahsisi Disiplini (Gereksiz satın almalardan kaçınma, hisse geri alımı)",
          "5. Hendek Sürdürülebilirliği ve Yıkım Tehdidi (CAP süresi, teknolojik ikameler)",
          "Terminalde Eyleme Geçin: Aşağıdaki simülatörde sol paneldeki kontrol listesi maddelerini tek tek işaretleyin veya hazır şirket profillerini (Apple Inc., Costco, Ortalama Havayolu) yükleyin. Sağdaki Recharts Stratejik Boyut Dağılımında ve Hendek Hükmü Kartında şirketin kalemi yoksa sermaye tuzağı mı olduğunu anında test edin."
        ],
        interactiveWidgetId: "checklist",
        analogyBox: {
          title: "📋 Pilot Kontrol Listesi",
          description:
            "Nasıl ki bir uçak kalkmadan önce pilot tek tek tüm sistemleri kontrol ederse; profesyonel bir yatırımcı da 60 kriteri denetlemeden tek bir hisse almaz."
        },
        keyTakeaway:
          "Kapsamlı bir kontrol listesi, duygusal önyargılardan arınmış objektif ve kârlı kararlar almanın en güvenilir rehberidir."
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
        question: "Tiffany pırlanta yüzüğünün Costco'daki eşdeğer pırlantadan 10.000$ daha pahalıya satılabilmesi Değer Çubuğunda neyi gösterir?",
        options: [
          "Pırlantanın maden çıkarma maliyetinin arttığını",
          "Marka ve prestij sinyali sayesinde tüketicinin ödemeye istekliliğinin (WTP) yükseldiğini",
          "Costco'nun pırlanta satmasının yasak olduğunu",
          "Tiffany'nin iflas ettiğini"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Tiffany markası, statü ve güven sinyali vererek tüketicinin ödeme isteğini (WTP) devasa ölçüde yukarı taşımakta ve yüksek fiyatlama gücü sağlamaktadır."
      }
    ]
  }
];
