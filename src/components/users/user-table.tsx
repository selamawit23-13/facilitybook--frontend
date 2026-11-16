import type { ReactNode } from "react";
import { Building2, Mail, Pencil, Search, UserRoundCheck, UserX } from "lucide-react";
import type { FacilityUser } from "@/features/users/userSlice";
import { roleLabel, roleStyle } from "@/features/userTypes";

interface UserTableProps {
  users: FacilityUser[];
  totalUsers: number;
  filters?: React.ReactNode;
  onEdit: (user: FacilityUser) => void;
  onToggleStatus: (userId: number) => void;
}

export function UserTable({
  users,
  totalUsers,
  onEdit,
  onToggleStatus,
}: UserTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Organization users
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Search and manage user accounts and assigned permissions.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-slate-50">
            <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4">User</th>
              <th className="px-5 py-4">Department</th>
              <th className="px-5 py-4">Assigned role</th>
              <th className="px-5 py-4">Account status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="transition hover:bg-slate-50/70">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                      {user.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {user.name}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                        <Mail size={12} />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    <Building2 size={15} className="text-slate-400" />
                    {user.department}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-lg px-2.5 py-1.5 text-[10px] font-bold ring-1 ${roleStyle(user.role)}`}>
                    {roleLabel(user.role)}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-2 text-xs font-semibold ${user.status === "Active" ? "text-emerald-700" : "text-slate-500"}`}>
                    <span className={`h-2 w-2 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                    {user.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      title="Edit user"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleStatus(user.id)}
                      title={user.status === "Active" ? "Deactivate account" : "Activate account"}
                      className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition ${user.status === "Active" ? "border-slate-200 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}
                    >
                      {user.status === "Active" ? (
                        <>
                          <UserX size={14} />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserRoundCheck size={14} />
                          Activate
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-14 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Search size={21} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    No users found
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Try another search term or change your filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center">
        <span>
          Showing {users.length} of {totalUsers} users
        </span>
        <span>Account information · Demonstration data</span>
      </div>
    </section>
  );
}


