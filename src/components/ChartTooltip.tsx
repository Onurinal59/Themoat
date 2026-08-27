import React from "react";

export interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
  unit?: string;
  prefix?: string;
  titleFormatter?: (label: string) => string;
  valueFormatter?: (value: any, name: string, entry?: any) => string | [string, string?];
}

export const CustomChartTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  unit = "",
  prefix = "",
  titleFormatter,
  valueFormatter,
}) => {
  if (!active || !payload || !Array.isArray(payload) || payload.length === 0) return null;

  const labelStr = label !== undefined && label !== null ? String(label) : "";
  const displayTitle = titleFormatter ? titleFormatter(labelStr) : labelStr;

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-xl shadow-xl p-3 text-xs space-y-1.5 z-50 min-w-[150px] ring-1 ring-slate-900/5 dark:ring-white/10 pointer-events-none">
      {displayTitle && (
        <div className="font-semibold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800/80 pb-1.5 text-[11px] tracking-tight">
          {displayTitle}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => {
          if (!entry) return null;
          const color = entry.color || entry.fill || entry.stroke || "#6366F1";
          let name = entry.name || entry.dataKey || "";
          const rawVal = entry.value;

          let formattedVal: React.ReactNode;
          if (valueFormatter) {
            try {
              const res = valueFormatter(rawVal, name, entry);
              if (Array.isArray(res)) {
                formattedVal = res[0];
                if (res[1]) {
                  name = res[1];
                }
              } else {
                formattedVal = res;
              }
            } catch {
              formattedVal = typeof rawVal === "number" ? `${prefix}${rawVal.toLocaleString()}${unit}` : `${prefix}${rawVal ?? ""}${unit}`;
            }
          } else {
            formattedVal =
              typeof rawVal === "number"
                ? `${prefix}${rawVal.toLocaleString()}${unit}`
                : `${prefix}${rawVal ?? ""}${unit}`;
          }

          return (
            <div key={`tooltip-item-${index}`} className="flex items-center justify-between gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-2xs"
                  style={{ backgroundColor: color }}
                />
                <span className="truncate max-w-[140px]">{name}</span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-right">
                {formattedVal}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

