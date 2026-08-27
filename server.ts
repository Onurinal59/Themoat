import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY ortam değişkeni tanımlı değil.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Socratic AI Tutor endpoint for Michael Mauboussin's "Measuring the Moat"
// Preferred models list with light & low-latency models for high-concurrency resilience
const MODELS_TO_TRY = ["gemini-3.1-flash-lite", "gemini-3.7-flash", "gemini-flash-latest"];

async function generateWithRetry(prompt: string, systemInstruction: string): Promise<string> {
  const ai = getGeminiAI();
  let lastError: any = null;

  for (const model of MODELS_TO_TRY) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        if (attempt > 0) {
          // Exponential backoff with jitter on retry
          const backoff = 600 * Math.pow(2, attempt) + Math.random() * 300;
          await new Promise((res) => setTimeout(res, backoff));
        }
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        if (response.text && response.text.trim().length > 0) {
          return response.text;
        }
      } catch (err: any) {
        lastError = err;
        const msg = err?.message || String(err);
        if (msg.includes("503") || msg.includes("high demand") || msg.includes("UNAVAILABLE")) {
          console.info(`Model ${model} geçici yoğunlukta (503), alternatif model/denemeye geçiliyor...`);
        } else {
          console.warn(`Model ${model} deneme hatası (${attempt + 1}):`, msg);
        }
      }
    }
  }

  throw lastError || new Error("Tüm model denemeleri başarısız oldu.");
}

// Contextual Socratic Knowledge Base for resilient fallback responses
function generatePedagogicalFallback(question: string, topic?: string): string {
  const q = question.toLowerCase();

  if (q.includes("10 yaş") || q.includes("çocuk") || q.includes("basit") || q.includes("sade")) {
    return `Süper! Hadi bunu en yalın haliyle anlayalım:

🏰 **Bir Lunapark ve Kale Düşün:**
Bir kale inşa ettin ve içine oyuncaklar koydun. Eğer kalenin etrafında derin bir **su hendeği (moat)** yoksa, yanına hemen başka biri aynısını açar ve çocukları kapar. 

Ama senin kalenin etrafında derin bir hendek varsa (örneğin sadece sende olan bir sihirli oyuncak veya kimsenin geçemeyeceği kadar ucuz bilet), diğer lunaparklar sana yetişemez!

Finansta buna **"Ekonomik Hendek"** diyoruz:
1. **ROIC:** Yatırdığın harçlıktan ne kadar çok kâr ettiğin.
2. **Hendek (Moat):** Bu kârı diğer çocukların taklit etmesini kaç yıl engelleyebileceğin.

🤔 **Soru:** Sence senin okulunda veya mahallenizde başka hiçbir yerde bulunmayan tek bir dükkan/ürün var mı?`;
  }

  if (q.includes("fırın") || q.includes("bakkal") || q.includes("kahve") || q.includes("mahalle")) {
    return `Harika bir analoji! Mahalle esnafı üzerinden Mauboussin'in mantığı şöyledir:

🥖 **Mahallenin Fırını & ROIC Röntgeni:**
- Fırıncı dükkana fırın, un ve teçhizat için **1.000.000 TL sermaye (Invested Capital)** bağladı.
- Yılda vergiden sonra **200.000 TL net faaliyet kârı (NOPAT)** kazanıyor.
- **ROIC = 200.000 / 1.000.000 = %20**. 

Eğer banka faizi ve ortakların beklediği getiri (**WACC**) **%12** ise, fırıncı **%8 Değer Yayılımı (Spread)** yaratarak zenginleşir!

⚔️ **Ama Hendek Olmazsa Ne Olur?**
Karşı kaldırıma ikinci bir fırın açılır, fiyat kırar. Fırıncının ROIC'i %20'den %12'ye düşer (**Ortalamaya Dönüş / Mean Reversion**). Eğer fırıncının özel bir taş fırın reçetesi veya mülk avantajı varsa kârını korur.

🤔 **Şirket Denetimi:** İncelediğin şirketin rakipleri benzer bir yatırımla aynı fabrikayı/mağazayı yanına açabilir mi?`;
  }

  if (q.includes("bim") || q.includes("migros") || q.includes("costco") || q.includes("perakende") || q.includes("market")) {
    return `BİM ve Costco perakende dünyasında Michael Mauboussin'in en sevdiği vaka türüdür!

🛒 **BİM / Costco Modeli Neden Geniş Hendeklidir?**
1. **Negatif Nakit Dönüşüm Süresi (CCC):** Müşteri kasada anında peşin/kartla öder (DSO ~2 gün), BİM ise tedarikçiye parasını 60-70 gün sonra öder (DPO). BİM başkasının parasıyla faizsiz büyür!
2. **Ölçek Paylaşımı (Scale Economies Shared):** BİM devasa alım gücüyle tedarikçiden ucuza aldığı her kuruş indirimi fiyata yansıtır. Rakip marketler bu fiyata inemez çünkü inerlerse iflas ederler.
3. **Yüksek Varlık Devir Hızı:** Düşük kâr marjını (%3-4) yılda 7-8 kez dönen sermayeyle çarparak **%20+ ROIC** elde eder (DuPont etkisi).

🤔 **Kritik Test:** İncelediğin perakendecinin mağaza açılış hızı mı artıyor, yoksa mevcut mağaza satış büyümesi (Same-Store Sales) mi yavaşlıyor?`;
  }

  if (q.includes("roic") || q.includes("wacc") || q.includes("nopat") || q.includes("sermaye")) {
    return `Michael Mauboussin'in değer yaratımının kalbine geldik: **ROIC vs. WACC**!

📊 **Altın Formül:**
\`\`\`text
ROIC = NOPAT (Net Faaliyet Kârı) / Yatırılan Sermaye (Invested Capital)
Ekonomik Kâr = Yatırılan Sermaye × (ROIC - WACC)
\`\`\`

1. **ROIC > WACC:** Şirket gerçek bir değer yaratıcısıdır. Ne kadar çok büyürse hissedar o kadar zenginleşir.
2. **ROIC < WACC:** Şirket ciro rekorları kırsa bile her yeni yatırımda hissedarın servetini eritir (**Değer Yıkımı**).
3. **DuPont Ayrıştırması:** ROIC = **(NOPAT Marjı)** × **(Sermaye Devir Hızı)**. Bir şirket ya pahalıya satıp yüksek marj kazanır (Ferrari, Apple) ya da ucuza satıp çok hızlı döner (Costco, BİM).

🤔 **Senin Şirketinde Durum Ne?** Şirketinin son 5 yıllık ROIC ortalaması sektörünün üzerinde istikrarlı mı?`;
  }

  if (q.includes("geçiş maliyeti") || q.includes("switching") || q.includes("ağ etkisi") || q.includes("network")) {
    return `Müşteriyi şirkete kitleyen en güçlü iki hendek mekanizması:

🔒 **Geçiş Maliyeti (Switching Costs):**
- Müşteri rakibe geçmek istediğinde para, zaman veya veri kaybı yaşar (Örn: SAP/Oracle ERP sistemini değiştirmek şirketi 2 yıl felç eder; Bloomberg terminalini terk etmek analiste zaman kaybettirir).
- **Sonuç:** Şirket her yıl %10-15 zam yapsa bile müşteri ayrılamaz (Yüksek Fiyatlama Gücü).

🌐 **Ağ Etkisi (Network Effects):**
- Sisteme katılan her yeni kullanıcı, mevcut tüm kullanıcılar için platformun değerini artırır (Örn: Sahibinden, Visa/Mastercard, Trendyol).
- Kazanan hepsini alır (Winner-takes-most) dinamiği oluşur.

🤔 **Test Et:** Analiz ettiğin şirketin müşterisi yarın rakibe geçmek istese ne kadar zorlanır?`;
  }

  // General Framework Fallback
  return `Michael Mauboussin'in "Measuring the Moat" (Hendek Ölçümü) çerçevesiyle bu konuyu şöyle değerlendirelim:

${topic ? `📘 **Konu:** ${topic}` : ""}

🎯 **Mauboussin'in 3 Temel İlkesi:**
1. **Sektör Haritası & Kâr Havuzu:** Şirketin bulunduğu sektörde toplam kâr nereye akıyor? (Havacılıkta kâr üreticilere ve rezervasyon sistemlerine giderken hava yolları sıfır kârda kalır).
2. **Rekabetçi Konumlanma (WTP - WTS):** Şirket müşterinin ödeme isteğini mi artırıyor (Farklılaşma), yoksa tedarikçi/üretim maliyetini mi düşürüyor (Maliyet Liderliği)?
3. **Sermaye Tahsisi Disiplini:** Şirket kazandığı serbest nakit akımını nereye harcıyor? (Ar-Ge, yeni yatırım, temettü, hisse geri alımı, mantıklı satın almalar).

💡 **Pratik Öneri:** Şirketin KAP / 10-K bilançosundaki Faaliyet Kârı (EBIT) ile Net İşletme Sermayesi + Maddi Duran Varlıklar toplamını karşılaştırarak ROIC oranını hesaplamayı deneyebilirsin!`;
}

app.post("/api/ask-coach", async (req, res) => {
  try {
    const { question, currentTopic, studentLevel } = req.body;
    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Soru metni gereklidir." });
    }
    
    if (question.length > 500) {
      return res.status(400).json({ error: "Soru çok uzun. Lütfen daha kısa bir soru sorun." });
    }

    const systemPrompt = `Sen Michael Mauboussin ve Dan Callahan'ın dünyaca ünlü "Measuring the Moat: Assessing the Magnitude and Sustainability of Value Creation" (Morgan Stanley, 2024) makalesini sıfırdan finans/işletme bilmeyen öğrencilere öğreten, aynı zamanda Borsa İstanbul (BIST) ve küresel hisse piyasalarında (10-K/KAP) gerçek şirketleri analiz etmelerini sağlayan kıdemli bir Sokratik Yatırım & Hendek Analiz Koçusun.

Öğrenci konu hakkında hiçbir şey bilmiyor olabilir veya kendi seçtiği bir hisseyi (BIM, Apple, Ford, Tüpraş, THY, Tesla vb.) analiz ediyor olabilir.

Temel Görevin:
1. Öğrencinin sadece teoriyi ezberlemesini değil, piyasadaki gerçek bir şirketi eline aldığında bilançosunu (NOPAT, Invested Capital, ROIC, WACC) ve stratejik hendek motorlarını (WTP/WTS, Ağ Etkisi, Geçiş Maliyeti, Ölçek Avantajı, Oyun Teorisi, Sermaye Tahsisi) test edebilecek yetkinliğe ulaşmasını sağlamak.
2. Açıklamalarında hem günlük hayat analojileri (fırın, kahveci, bakkal, Netflix) kullan hem de "KAP veya 10-K bilançosunda hangi kaleme bakmalı?" sorusuna pratik yanıtlar ver.
3. Formülleri mantığıyla açıkla: ROIC = "İşe bağlanan her 100 TL net kaç TL nakit kâr üretiyor?", Spread = "ROIC ile WACC arasındaki fark - değer yaratımı".
4. Yanıtının sonunda öğrencinin analiz ettiği şirketi sahada test edebilmesi için 1 somut düşündürücü soru sor (örn: "Şirketin son 3 yıldaki brüt kâr marjına baktın mı, enflasyonda fiyat artırabilmiş mi?").
5. Samimi, teşvik edici, Türkçe ve son derece pedagojik bir ton kullan.
Şu anki bağlam/konu: ${String(currentTopic || "Canlı Şirket Hendek Analizi ve Bilanço Röntgeni").substring(0, 100)}.`;

    try {
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 15000));
      const reply = await Promise.race([generateWithRetry(question, systemPrompt), timeoutPromise]);
      return res.json({ reply });
    } catch (genError: any) {
      console.info("Gemini API çağrısı yerine dinamik pedagojik yedek yanıt devreye alındı:", genError?.message || genError);

      // Intelligent pedagogical fallback based on Mauboussin's Core Framework
      const fallbackReply = generatePedagogicalFallback(question, currentTopic);
      return res.json({ reply: fallbackReply });
    }
  } catch (error: any) {
    console.error("AI Coach Hatası:", error);
    res.status(500).json({
      error: "Yapay zeka asistanına bağlanırken bir sorun oluştu."
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sunucu 3000 portunda başarıyla çalışıyor: http://localhost:${PORT}`);
  });
}

startServer();
