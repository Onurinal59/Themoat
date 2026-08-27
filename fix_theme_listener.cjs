const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const themeStateOld = `  useEffect(() => {
    const saved = localStorage.getItem("theme") || localStorage.getItem("economicMoatTheme");
    if (!saved && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);`;

const themeStateNew = `  useEffect(() => {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        const currentlySaved = localStorage.getItem("theme") || localStorage.getItem("economicMoatTheme");
        if (!currentlySaved) {
          setIsDarkMode(e.matches);
        }
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);`;

if (content.includes(themeStateOld)) {
    content = content.replace(themeStateOld, themeStateNew);
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("Success");
} else {
    console.log("themeStateOld not found exactly.");
}
