const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

const switcherHtml = `
            {/* Language Switcher */}
            <div className="flex items-center ml-2 border-l border-slate-200 dark:border-slate-800 pl-4">
              <select
                aria-label={isEnglish ? "Select Language" : "Dil Seçimi"}
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "tr")}
                className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1 py-1"
              >
                <option value="en" className="text-slate-900">English</option>
                <option value="tr" className="text-slate-900">Türkçe</option>
              </select>
            </div>
`;

// Insert the switcher before the Theme Toggle
if (content.includes('{/* Theme Toggle */}')) {
  content = content.replace('{/* Theme Toggle */}', switcherHtml + '\n            {/* Theme Toggle */}');
  fs.writeFileSync('src/components/Navbar.tsx', content, 'utf-8');
  console.log("Navbar updated with Language Switcher.");
} else {
  console.log("Could not find Theme Toggle in Navbar.");
}
