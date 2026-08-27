const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const themeStateOld = `  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });`;

const themeStateNew = `  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme") || localStorage.getItem("economicMoatTheme");
    if (saved) return saved === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
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

if (content.includes(themeStateOld)) {
    content = content.replace(themeStateOld, themeStateNew);
    
    // Also fix toggleDarkMode
    const toggleOld = `  const toggleDarkMode = (e?: React.MouseEvent) => {
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);`;
    const toggleNew = `  const toggleDarkMode = (e?: React.MouseEvent) => {
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    localStorage.setItem("economicMoatTheme", newTheme);`;
    
    content = content.replace(toggleOld, toggleNew);
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("Success");
} else {
    console.log("themeStateOld not found exactly.");
}
