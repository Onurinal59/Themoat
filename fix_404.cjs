const fs = require('fs');

let content = fs.readFileSync('public/404.html', 'utf-8');
const script = `
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      try {
        var locale = localStorage.getItem("economicMoatLocale");
        if (locale === "tr") {
          document.documentElement.lang = "tr";
          document.title = "404: Sayfa Bulunamadı | Economic Moat Academy";
          document.querySelector("h1").textContent = "Sayfa Bulunamadı";
          document.querySelector("p").textContent = "Aradığınız sayfa veya finansal analiz aracı mevcut değil, taşınmış olabilir veya URL yanlış yazılmış olabilir.";
          
          var btn = document.getElementById("btn-back-home");
          btn.innerHTML = btn.innerHTML.replace("Back to Academy", "Akademiye Dön");
          
          document.querySelector(".footer-note").textContent = "Hendek Ölçümü • ROIC • Değerleme Çerçevesi";
        }
      } catch (e) {
        // ignore
      }
    });
  </script>
`;

if (!content.includes('localStorage.getItem("economicMoatLocale")')) {
  content = content.replace('</body>', script + '\n</body>');
  fs.writeFileSync('public/404.html', content, 'utf-8');
}
