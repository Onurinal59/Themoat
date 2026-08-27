import React, { useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { MouseEvent } from "react";
import {
  FolderKanban,
  Plus,
  Play,
  Copy,
  Download,
  Upload,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  Clock,
  Shield,
  Layers,
  Zap,
  Calculator,
  Award,
  ArrowRight,
  RefreshCw,
  FileJson,
  TrendingUp,
  BarChart3,
  Check,
  AlertCircle
} from "lucide-react";
import { CompanyAuditDossier } from "../types";
import { calculateFinancialOutputs, computeMoatScore, MAUBOUSSIN_GUIDED_TEMPLATE, translateMoatDriver, translateMoatType, translateMoatWidth } from "../data/companyAuditData";

interface MyWorkspacesViewProps {
  dossiers: CompanyAuditDossier[];
  activeDossierId: string;
  onSelectDossier: (id: string, step?: 1 | 2 | 3 | 4 | 5) => void;
  onCreateNew: () => void;
  onDuplicateDossier: (dossier: CompanyAuditDossier) => void;
  onDeleteDossier: (id: string) => void;
  onImportDossiers: (imported: CompanyAuditDossier[]) => void;
  onResetToPresets: () => void;
  onOpenAuditStudio: () => void;
}

export const MyWorkspacesView: React.FC<MyWorkspacesViewProps> = ({
  dossiers,
  activeDossierId,
  onSelectDossier,
  onCreateNew,
  onDuplicateDossier,
  onDeleteDossier,
  onImportDossiers,
  onResetToPresets,
  onOpenAuditStudio,
}) => {
  const { language, isEnglish, t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "custom" | "presets" | "template" | "wide" | "valueCreating">("all");
  const [sortBy, setSortBy] = useState<"updated" | "roic" | "moatScore" | "name">("updated");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  // Find if master template is present
  const hasMasterTemplate = dossiers.some((d) => d.id === MAUBOUSSIN_GUIDED_TEMPLATE.id);

  const handleOpenMasterTemplate = () => {
    if (!hasMasterTemplate) {
      onImportDossiers([MAUBOUSSIN_GUIDED_TEMPLATE]);
    }
    onSelectDossier(MAUBOUSSIN_GUIDED_TEMPLATE.id, 1);
    onOpenAuditStudio();
    showToast(t("MyWorkspacesView.mauboussin_measuring_617"));
  };

  const handleStartCustomFromTemplate = () => {
    onDuplicateDossier({
      ...MAUBOUSSIN_GUIDED_TEMPLATE,
      companyName: t("MyWorkspacesView.my_new_audit_maubous_618"),
      ticker: "NEW-AUDIT",
      isCustom: true
    });
    onOpenAuditStudio();
    showToast(t("MyWorkspacesView.new_custom_audit_ini_619"));
  };

  // Calculate high-level portfolio statistics
  const totalCount = dossiers.length;
  const customCount = dossiers.filter((d) => d.isCustom).length;
  
  const analyzedStats = dossiers.map((d) => {
    const fin = calculateFinancialOutputs(d.financials);
    const moat = computeMoatScore(d);
    return {
      dossier: d,
      fin,
      moat,
      isValueCreating: fin.isCreatingValue,
      isWideMoat: moat.diagnosedMoat.includes("Geniş") || moat.diagnosedMoat.includes("Wide"),
    };
  });

  const valueCreatingCount = analyzedStats.filter((s) => s.isValueCreating).length;
  const wideMoatCount = analyzedStats.filter((s) => s.isWideMoat).length;

  // Filter list
  const filteredList = analyzedStats.filter(({ dossier, isValueCreating, isWideMoat }) => {
    const matchesSearch =
      dossier.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dossier.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dossier.industry.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === "custom") return dossier.isCustom === true;
    if (filterType === "presets") return !dossier.isCustom && dossier.id !== MAUBOUSSIN_GUIDED_TEMPLATE.id;
    if (filterType === "template") return dossier.id === MAUBOUSSIN_GUIDED_TEMPLATE.id || dossier.tags?.some(tag => tag.includes("Taslak") || tag.includes("Template"));
    if (filterType === "wide") return isWideMoat;
    if (filterType === "valueCreating") return isValueCreating;
    return true;
  });

  // Sort list
  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === "updated") {
      return (b.dossier.updatedAt || "").localeCompare(a.dossier.updatedAt || "");
    }
    if (sortBy === "roic") {
      return b.fin.roicPercent - a.fin.roicPercent;
    }
    if (sortBy === "moatScore") {
      return b.moat.scorePercent - a.moat.scorePercent;
    }
    if (sortBy === "name") {
      return a.dossier.companyName.localeCompare(b.dossier.companyName, t("MyWorkspacesView.en_620"));
    }
    return 0;
  });

  // Export single study
  const handleExportSingle = (dossier: CompanyAuditDossier) => {
    const jsonStr = JSON.stringify(dossier, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${dossier.ticker.replace(/[^a-zA-Z0-9]/g, "_")}_moat_analysis.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(isEnglish ? `"${dossier.companyName}" exported as JSON.` : `"${dossier.companyName}" JSON formatında indirildi.`);
  };

  // Export all studies
  const handleExportAll = () => {
    const jsonStr = JSON.stringify(dossiers, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `all_moat_studies_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(isEnglish ? `All ${dossiers.length} studies backed up to JSON.` : `Tüm ${dossiers.length} çalışma yedek dosyası olarak indirildi.`);
  };

  // Handle JSON file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          // Multiple dossiers
          onImportDossiers(parsed);
          showToast(isEnglish ? `${parsed.length} studies imported successfully!` : `${parsed.length} adet analiz başarıyla içe aktarıldı!`);
        } else if (parsed && parsed.companyName && parsed.financials) {
          // Single dossier
          onImportDossiers([parsed]);
          showToast(isEnglish ? `"${parsed.companyName}" study imported!` : `"${parsed.companyName}" analizi içe aktarıldı!`);
        } else {
          showToast(t("MyWorkspacesView.invalid_format_pleas_621"));
        }
      } catch (err) {
        console.error("Import error:", err);
        showToast(t("MyWorkspacesView.error_reading_file_p_622"));
      }
    };

    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8" id="my-workspaces-hub">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-indigo-600 px-5 py-3 rounded-2xl shadow-xl border border-slate-700 dark:border-indigo-400 flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden File Input for JSON import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json"
        className="hidden"
      />

      {/* Top Banner with Stats */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-1.5">
                <FolderKanban className="w-3.5 h-3.5" /> {t("workspaces.badge", "Çalışmalarım & Portföyüm")}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {t("workspaces.localStorageSafe", "Tarayıcıda Güvende (LocalStorage)")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {t("workspaces.title", "Kayıtlı Şirket Hendek Analizlerim")}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {t("workspaces.subtitle", "Borsa İstanbul ve dünya piyasalarında incelediğiniz tüm hisselerin bilanço röntgenlerini, WTP/WTS hendek motorlarını ve notlarını burada saklayın; kaldığınız adımdan anında devam edin!")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              title={t("MyWorkspacesView.import_a_previously_623")}
            >
              <Upload className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {t("workspaces.uploadBackup", "Yedekten Yükle (.json)")}
            </button>

            <button
              onClick={handleExportAll}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              title={t("MyWorkspacesView.download_all_saved_s_624")}
            >
              <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {t("workspaces.backupAll", "Tümünü Yedekle")}
            </button>

            <button
              onClick={onCreateNew}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {t("workspaces.startNew", "Yeni Şirket Analizi Başlat")}
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <FolderKanban className="w-4 h-4 text-indigo-500" /> {t("workspaces.totalFiles", "Toplam Dosya")}
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {totalCount}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{t("workspaces.companies", "şirket")}</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> {t("workspaces.myStudies", "Kendi Çalışmalarım")}
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                {customCount}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{t("workspaces.customAnalyses", "özgün analiz")}</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> {t("workspaces.positiveValue", "Pozitif Değer Yaratan")}
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {valueCreatingCount}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">ROIC &gt; WACC</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-indigo-500" /> {t("workspaces.wideMoatCount", "Geniş Hendekli")}
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {wideMoatCount}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{t("workspaces.highProtected", "yüksek korumalı")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED: Mauboussin 'Measuring the Moat' Practice Blueprint Hero Card - PERFECT LIGHT & DARK THEME */}
      <div className="bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-indigo-100/60 dark:from-indigo-950 dark:via-slate-900 dark:to-indigo-950 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-xs border border-indigo-200/80 dark:border-indigo-500/30 relative overflow-hidden transition-colors">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-400/30 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> {t("workspaces.masterBannerBadge", "Michael J. Mauboussin Metodolojisi")}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-400/30">
                {t("workspaces.masterTemplateBadge", "Rehberli Örnek Vaka Taslağı")}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t("workspaces.masterBannerTitle", "\"Measuring the Moat\" Ustalık Taslağı ile Gerçek Vaka Analizi Yapın")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-indigo-100/80 leading-relaxed">
              {t("workspaces.masterBannerDesc", "Costco & BİM perakende modelleri üzerinden ROIC & DuPont ayrıştırması, negatif işletme sermayesi, WTP/WTS değer çubuğu ve 20 yıllık CAP ömrü analizini adım adım inceleyin; ister şablonu inceleyin, ister anında kendi şirketiniz için kopyalayın!")}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleOpenMasterTemplate}
              className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              {t("workspaces.openGuidedTemplate", "Rehberli Şablonu Aç")}
            </button>
            <button
              onClick={handleStartCustomFromTemplate}
              className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 shadow-2xs transition-all cursor-pointer"
            >
              <Copy className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {t("workspaces.startFromTemplate", "Bu Şablondan Yeni Başlat")}
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("workspaces.searchPlaceholder", "Şirket adı, hisse kodu veya sektör ara...")}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              {t("workspaces.clear", "Temizle")}
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: "all", label: `${t("workspaces.filterAll", "Tümü")} (${totalCount})` },
            { id: "template", label: `📘 ${t("workspaces.filterTemplate", "Rehber Taslak")}` },
            { id: "custom", label: `${t("workspaces.filterCustom", "Özgün Çalışmalarım")} (${customCount})` },
            { id: "presets", label: t("workspaces.filterPresets", "Hazır Vakalar") },
            { id: "wide", label: `${t("workspaces.filterWide", "Geniş Hendek")} (${wideMoatCount})` },
            { id: "valueCreating", label: `${t("workspaces.filterValueCreating", "Değer Yaratan")} (${valueCreatingCount})` },
          ].map((flt) => (
            <button
              key={flt.id}
              onClick={() => setFilterType(flt.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === flt.id
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">{t("workspaces.sortBy", "Sırala:")}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="updated">{t("workspaces.sortUpdated", "Son Düzenlenen")}</option>
            <option value="roic">{t("workspaces.sortRoic", "En Yüksek ROIC (%)")}</option>
            <option value="moatScore">{t("workspaces.sortMoatScore", "En Yüksek Hendek Skoru")}</option>
            <option value="name">{t("workspaces.sortName", "Şirket Adı (A-Z)")}</option>
          </select>
        </div>
      </div>

      {/* Studies Grid */}
      {sortedList.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {t("workspaces.noResultsTitle", "Aramanızla Eşleşen Çalışma Bulunamadı")}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {t("workspaces.noResultsDesc", "Filtreleri sıfırlayabilir veya hemen yeni bir şirket analizi başlatabilirsiniz.")}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterType("all");
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              {t("workspaces.clearFilters", "Filtreleri Temizle")}
            </button>
            <button
              onClick={onCreateNew}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer"
            >
              {t("workspaces.addNew", "Yeni Şirket Ekle")}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedList.map(({ dossier, fin, moat, isValueCreating, isWideMoat }) => {
            const isCurrentlyActive = dossier.id === activeDossierId;
            const currentStepNumber = dossier.lastStep || 1;
            const stepTitlesTR: Record<number, string> = {
              1: "Adım 1: Finansal Röntgen (ROIC)",
              2: "Adım 2: Sektör & Kâr Havuzu",
              3: "Adım 3: Değer Çubuğu & Hendek",
              4: "Adım 4: Oyun Teorisi & Sermaye",
              5: "Adım 5: Sonuç & Teşhis Raporu"
            };
            const stepTitlesEN: Record<number, string> = {
              1: "Step 1: Financial X-Ray (ROIC)",
              2: "Step 2: Industry & Profit Pool",
              3: "Step 3: Value Stick & Moat",
              4: "Step 4: Game Theory & Capital",
              5: "Step 5: Synthesis & Verdict"
            };
            const stepTitles = isEnglish ? stepTitlesEN : stepTitlesTR;

            return (
              <div
                key={dossier.id}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                className={`bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between transition-all relative group hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] spotlight-card ${
                  isCurrentlyActive
                    ? "border-indigo-500/80 dark:border-indigo-400/80 ring-2 ring-indigo-500/20"
                    : "border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-300/80 dark:hover:border-slate-600/80"
                }`}
              >
                {/* Header Row */}
                <div className="space-y-4 spotlight-content">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                          {dossier.ticker}
                        </span>
                        {dossier.isCustom ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" /> {t("workspaces.customAnalysisBadge", "Özgün Analiz")}
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {t("workspaces.caseStudy", "Vaka Örneği")}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {dossier.companyName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {dossier.industry}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-lg font-black text-slate-900 dark:text-slate-100">
                        %{moat.scorePercent}
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isWideMoat
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                          : moat.diagnosedMoat.includes("Dar") || moat.diagnosedMoat.includes("Narrow")
                          ? "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300"
                          : "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                      }`}>
                        {translateMoatWidth(moat.diagnosedMoat, isEnglish)}
                      </span>
                    </div>
                  </div>

                  {/* Financial Snapshot Bar */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">ROIC</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        %{fin.roicPercent}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">WACC</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        %{dossier.financials.wacc}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{t("workspaces.spread", "Yayılım")}</span>
                      <span className={`text-xs font-bold ${
                        isValueCreating ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                      }`}>
                        {isValueCreating ? "+" : ""}%{fin.spread}
                      </span>
                    </div>
                  </div>

                  {/* Key Moat Drivers Tag Cloud */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="font-semibold">{t("workspaces.moatDrivers", "Hendek Motorları:")}</span>
                      <span className="text-indigo-600 dark:text-indigo-400 capitalize">
                        {translateMoatType(dossier.competitiveAdvantage.primaryType, isEnglish)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {dossier.competitiveAdvantage.subDrivers.slice(0, 3).map((sub, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {translateMoatDriver(sub, isEnglish)}
                        </span>
                      ))}
                      {dossier.competitiveAdvantage.subDrivers.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                          +{dossier.competitiveAdvantage.subDrivers.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Resume Step Progress Pill */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-500" />
                      {t("workspaces.currentStep", "Kaldığın Adım:")}
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {stepTitles[currentStepNumber] || (isEnglish ? `Step ${currentStepNumber}` : `Adım ${currentStepNumber}`)}
                    </span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {/* Duplicate Study */}
                    <button
                      onClick={() => {
                        onDuplicateDossier(dossier);
                        showToast(isEnglish ? `Duplicate of "${dossier.companyName}" created.` : `"${dossier.companyName}" çalışmasının kopyası oluşturuldu.`);
                      }}
                      className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title={t("MyWorkspacesView.duplicate_this_audit_625")}
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Export JSON */}
                    <button
                      onClick={() => handleExportSingle(dossier)}
                      className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title={t("MyWorkspacesView.export_as_json_626")}
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    {/* Delete Study */}
                    <button
                      onClick={() => {
                        if (deleteConfirmId === dossier.id) {
                          onDeleteDossier(dossier.id);
                          setDeleteConfirmId(null);
                          showToast(isEnglish ? `"${dossier.companyName}" deleted.` : `"${dossier.companyName}" silindi.`);
                        } else {
                          setDeleteConfirmId(dossier.id);
                          setTimeout(() => setDeleteConfirmId(null), 4000);
                        }
                      }}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        deleteConfirmId === dossier.id
                          ? "bg-rose-500 text-white animate-pulse"
                          : "text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      }`}
                      title={deleteConfirmId === dossier.id ? (t("MyWorkspacesView.click_again_to_confi_627")) : (t("MyWorkspacesView.delete_study_628"))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Primary Resume Button */}
                  <button
                    onClick={() => {
                      onSelectDossier(dossier.id, currentStepNumber as any);
                      onOpenAuditStudio();
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t("workspaces.resumeButton", "Kaldığın Yerden Devam Et")}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preset Reset Footer Help */}
      <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>
            {t("MyWorkspacesView.all_your_research_is_629")}
          </span>
        </div>
        <button
          onClick={() => {
            onResetToPresets();
            showToast(t("MyWorkspacesView.preset_cases_refresh_630"));
          }}
          className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {t("workspaces.resetPresets", "Örnek Vakaları Sıfırla")}
        </button>
      </div>
    </div>
  );
};
