import { BarChart3, CheckCircle2 } from "lucide-react";

export interface AvailableReportItem {
  name: string;
  category: string;
  description: string;
  status: string;
}

interface AvailableReportsProps {
  reports: AvailableReportItem[];
}

export function AvailableReports({ reports }: AvailableReportsProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
        <div>
          <h2 className="font-bold text-[#17251e]">
            Available reports
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Reporting categories included in FacilityBook
          </p>
        </div>

        <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
          {reports.length} report categories
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Report
              </th>
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Category
              </th>
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Description
              </th>
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {reports.map((report) => (
              <tr
                key={report.name}
                className="transition hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                      <BarChart3 size={16} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {report.name}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {report.category}
                </td>

                <td className="px-5 py-4 text-xs text-slate-500">
                  {report.description}
                </td>

                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 size={13} />
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-3">
        <p className="text-xs text-slate-400">
          Report figures are calculated from the current FacilityBook Redux records.
          Historical database reporting and server-side analytics integration pending.
        </p>
      </div>
    </section>
  );
}
