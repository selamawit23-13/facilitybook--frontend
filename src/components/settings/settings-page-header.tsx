import { Save, Settings } from "lucide-react";

interface SettingsPageHeaderProps {
  onSave: () => void;
}

export function SettingsPageHeader({ onSave }: SettingsPageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
          <Settings size={16} />
          Administration
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">System configuration</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Configure organizational operating hours, reservation policies,
          notifications and platform access.
        </p>
      </div>

      <button
        type="button"
        onClick={onSave}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
      >
        <Save size={17} />
        Save configuration
      </button>
    </div>
  );
}
