
"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  CalendarCheck,
  TrendingUp,
  Users,
  Wrench,
  Clock3,
  CheckCircle2,
  Download,
  Building2,
  ClipboardList,
  CircleAlert,
  Activity,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { useAppSelector } from "@/lib/hooks";
import { ReservationTrend } from "@/components/reports/reservation-trend";
import { ResourceCoverage } from "@/components/reports/resource-coverage";
import { ResourceUsage } from "@/components/reports/resource-usage";
import { DepartmentActivity } from "@/components/reports/department-activity";
import { PeakTimes } from "@/components/reports/peak-times";
import { MaintenanceSummary } from "@/components/reports/maintenance-summary";
import { AvailableReports } from "@/components/reports/available-reports";
import { ReportInsight } from "@/components/reports/report-insight";

type Period = "This month" | "Last 3 months" | "This year";

interface DateRange {
  start: Date;
  end: Date;
}

interface TrendItem {
  label: string;
  value: number;
}

interface DepartmentItem {
  name: string;
  reservations: number;
}

interface ResourceUsageItem {
  name: string;
  category: string;
  usage: number;
  bookings: number;
}

interface PeakTimeItem {
  time: string;
  percentage: number;
  bookings: number;
}

function getDateRange(period: Period): DateRange {
  const now = new Date();

  if (period === "This month") {
    return {
      start: new Date(now.getFullYear(), now.getMonth(), 1),
      end: new Date(now.getFullYear(), now.getMonth() + 1, 1),
    };
  }

  if (period === "Last 3 months") {
    return {
      start: new Date(now.getFullYear(), now.getMonth() - 2, 1),
      end: new Date(now.getFullYear(), now.getMonth() + 1, 1),
    };
  }

  return {
    start: new Date(now.getFullYear(), 0, 1),
    end: new Date(now.getFullYear() + 1, 0, 1),
  };
}

function parseDate(value: string): Date | null {
  if (!value) return null;

  const date = new Date(`${value}T00:00:00`);

  return Number.isNaN(date.getTime()) ? null : date;
}

function isInRange(value: string, range: DateRange): boolean {
  const date = parseDate(value);

  return (
    date !== null &&
    date >= range.start &&
    date < range.end
  );
}

function getDurationDays(startDate: string, endDate: string): number {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (!start || !end || end < start) return 0;

  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return (
    Math.floor((end.getTime() - start.getTime()) / millisecondsPerDay) + 1
  );
}

function getTrendData(
  period: Period,
  reservations: { date: string }[]
): TrendItem[] {
  const groups: TrendItem[] = [];

  if (period === "This month") {
    for (let i = 1; i <= 5; i++) {
      groups.push({
        label: `Week ${i}`,
        value: 0,
      });
    }

    reservations.forEach((reservation) => {
      const date = parseDate(reservation.date);

      if (!date) return;

      const week = Math.min(5, Math.ceil(date.getDate() / 7));

      groups[week - 1].value += 1;
    });

    return groups;
  }

  if (period === "Last 3 months") {
    const now = new Date();

    for (let i = 2; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      groups.push({
        label: date.toLocaleDateString("en-US", {
          month: "short",
        }),
        value: 0,
      });
    }

    reservations.forEach((reservation) => {
      const date = parseDate(reservation.date);

      if (!date) return;

      const index =
        (date.getFullYear() - groups.length) * 0 +
        (date.getFullYear() -
          new Date().getFullYear()) *
          12 +
        date.getMonth() -
        new Date().getMonth() +
        2;

      if (groups[index]) {
        groups[index].value += 1;
      }
    });

    return groups;
  }

  for (let i = 1; i <= 4; i++) {
    groups.push({
      label: `Q${i}`,
      value: 0,
    });
  }

  reservations.forEach((reservation) => {
    const date = parseDate(reservation.date);

    if (!date) return;

    const quarter = Math.floor(date.getMonth() / 3);

    groups[quarter].value += 1;
  });

  return groups;
}

function getPeakTimes(
  reservations: { startTime: string }[]
): PeakTimeItem[] {
  const slots = [
    { time: "08:00 – 10:00", start: 8, end: 10, bookings: 0 },
    { time: "10:00 – 12:00", start: 10, end: 12, bookings: 0 },
    { time: "12:00 – 02:00", start: 12, end: 14, bookings: 0 },
    { time: "02:00 – 04:00", start: 14, end: 16, bookings: 0 },
    { time: "04:00 – 06:00", start: 16, end: 18, bookings: 0 },
  ];

  reservations.forEach((reservation) => {
    const hour = Number(reservation.startTime.split(":")[0]);

    if (!Number.isFinite(hour)) return;

    const slot = slots.find(
      (item) => hour >= item.start && hour < item.end
    );

    if (slot) {
      slot.bookings += 1;
    }
  });

  const maximum = Math.max(
    ...slots.map((slot) => slot.bookings),
    1
  );

  return slots.map((slot) => ({
    time: slot.time,
    bookings: slot.bookings,
    percentage:
      slot.bookings === 0
        ? 0
        : Math.round((slot.bookings / maximum) * 100),
  }));
}

export default function ReportsPage() {
  const [period, setPeriod] = useState<Period>("This month");

  const reservations = useAppSelector(
    (state) => state.reservations.items
  );

  const resources = useAppSelector(
    (state) => state.resources.items
  );

  const maintenanceRecords = useAppSelector(
    (state) => state.maintenance.records
  );

  const data = useMemo(() => {
    const range = getDateRange(period);

    const periodReservations = reservations.filter((item) =>
      isInRange(item.date, range)
    );

    const periodMaintenance = maintenanceRecords.filter((item) =>
      isInRange(item.startDate, range)
    );

    const pending = periodReservations.filter(
      (item) => item.status === "Pending"
    ).length;

    const cancellations = periodReservations.filter(
      (item) => item.status === "Cancelled"
    ).length;

    const activeReservations = periodReservations.filter(
      (item) =>
        item.status === "Approved" ||
        item.status === "Pending"
    );

    const bookedResourceNames = new Set(
      activeReservations.map((item) => item.resource)
    );

    const utilization =
      resources.length === 0
        ? 0
        : Math.round(
            (bookedResourceNames.size / resources.length) * 100
          );

    const departmentMap = new Map<string, number>();

    periodReservations.forEach((item) => {
      const department = item.department?.trim() || "Unspecified";

      departmentMap.set(
        department,
        (departmentMap.get(department) || 0) + 1
      );
    });

    const departments: DepartmentItem[] = Array.from(
      departmentMap.entries()
    )
      .map(([name, count]) => ({
        name,
        reservations: count,
      }))
      .sort((a, b) => b.reservations - a.reservations);

    const resourceMap = new Map<string, number>();

    activeReservations.forEach((item) => {
      resourceMap.set(
        item.resource,
        (resourceMap.get(item.resource) || 0) + 1
      );
    });

    const maximumResourceBookings = Math.max(
      ...Array.from(resourceMap.values()),
      1
    );

    const resourceUsage: ResourceUsageItem[] = Array.from(
      resourceMap.entries()
    )
      .map(([name, bookings]) => {
        const resource = resources.find(
          (item) => item.name === name
        );

        return {
          name,
          category: resource?.category || "Registered resource",
          bookings,
          usage: Math.round(
            (bookings / maximumResourceBookings) * 100
          ),
        };
      })
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);

    const maintenanceDays = periodMaintenance.reduce(
      (total, record) =>
        total +
        getDurationDays(record.startDate, record.endDate),
      0
    );

    return {
      reservations: periodReservations.length,
      utilization,
      pending,
      cancellations,
      maintenance: periodMaintenance.length,
      maintenanceDays,
      departments,
      resourceUsage,
      trend: getTrendData(period, periodReservations),
      peakTime: getPeakTimes(periodReservations),
    };
  }, [
    period,
    reservations,
    resources,
    maintenanceRecords,
  ]);

  const maxTrend = Math.max(
    ...data.trend.map((item) => item.value),
    1
  );

  const maxDepartment = Math.max(
    ...data.departments.map((item) => item.reservations),
    1
  );

  function exportReport() {
    const rows = [
      ["FacilityBook Analytics Report"],
      ["Reporting period", period],
      [],
      ["Metric", "Value"],
      ["Total reservations", data.reservations],
      ["Resource booking coverage", `${data.utilization}%`],
      ["Pending approvals", data.pending],
      ["Cancellations", data.cancellations],
      ["Maintenance tasks", data.maintenance],
      ["Maintenance duration (days)", data.maintenanceDays],
      [],
      ["Department", "Reservations"],
      ...data.departments.map((item) => [
        item.name,
        item.reservations,
      ]),
      [],
      ["Resource", "Category", "Bookings", "Relative activity"],
      ...data.resourceUsage.map((item) => [
        item.name,
        item.category,
        item.bookings,
        `${item.usage}%`,
      ]),
      [],
      ["Peak time", "Bookings", "Relative activity"],
      ...data.peakTime.map((item) => [
        item.time,
        item.bookings,
        `${item.percentage}%`,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? "").replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `facilitybook-report-${period
      .toLowerCase()
      .replaceAll(" ", "-")}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const reportRows = [
    {
      name: "Reservation Summary",
      category: "Reservations",
      description: "Reservation volume and booking activity",
      status: "Available",
    },
    {
      name: "Resource Booking Activity",
      category: "Resources",
      description: "Resource booking coverage and reservation frequency",
      status: "Available",
    },
    {
      name: "Department Activity",
      category: "Departments",
      description: "Reservation activity grouped by department",
      status: "Available",
    },
    {
      name: "Maintenance History",
      category: "Maintenance",
      description: "Maintenance records and recorded duration",
      status: "Available",
    },
  ];

  return (
    <AppShell>
      <main className="min-h-screen bg-[#f5f8f6] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px] space-y-6">

          {/* Heading */}
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <BarChart3 size={17} />
                Business Intelligence
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#14231c] sm:text-3xl">
                Analytics & Reports
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Understand facility performance, resource utilization,
                reservation patterns, and maintenance activity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <CalendarDays size={16} className="text-emerald-700" />

                <select
                  value={period}
                  onChange={(event) =>
                    setPeriod(event.target.value as Period)
                  }
                  className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
                  aria-label="Reporting period"
                >
                  <option>This month</option>
                  <option>Last 3 months</option>
                  <option>This year</option>
                </select>
              </div>

              <button
                onClick={exportReport}
                className="inline-flex items-center gap-2 rounded-xl bg-[#123d2b] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#195239]"
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Main metrics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total reservations"
              value={data.reservations.toLocaleString()}
              note="Reservations in selected period"
              icon={CalendarCheck}
              iconClass="bg-emerald-50 text-emerald-700"
            />

            <MetricCard
              title="Resource booking coverage"
              value={`${data.utilization}%`}
              note="Resources with active bookings"
              icon={Activity}
              iconClass="bg-blue-50 text-blue-700"
            />

            <MetricCard
              title="Pending approvals"
              value={data.pending.toString()}
              note="Awaiting manager decisions"
              icon={CircleAlert}
              iconClass="bg-amber-50 text-amber-700"
            />

            <MetricCard
              title="Cancellations"
              value={data.cancellations.toString()}
              note="Cancelled reservations"
              icon={ClipboardList}
              iconClass="bg-rose-50 text-rose-700"
            />
          </section>

          {/* Reservation trend and booking coverage */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <ReservationTrend
              period={period}
              totalReservations={data.reservations}
              trend={data.trend}
              maxTrend={maxTrend}
            />

            <ResourceCoverage utilization={data.utilization} />
          </section>
          {/* Resource and department reports */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <ResourceUsage resources={data.resourceUsage} />

            <DepartmentActivity
              departments={data.departments}
              maxDepartment={maxDepartment}
            />
          </section>
          {/* Peak times and maintenance */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <PeakTimes peakTime={data.peakTime} />

            <MaintenanceSummary
              maintenance={data.maintenance}
              maintenanceDays={data.maintenanceDays}
            />
          </section>
          {/* Available reports */}
          <AvailableReports reports={reportRows} />
          {/* Final note */}
          <ReportInsight />

        </div>
      </main>
    </AppShell>
  );
}

function MetricCard({
  title,
  value,
  note,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: string;
  note: string;
  icon: typeof BarChart3;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-[#17251e]">
            {value}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs text-slate-400">{note}</p>
      </div>
    </div>
  );
}

