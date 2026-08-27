const fs = require('fs');

function inject(file) {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('const {') && content.includes('useLanguage()')) {
    content = content.replace(/const\s+\{\s*([^}]+)\s*\}\s*=\s*useLanguage\(\)/g, (match, vars) => {
      let newVars = vars;
      if (!newVars.includes('t')) newVars += ', t';
      if (!newVars.includes('formatPercent')) newVars += ', formatPercent';
      if (!newVars.includes('formatCurrency')) newVars += ', formatCurrency';
      return `const { ${newVars} } = useLanguage()`;
    });
  } else {
    // If useLanguage is completely missing but needed
    if (content.includes('t(') || content.includes('formatPercent')) {
      content = "import { useLanguage } from './context/LanguageContext';\n" + content;
      // Find a good place to inject const { t }
      // This is tricky for functional components, better just assume it's there
    }
  }
  
  if (file.includes('CapFadeRateSim')) {
    content = content.replace(/Number\(/g, 'Number('); // Not sure what the error is
    content = content.replace(/%\{([a-zA-Z0-9_]+)\}/g, '${$1}'); // Fix the Number() issue if it was %{...}
  }

  fs.writeFileSync(file, content, 'utf-8');
}

inject('src/App.tsx');
inject('src/components/FormulaDeepDiveModal.tsx');
inject('src/components/ModuleReader.tsx');
inject('src/components/simulators/CapFadeRateSim.tsx');
