import { UserRoundCheck, UserX } from "lucide-react";

interface UserAccountSummaryProps {
  active: number;
  inactive: number;
}

export function UserAccountSummary({
  active,
  inactive,
}: UserAccountSummaryProps) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
        <div>
          <p className="text-sm font-medium text-emerald-800">
            Active accounts
          </p>
          <p className="mt-1 text-2xl font-bold text-emerald-950">{active}</p>
          <p className="mt-1 text-xs text-emerald-700">
            Currently active in this demonstration
          </p>
        </div>
        <div className="rounded-xl bg-white p-3 text-emerald-700 shadow-sm">
          <UserRoundCheck size={23} />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <p className="text-sm font-medium text-slate-600">
            Inactive accounts
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-950">{inactive}</p>
          <p className="mt-1 text-xs text-slate-500">
            Accounts currently deactivated
          </p>
        </div>
        <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
          <UserX size={23} />
        </div>
      </div>
    </section>
  );
}
