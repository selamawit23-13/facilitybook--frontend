import { BriefcaseBusiness, Pencil, Plus, X } from "lucide-react";
import type { FormEvent } from "react";
import type { UserRole } from "@/features/users/userSlice";
import { departments, roles, roleDescriptions, roleLabel } from "@/features/userTypes";

export interface UserFormData {
  name: string;
  email: string;
  department: string;
  role: UserRole;
}

interface UserFormDialogProps {
  open: boolean;
  editing: boolean;
  form: UserFormData;
  error: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof UserFormData, value: string) => void;
}

export function UserFormDialog({
  open,
  editing,
  form,
  error,
  onClose,
  onSubmit,
  onChange,
}: UserFormDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-dialog-title"
        className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 id="user-dialog-title" className="text-lg font-bold text-slate-950">
              {editing ? "Edit user" : "Add new user"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter the user's information and assign an access role.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full name *
            </label>
            <input
              required
              value={form.name}
              onChange={(event) => onChange("name", event.target.value)}
              placeholder="Enter full name"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email address *
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => onChange("email", event.target.value)}
              placeholder="name@company.com"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Department *
            </label>
            <select
              required
              value={form.department}
              onChange={(event) => onChange("department", event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Access role *
            </label>
            <select
              required
              value={form.role}
              onChange={(event) => onChange("role", event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {roleLabel(role)}
                </option>
              ))}
            </select>
            <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-slate-500">
              <BriefcaseBusiness size={14} className="mt-0.5 shrink-0" />
              {roleDescriptions[form.role]}
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              {editing ? (
                <>
                  <Pencil size={16} />
                  Save changes
                </>
              ) : (
                <>
                  <Plus size={17} />
                  Create user
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
