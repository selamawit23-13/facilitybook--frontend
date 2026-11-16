import { ClipboardCheck, Clock3, CircleCheck, CircleX } from "lucide-react";

interface ApprovalStatsProps {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

function MetricCard({
  label,
  value,
  note,
  icon,
  iconStyle,
}: {
  label: string;
  value: number;
  note: string;
  icon: React.ReactNode;
  iconStyle: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
          <p className="mt-2 text-xs text-slate-500">{note}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconStyle}`}>{icon}</div>
      </div>
    </div>
  );
}

export function ApprovalStats({
  total,
  pending,
  approved,
  rejected,
}: ApprovalStatsProps) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Total Requests"
        value={total}
        note="All reservation requests"
        icon={<ClipboardCheck size={20} />}
        iconStyle="bg-slate-100 text-slate-700"
      />

      <MetricCard
        label="Pending Review"
        value={pending}
        note="Awaiting a decision"
        icon={<Clock3 size={20} />}
        iconStyle="bg-amber-50 text-amber-700"
      />

      <MetricCard
        label="Approved"
        value={approved}
        note="Successfully approved"
        icon={<CircleCheck size={20} />}
        iconStyle="bg-emerald-50 text-emerald-700"
      />

      <MetricCard
        label="Rejected"
        value={rejected}
        note="Requests not approved"
        icon={<CircleX size={20} />}
        iconStyle="bg-red-50 text-red-700"
      />
    </section>
  );
}
