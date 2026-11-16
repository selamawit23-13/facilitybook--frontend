import { Mail, Bell } from "lucide-react";

import type { NotificationPreference } from "@/features/settingsTypes";
import { SettingsSection } from "./settings-section";

interface NotificationPreferencesProps {
  notifications: NotificationPreference[];
  onToggle: (id: string) => void;
}

export function NotificationPreferences({
  notifications,
  onToggle,
}: NotificationPreferencesProps) {
  return (
    <SettingsSection
      icon={<Bell size={20} />}
      title="Notification preferences"
      description="Choose which FacilityBook events should generate notifications."
    >
      <div className="divide-y divide-slate-100">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
                  <Icon size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={item.enabled}
                aria-label={`Toggle ${item.title}`}
                onClick={() => onToggle(item.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  item.enabled ? "bg-emerald-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    item.enabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        <Mail size={14} />
        Email delivery and in-app notification integration will be
        configured through the backend.
      </p>
    </SettingsSection>
  );
}
