import { CheckCircle2 } from "lucide-react";

export function SettingsSaveNotice() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
      <CheckCircle2 size={19} />
      Configuration validated. Backend saving will be connected later.
    </div>
  );
}
