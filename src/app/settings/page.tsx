"use client";

import { AppShell } from "@/components/layout/app-shell";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import {
  toggleNotification,
  toggleWorkingDay,
  setOpeningTime,
  setClosingTime,
  setCancellationHours,
  setApprovalRequired,
  markSettingsSaved,
} from "@/features/settings/settingsSlice";

import {
  selectSettings,
  selectSettingsOverview,
} from "@/features/settings/settingsSelectors";

import {
  Settings,
  ShieldCheck,
  Bell,
  Clock,
  CalendarDays,
  ChevronDown,
  Save,
  CheckCircle2,
  Mail,
  CalendarCheck,
  Wrench,
  ClipboardCheck,
  Building2,
  Info,
} from "lucide-react";

const rolePermissions = [
  {
    role: "ADMIN",
    description: "Manage users, roles, resource categories and platform settings.",
  },
  {
    role: "EMPLOYEE",
    description: "Search available resources and manage permitted reservations.",
  },
  {
    role: "FACILITY_MANAGER",
    description: "Manage resource availability and facility reservation approvals.",
  },
  {
    role: "DEPARTMENT_MANAGER",
    description: "Approve or reject reservations requiring department authorization.",
  },
  {
    role: "RESOURCE_OPERATOR",
    description: "Manage resource schedules, availability and maintenance.",
  },
];

const notificationDefinitions = [
  {
    id: "confirmation",
    title: "Reservation confirmations",
    description: "When a reservation is submitted or confirmed.",
    icon: CalendarCheck,
  },
  {
    id: "approval",
    title: "Approval updates",
    description: "When a reservation is approved or rejected.",
    icon: ClipboardCheck,
  },
  {
    id: "maintenance",
    title: "Maintenance updates",
    description: "When resources become unavailable or return to service.",
    icon: Wrench,
  },
  {
    id: "reminders",
    title: "Upcoming reservation reminders",
    description: "Reminders before a scheduled reservation.",
    icon: Bell,
  },
];

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function SettingsPage() {
  const dispatch = useAppDispatch();

  const settings = useAppSelector(selectSettings);
  const overview = useAppSelector(selectSettingsOverview);

  const notifications = notificationDefinitions.map((definition) => ({
    ...definition,
    enabled:
      settings.notificationPreferences.find(
        (item) => item.id === definition.id
      )?.enabled ?? false,
  }));

  function saveSettings() {
    if (settings.closingTime <= settings.openingTime) {
      alert("Closing time must be later than opening time.");
      return;
    }

    if (settings.workingDays.length === 0) {
      alert("Please select at least one working day.");
      return;
    }

    dispatch(markSettingsSaved());
  }

  return (
    <AppShell>
      <main className="min-w-0 space-y-6 pb-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
              <Settings size={16} />
              Administration
              <span className="text-slate-400">/</span>
              <span className="text-slate-500">System configuration</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Settings
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Configure organizational operating hours, reservation policies,
              notifications and platform access.
            </p>
          </div>

          <button
            type="button"
            onClick={saveSettings}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            <Save size={17} />
            Save configuration
          </button>
        </div>

        {settings.saved && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <CheckCircle2 size={19} />
            Configuration validated. Backend saving will be connected later.
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <OverviewCard
            icon={<ShieldCheck size={20} />}
            label="Access roles"
            value="5"
            description="Defined platform roles"
          />
          <OverviewCard
            icon={<Bell size={20} />}
            label="Notifications"
            value={`${overview.enabledNotifications} / ${overview.totalNotifications}`}
            description="Enabled notification types"
          />
          <OverviewCard
            icon={<Clock size={20} />}
            label="Operating hours"
            value={overview.operatingHours}
            description="Configured daily schedule"
          />
          <OverviewCard
            icon={<CalendarDays size={20} />}
            label="Working days"
            value={`${overview.workingDays} days`}
            description="Selected weekly schedule"
          />
        </section>

        <SettingsSection
          icon={<ShieldCheck size={20} />}
          title="Access and permissions"
          description="Review the responsibilities assigned to each FacilityBook role."
        >
          <div className="divide-y divide-slate-100">
            {rolePermissions.map((item) => (
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

        <SettingsSection
          icon={<Bell size={20} />}
          title="Notification preferences"
          description="Choose which FacilityBook events should generate notifications."
        >
          <div className="divide-y divide-slate-100">
            {notifications.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
                      <Icon size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={item.enabled}
                    aria-label={`Toggle ${item.title}`}
                    onClick={() =>
                      dispatch(toggleNotification(item.id))
                    }
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      item.enabled ? "bg-emerald-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        item.enabled ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <Mail size={14} />
            Email delivery and in-app notification integration will be
            configured through the backend.
          </p>
        </SettingsSection>

        <SettingsSection
          icon={<Clock size={20} />}
          title="Operating hours and availability"
          description="Define when organizational facilities are normally available."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Opening time
              </label>
              <input
                type="time"
                value={settings.openingTime}
                onChange={(event) =>
                  dispatch(setOpeningTime(event.target.value))
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Closing time
              </label>
              <input
                type="time"
                value={settings.closingTime}
                onChange={(event) =>
                  dispatch(setClosingTime(event.target.value))
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Working days
            </p>

            <div className="flex flex-wrap gap-2">
              {weekdays.map((day) => {
                const selected = settings.workingDays.includes(day);

                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => dispatch(toggleWorkingDay(day))}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                      selected
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          icon={<CalendarDays size={20} />}
          title="Reservation policies"
          description="Review basic booking rules for organizational resources."
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Cancellation notice period
              </label>

              <div className="relative max-w-sm">
                <select
                  value={settings.cancellationHours}
                  onChange={(event) =>
                    dispatch(setCancellationHours(event.target.value))
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-700 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="2">2 hours before reservation</option>
                  <option value="6">6 hours before reservation</option>
                  <option value="12">12 hours before reservation</option>
                  <option value="24">24 hours before reservation</option>
                  <option value="48">48 hours before reservation</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Demonstration policy for reservation cancellation.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Reservation approval workflow
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Enable approval review for reservations requiring
                  authorization under resource or department policies.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={settings.approvalRequired}
                aria-label="Toggle reservation approval workflow"
                onClick={() =>
                  dispatch(setApprovalRequired(!settings.approvalRequired))
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  settings.approvalRequired ? "bg-emerald-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    settings.approvalRequired ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </SettingsSection>

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

        <div className="flex justify-end">
          <button
            type="button"
            onClick={saveSettings}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            <Save size={17} />
            Save configuration
          </button>
        </div>

        <p className="text-center text-xs text-slate-400">
          Demonstration settings · Backend configuration and persistence
          pending
        </p>
      </main>
    </AppShell>
  );
}

function OverviewCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
          {icon}
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
        <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
          {icon}
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}
