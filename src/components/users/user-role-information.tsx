import { roles, roleDescriptions, roleLabel, roleStyle } from "@/features/userTypes";

export function UserRoleInformation() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-bold text-slate-950">
          Platform access roles
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Each role has a different responsibility within FacilityBook.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => (
          <div
            key={role}
            className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"
          >
            <span
              className={`inline-flex rounded-lg px-2.5 py-1 text-[11px] font-bold ring-1 ${roleStyle(role)}`}
            >
              {roleLabel(role)}
            </span>
            <p className="mt-3 text-sm leading-5 text-slate-600">
              {roleDescriptions[role]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
