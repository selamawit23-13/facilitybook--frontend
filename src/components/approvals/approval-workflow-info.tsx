import { History } from "lucide-react";

export function ApprovalWorkflowInfo() {
  return (
    <section className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-white p-2 text-emerald-700">
          <History size={19} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">
            Approval workflow
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Reservations requiring authorization are reviewed by the
            appropriate Facility Manager or Department Manager. Rejected
            requests must include a reason.
          </p>
        </div>
      </div>
    </section>
  );
}
