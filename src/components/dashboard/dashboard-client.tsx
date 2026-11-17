"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  CalendarDays,
  Box,
  CircleAlert,
  ArrowRight,
  Plus,
  Wrench,
  CheckCircle2,
  History,
  ShieldCheck,
  ChartNoAxesColumnIncreasing,
  Clock,
} from "lucide-react";

import { useAppSelector } from "@/lib/hooks";
import api from "@/services/api";

type PageResponse<T> = {
  content: T[];
  totalElements: number;
};

type Resource = {
  id: number;
  name: string;
  categoryName: string;
  status: "ACTIVE" | "INACTIVE";
};

type Reservation = {
  id: number;
  resource: {
    id: number;
    name: string;
    categoryName: string;
    buildingName: string | null;
  };
  requester: {
    id: number;
    fullName: string;
  };
  purpose: string;
  startTime: string;
  endTime: string;
  status: "PENDING_APPROVAL" | "CONFIRMED" | "REJECTED" | "CANCELLED";
};

type Notification = {
  id: number;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

type Maintenance = {
  id: number;
  resource: {
    id: number;
    name: string;
  };
  reason: string;
  status: "REPORTED" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt: string;
};

type ReportSummary = {
  totalReservations: number;
  pendingApproval: number;
  activeResources: number;
  maintenanceRecords: number;
};

type DashboardData = {
  resources: Resource[];
  resourceTotal: number;
  reservations: Reservation[];
  reservationTotal: number;
  notifications: Notification[];
  maintenance: Maintenance[];
  summary: ReportSummary | null;
};

const emptyData: DashboardData = {
  resources: [],
  resourceTotal: 0,
  reservations: [],
  reservationTotal: 0,
  notifications: [],
  maintenance: [],
  summary: null,
};

function startOfWeek(date: Date) {
  const result = new Date(date);
  const day = result.getDay();
  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);
  result.setHours(0, 0, 0, 0);

  return result;
}

function endOfWeek(date: Date) {
  const result = startOfWeek(date);
  result.setDate(result.getDate() + 6);
  result.setHours(23, 59, 59, 999);

  return result;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(value: string) {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(value).getTime()) / 1000)
  );

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;

  return `${Math.floor(seconds / 86400)} days ago`;
}

function statusLabel(status: Reservation["status"]) {
  const labels: Record<Reservation["status"], string> = {
    PENDING_APPROVAL: "Pending",
    CONFIRMED: "Confirmed",
    REJECTED: "Rejected",
    CANCELLED: "Cancelled",
  };

  return labels[status];
}

function ReservationChart({ reservations }: { reservations: Reservation[] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const counts = days.map((_, index) => {
    const date = startOfWeek(new Date());
    date.setDate(date.getDate() + index);

    return reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.startTime);

      return (
        reservationDate.getFullYear() === date.getFullYear() &&
        reservationDate.getMonth() === date.getMonth() &&
        reservationDate.getDate() === date.getDate()
      );
    }).length;
  });

  const maximum = Math.max(...counts, 1);
  const points = counts
    .map((count, index) => {
      const x = 30 + index * 76;
      const y = 150 - (count / maximum) * 110;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="fb-line-chart">
      <svg
        viewBox="0 0 520 195"
        role="img"
        aria-label="Reservations by day this week"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="reservationFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#159b68" stopOpacity=".25" />
            <stop offset="100%" stopColor="#159b68" stopOpacity=".01" />
          </linearGradient>
        </defs>

        {[10, 45, 80, 115, 150].map((y) => (
          <line
            key={y}
            x1="30"
            x2="486"
            y1={y}
            y2={y}
            stroke="#e9eeeb"
            strokeWidth="1"
          />
        ))}

        <polygon
          points={`30,150 ${points} 486,150`}
          fill="url(#reservationFill)"
        />

        <polyline
          points={points}
          fill="none"
          stroke="#078453"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {counts.map((count, index) => {
          const x = 30 + index * 76;
          const y = 150 - (count / maximum) * 110;

          return (
            <g key={days[index]}>
              <circle cx={x} cy={y} r="5" fill="#078453" />
              <circle cx={x} cy={y} r="2" fill="white" />
              <text
                x={x}
                y="175"
                textAnchor="middle"
                fontSize="11"
                fill="#647067"
              >
                {days[index]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function DashboardClient() {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role;

  const [data, setData] = useState<DashboardData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isEmployee = role === "EMPLOYEE";

  const canViewReports = [
    "ADMIN",
    "FACILITY_MANAGER",
    "DEPARTMENT_MANAGER",
    "RESOURCE_OPERATOR",
  ].includes(role ?? "");

  const canViewMaintenance = [
    "ADMIN",
    "FACILITY_MANAGER",
    "RESOURCE_OPERATOR",
  ].includes(role ?? "");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let active = true;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      const now = new Date();
      const weekFrom = startOfWeek(now).toISOString();
      const weekTo = endOfWeek(now).toISOString();

      const reservationEndpoint = isEmployee
        ? "/reservations/mine"
        : "/reservations";

      const requests = await Promise.allSettled([
        api.get<PageResponse<Resource>>("/resources", {
          params: { page: 0, size: 100 },
        }),

        api.get<PageResponse<Reservation>>(reservationEndpoint, {
          params: {
            page: 0,
            size: 100,
            from: weekFrom,
            to: weekTo,
            sort: "startTime,asc",
          },
        }),

        api.get<PageResponse<Notification>>("/notifications", {
          params: {
            page: 0,
            size: 5,
            sort: "createdAt,desc",
          },
        }),

        canViewReports
          ? api.get<ReportSummary>("/reports/summary", {
              params: {
                from: new Date(
                  now.getTime() - 30 * 24 * 60 * 60 * 1000
                ).toISOString(),
                to: now.toISOString(),
              },
            })
          : Promise.reject(new Error("Reports are not available for this role")),

        canViewMaintenance
          ? api.get<PageResponse<Maintenance>>("/maintenance", {
              params: { page: 0, size: 100 },
            })
          : Promise.reject(
              new Error("Maintenance list is not available for this role")
            ),
      ]);

      if (!active) return;

      const resourcesResult = requests[0];
      const reservationsResult = requests[1];
      const notificationsResult = requests[2];
      const summaryResult = requests[3];
      const maintenanceResult = requests[4];

      const resources =
        resourcesResult.status === "fulfilled"
          ? resourcesResult.value.data.content ?? []
          : [];

      const reservations =
        reservationsResult.status === "fulfilled"
          ? reservationsResult.value.data.content ?? []
          : [];

      const notifications =
        notificationsResult.status === "fulfilled"
          ? notificationsResult.value.data.content ?? []
          : [];

      const summary =
        summaryResult.status === "fulfilled"
          ? summaryResult.value.data
          : null;

      const maintenance =
        maintenanceResult.status === "fulfilled"
          ? maintenanceResult.value.data.content ?? []
          : [];

      const resourceTotal =
        resourcesResult.status === "fulfilled"
          ? resourcesResult.value.data.totalElements
          : resources.length;

      const reservationTotal =
        reservationsResult.status === "fulfilled"
          ? reservationsResult.value.data.totalElements
          : reservations.length;

      setData({
        resources,
        resourceTotal,
        reservations,
        reservationTotal,
        notifications,
        maintenance,
        summary,
      });

      if (
        resourcesResult.status === "rejected" &&
        reservationsResult.status === "rejected"
      ) {
        setError(
          "Dashboard data could not be loaded. Check that the backend is running and that you are logged in."
        );
      }

      setLoading(false);
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [user, isEmployee, canViewReports, canViewMaintenance]);

  const upcoming = useMemo(() => {
    const now = Date.now();

    return data.reservations
      .filter(
        (reservation) =>
          new Date(reservation.startTime).getTime() >= now &&
          reservation.status !== "CANCELLED" &&
          reservation.status !== "REJECTED"
      )
      .slice(0, 3);
  }, [data.reservations]);

  const activeResources = data.resources.filter(
    (resource) => resource.status === "ACTIVE"
  ).length;

  const inactiveResources = data.resources.filter(
    (resource) => resource.status === "INACTIVE"
  ).length;

  const openMaintenance = data.maintenance.filter(
    (item) =>
      item.status === "REPORTED" ||
      item.status === "SCHEDULED" ||
      item.status === "IN_PROGRESS"
  ).length;

  const pendingReservations = data.reservations.filter(
    (reservation) => reservation.status === "PENDING_APPROVAL"
  ).length;

  const stats = [
    {
      title: "Total Resources",
      value: data.resourceTotal,
      icon: Box,
      dark: true,
    },
    {
      title: isEmployee ? "My Reservations This Week" : "Reservations This Week",
      value: data.reservationTotal,
      icon: CalendarDays,
    },
    {
      title: "Upcoming Reservations",
      value: upcoming.length,
      icon: Clock,
    },
    {
      title: canViewMaintenance ? "Open Maintenance" : "My Pending Requests",
      value: canViewMaintenance ? openMaintenance : pendingReservations,
      icon: canViewMaintenance ? CircleAlert : CheckCircle2,
      warning: canViewMaintenance && openMaintenance > 0,
    },
  ];

  const donutTotal = activeResources + inactiveResources;
  const activePercent =
    donutTotal > 0 ? (activeResources / donutTotal) * 100 : 0;

  return (
    <div className="fb-enterprise-dashboard">
      <section className="fb-enterprise-welcome">
        <div>
          <h1>Welcome back, {user?.fullName || "User"}!</h1>
          <p>
            Here's what's happening with your facilities and resources today.
          </p>
        </div>

        <div className="fb-welcome-actions">
          <Link href="/reservations" className="fb-button-primary">
            <Plus size={19} />
            Make Reservation
          </Link>

          <Link href="/maintenance" className="fb-button-outline">
            <Wrench size={18} />
            Report Maintenance
          </Link>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="fb-enterprise-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className={`fb-enterprise-stat ${stat.dark ? "featured" : ""}`}
            >
              <div className="fb-enterprise-stat-top">
                <Icon size={27} strokeWidth={2.2} />

                <span className="fb-stat-arrow">
                  <ArrowRight size={18} />
                </span>
              </div>

              <h3>{stat.title}</h3>

              <div className="fb-stat-value-row">
                <strong>{loading ? "—" : stat.value}</strong>
                {stat.warning && !loading && (
                  <span className="negative">Attention</span>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="fb-enterprise-main-grid">
        <article className="fb-enterprise-card fb-reservation-card">
          <div className="fb-enterprise-card-heading">
            <div className="fb-heading-title">
              <ChartNoAxesColumnIncreasing size={25} />
              <h2>Reservation Overview</h2>
            </div>

            <span className="fb-period-button">This Week</span>
          </div>

          <div className="fb-chart-tooltip">
            <strong>
              {loading ? "Loading..." : `${data.reservationTotal} Reservations`}
            </strong>
            <span>Reservations this week</span>
          </div>

          <ReservationChart reservations={data.reservations} />
        </article>

        <article className="fb-enterprise-card fb-resource-status">
          <div className="fb-enterprise-card-heading">
            <h2>Resource Status</h2>
          </div>

          <div className="fb-donut-layout">
            <div
              className="fb-donut"
              style={{
                background: `conic-gradient(#078453 ${activePercent}%, #e5a13b ${activePercent}% 100%)`,
              }}
            >
              <div className="fb-donut-center">
                <strong>{loading ? "—" : donutTotal}</strong>
                <span>Total</span>
              </div>
            </div>

            <div className="fb-donut-legend">
              <div>
                <i className="available-dot" />
                <span>
                  <strong>Active</strong>
                  <small>{loading ? "—" : activeResources}</small>
                </span>
              </div>

              <div>
                <i className="maintenance-dot" />
                <span>
                  <strong>Inactive</strong>
                  <small>{loading ? "—" : inactiveResources}</small>
                </span>
              </div>
            </div>
          </div>
        </article>

        <article className="fb-enterprise-card fb-upcoming-card">
          <div className="fb-enterprise-card-heading">
            <h2>Upcoming Reservations</h2>

            <Link href="/reservations" className="fb-enterprise-view">
              View All <ArrowRight size={15} />
            </Link>
          </div>

          <div className="fb-upcoming-list">
            {loading ? (
              <p className="py-5 text-sm text-gray-500">
                Loading reservations...
              </p>
            ) : upcoming.length === 0 ? (
              <p className="py-5 text-sm text-gray-500">
                No upcoming reservations found for this week.
              </p>
            ) : (
              upcoming.map((item) => (
                <div className="fb-upcoming-item" key={item.id}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <CalendarDays size={21} />
                  </div>

                  <div className="fb-upcoming-info">
                    <strong>{item.resource?.name || "Resource"}</strong>
                    <span>
                      <CalendarDays size={13} />
                      {formatDate(item.startTime)} · {formatTime(item.startTime)}
                    </span>
                  </div>

                  <span
                    className={`fb-booking-status ${
                      item.status === "PENDING_APPROVAL" ? "pending" : ""
                    }`}
                  >
                    {statusLabel(item.status)}
                  </span>
                </div>
              ))
            )}
          </div>
        </article>
      </section>

      <section className="fb-enterprise-bottom-grid">
        <article className="fb-enterprise-card fb-activity-card">
          <div className="fb-enterprise-card-heading">
            <div className="fb-heading-title">
              <History size={24} />
              <h2>Recent Activity</h2>
            </div>

            <Link href="/notifications" className="fb-enterprise-view">
              View All <ArrowRight size={15} />
            </Link>
          </div>

          <div className="fb-activity-list">
            {loading ? (
              <p className="py-5 text-sm text-gray-500">
                Loading recent activity...
              </p>
            ) : data.notifications.length === 0 ? (
              <p className="py-5 text-sm text-gray-500">
                No recent notifications.
              </p>
            ) : (
              data.notifications.map((notification) => {
                const isSuccess =
                  notification.type.toLowerCase().includes("approved") ||
                  notification.type.toLowerCase().includes("confirmed");

                return (
                  <div className="fb-activity-item" key={notification.id}>
                    <div
                      className={`fb-activity-icon ${
                        isSuccess ? "success" : "normal"
                      }`}
                    >
                      {isSuccess ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <History size={17} />
                      )}
                    </div>

                    <div className="fb-activity-info">
                      <strong>{notification.title}</strong>
                      <span>
                        {notification.message} · {timeAgo(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </article>

        <article className="fb-enterprise-banner">
          <div className="fb-banner-content">
            <span className="fb-banner-label">FACILITYBOOK</span>

            <h2>Efficient. Secure. Smart.</h2>

            <p>
              A comprehensive solution for managing your facilities and
              resources effortlessly.
            </p>

            <Link href="/reports" className="fb-banner-button">
              Explore Features <ArrowRight size={16} />
            </Link>
          </div>

          <div className="fb-banner-features">
            <div>
              <CalendarDays size={23} />
              <span>Easy Booking</span>
            </div>

            <div>
              <ShieldCheck size={23} />
              <span>Secure Access</span>
            </div>

            <div>
              <ChartNoAxesColumnIncreasing size={23} />
              <span>Real-Time Insights</span>
            </div>
          </div>
        </article>
      </section>

      <footer className="fb-enterprise-footer">
        <span>FacilityBook</span>
        <span>Facility and Resource Management System</span>
        <span>© 2026</span>
      </footer>
    </div>
  );
}