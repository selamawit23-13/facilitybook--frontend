import { Building2 } from "lucide-react";

export function OrganizationInfo() {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-white p-3 text-emerald-700 shadow-sm">
          <Building2 size={21} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-emerald-950">
            FacilityBook system configuration
          </h2>
          <p className="mt-1 text-sm leading-6 text-emerald-800">
            These settings demonstrate the configuration options for the
            facility management platform. Resource-specific operating
            hours, approval rules, maintenance periods and reservation
            conflicts must ultimately be validated by the backend.
          </p>
        </div>
      </div>
    </section>
  );
}
