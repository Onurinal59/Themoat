const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

const switcherHtml = `
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center">
              <select
                aria-label={t("nav.switchLanguage", isEnglish ? "Language / Dil" : "Dil Seçimi")}
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "tr")}
                className="bg-transparent text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-1 py-1"
              >
                <option value="en" className="text-slate-900">EN</option>
                <option value="tr" className="text-slate-900">TR</option>
              </select>
            </div>
`;

content = content.replace('{/* Daily Learning Streak Capsule', switcherHtml + '\n            {/* Daily Learning Streak Capsule');
fs.writeFileSync('src/components/Navbar.tsx', content, 'utf-8');
console.log("Language switcher added to Navbar.");
