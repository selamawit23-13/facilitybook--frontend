import { Users } from "lucide-react";
import type { DepartmentItem } from "@/features/reports/reportTypes";

interface DepartmentActivityProps {
  departments: DepartmentItem[];
  maxDepartment: number;
}

export function DepartmentActivity({
  departments,
  maxDepartment,
}: DepartmentActivityProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-[#17251e]">
            Reservations by department
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Department-level booking activity
          </p>
        </div>

        <Users size={20} className="text-emerald-700" />
      </div>

      {departments.length > 0 ? (
        <div className="mt-6 space-y-4">
          {departments.map((department) => (
            <div key={department.name}>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="truncate text-xs font-medium text-slate-600">
                  {department.name}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {department.reservations}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#16835b]"
                  style={{
                    width: `${
                      maxDepartment > 0
                        ? (department.reservations / maxDepartment) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
          No department activity in this period.
        </div>
      )}
    </div>
  );
}

