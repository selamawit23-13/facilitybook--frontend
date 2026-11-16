import { Info, ShieldCheck } from "lucide-react";

import type { RolePermission } from "@/features/settingsTypes";
import { SettingsSection } from "./settings-section";

interface AccessPermissionsProps {
  permissions: RolePermission[];
}

export function AccessPermissions({
  permissions,
}: AccessPermissionsProps) {
  return (
    <SettingsSection
      icon={<ShieldCheck size={20} />}
      title="Access and permissions"
      description="Review the responsibilities assigned to each FacilityBook role."
    >
      <div className="divide-y divide-slate-100">
        {permissions.map((item) => (
          <div
            key={item.role}
            className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-bold text-slate-800">
                {item.role.replaceAll("_", " ")}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {item.description}
              </p>
            </div>
            <span className="w-fit rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              Defined role
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
        <Info size={15} className="mt-0.5 shrink-0" />
        Actual permission enforcement must be handled by backend
        authorization, not by frontend settings alone.
      </div>
    </SettingsSection>
  );
}
