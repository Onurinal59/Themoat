import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Sparkles, Send, X, Bot, User, Loader2, MessageSquare, Lightbulb, BookOpen } from "lucide-react";

interface Message {
  sender: "user" | "coach";
  text: string;
}

interface AICoachDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic?: string;
  initialPrompt?: string;
}

const PRESET_QUESTIONS_TR = [
  "Bunu 10 yaşındaki birine anlatır gibi sade açıkla.",
  "Mahalle bakkalı veya fırın örneğiyle somutlaştır.",
  "İncelediğim hissenin hendeğini nasıl test edebilirim?",
  "BIM vs Migros veya Apple vs Samsung hendek farkı nedir?",
  "ROIC yüksek ama WACC da yüksekse ne olur?",
];

const PRESET_QUESTIONS_EN = [
  "Explain this simply as if to a 10-year-old.",
  "Give a concrete bakery or corner-store analogy.",
  "How can I test the moat durability of a stock I'm researching?",
  "What is the moat difference between Apple and Samsung?",
  "What happens if ROIC is high but WACC is also high?",
];

export const AICoachDrawer: React.FC<AICoachDrawerProps> = ({
  isOpen,
  onClose,
  currentTopic,
  initialPrompt,
}) => {
  const { isEnglish, t } = useLanguage();

  const welcomeMessage = isEnglish
    ? `Hello! I am your Socratic Analysis AI Coach, here to guide you through Michael Mauboussin's "Measuring the Moat" framework step by step and apply it to real-world equities.
Feel free to ask about any unclear concepts or test your company's moat evidence together!`
    : `Merhaba! Ben Michael Mauboussin'in "Measuring the Moat" (Ekonomik Hendeği Ölçmek) araştırmasını adım adım öğrenmende ve gerçek piyasadaki hisselere uygulamanda sana rehberlik edecek Sokratik Analiz Koçunum.
Aklına takılan kavramları sorabilir veya analiz ettiğin şirketin hendek kanıtlarını birlikte test edebiliriz!`;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "coach",
      text: welcomeMessage,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastInitialPromptRef = useRef<string | undefined>(undefined);

  // Update initial message when language changes if only 1 message exists
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === "coach") {
      setMessages([{ sender: "coach", text: welcomeMessage }]);
    }
  }, [isEnglish]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (initialPrompt && initialPrompt !== lastInitialPromptRef.current) {
        lastInitialPromptRef.current = initialPrompt;
        handleSend(initialPrompt);
      }
    }
  }, [messages, isOpen, initialPrompt]);


  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input.trim();
    if (!textToSend || isLoading) return;

    // Add user message
    const newMessages: Message[] = [...messages, { sender: "user", text: textToSend }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ask-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: textToSend,
          currentTopic: currentTopic || (isEnglish ? "Economic Moat and Sustainable Value Creation" : "Ekonomik Hendek ve Sürdürülebilir Değer Yaratma"),
          language: isEnglish ? "en" : "tr",
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { sender: "coach", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "coach",
            text: isEnglish
              ? "There was a temporary issue getting a response. Please try again."
              : "Yanıt alırken geçici bir aksaklık oldu. Lütfen tekrar dener misiniz?",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "coach",
          text: isEnglish
            ? "Could not connect to the server. Please check your network connection."
            : "Sunucuya bağlanırken bir sorun oluştu. Lütfen bağlantınızı kontrol edin.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const presetQuestions = isEnglish ? PRESET_QUESTIONS_EN : PRESET_QUESTIONS_TR;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative z-10 w-full sm:w-[480px] h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col text-slate-800 dark:text-slate-100"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {isEnglish ? "Socratic AI Learning Coach" : "Sokratik AI Öğrenme Koçu"}
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                      Mauboussin AI
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isEnglish ? "Topic:" : "Konu:"} {currentTopic || (isEnglish ? "General Strategy & Moat" : "Genel Strateji & Hendek")}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preset Fast Prompt Chips - Modern Pill design with wrap */}
            <div className="p-2.5 bg-slate-50/50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-wrap gap-2">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/60 border border-slate-200/80 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 whitespace-nowrap transition-all flex items-center gap-1 shrink-0 shadow-2xs cursor-pointer"
                >
                  <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{q}</span>
                </button>
              ))}
            </div>

            {/* Chat Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-slate-950/50">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3 text-xs leading-relaxed ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.sender === "coach" && (
                    <div className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-xs"
                        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none shadow-xs"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.sender === "user" && (
                    <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 text-xs justify-start"
                >
                  <div className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 flex items-center gap-2 shadow-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" />
                    <span>{isEnglish ? "Preparing a clear analogy..." : "Sade ve anlaşılır bir analoji hazırlanıyor..."}</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  placeholder={isEnglish ? "Ask about any term or concept..." : "Anlamadığın bir kelime veya konsepti sor..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 disabled:opacity-50"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

