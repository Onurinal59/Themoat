const fs = require('fs');

function fix(file, compName) {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('import { useLanguage }') && !content.includes('t } = useLanguage()')) {
    // Inject at the start of the component
    const compStart = `const ${compName}: React.FC<any> = ({`;
    if (content.includes(compStart)) {
      content = content.replace(compStart, `${compStart}\n  const { t, formatPercent, formatCurrency } = useLanguage();\n`);
    } else {
      // Try generic
      const compStart2 = `const ${compName} = ({`;
      if (content.includes(compStart2)) {
        content = content.replace(compStart2, `${compStart2}\n  const { t, formatPercent, formatCurrency } = useLanguage();\n`);
      } else {
        const compStart3 = `const ${compName}: React.FC<`;
        if (content.includes(compStart3)) {
          content = content.replace(/const ([a-zA-Z0-9]+): React\.FC<([^>]+)> = \(([^)]+)\) => \{/, (match, name, t, args) => {
            return `${match}\n  const { t, formatPercent, formatCurrency } = useLanguage();\n`;
          });
        }
      }
    }
    fs.writeFileSync(file, content, 'utf-8');
  }
}

fix('src/components/ModuleReader.tsx', 'ModuleReader');
fix('src/App.tsx', 'App');

let ctx = fs.readFileSync('src/context/LanguageContext.tsx', 'utf-8');
// Fix LanguageContext is not defined in useLanguage
if (ctx.includes('export const LanguageContext = createContext')) {
  // It's there. Why the error?
  // Maybe I put it at the very bottom, after useLanguage?
  // Let's check where it is.
}
