import { Bell, CalendarCheck, CircleAlert, Wrench } from "lucide-react";
import type { NotificationItem } from "@/features/notifications/notificationSlice";

interface NotificationStatsProps {
  notifications: NotificationItem[];
}

function MetricCard({
  title,
  value,
  note,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: number;
  note: string;
  icon: typeof Bell;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
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
      <p className="mt-3 text-xs text-slate-400">{note}</p>
    </div>
  );
}

export function NotificationStats({ notifications }: NotificationStatsProps) {
  const unreadCount = notifications.filter((item) => !item.read).length;
  const reservationCount = notifications.filter(
    (item) => item.type === "Reservation"
  ).length;
  const maintenanceCount = notifications.filter(
    (item) => item.type === "Maintenance"
  ).length;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Total notifications"
        value={notifications.length}
        note="All received updates"
        icon={Bell}
        iconClass="bg-slate-100 text-slate-700"
      />
      <MetricCard
        title="Unread"
        value={unreadCount}
        note="Require your attention"
        icon={CircleAlert}
        iconClass="bg-emerald-50 text-emerald-700"
      />
      <MetricCard
        title="Reservations"
        value={reservationCount}
        note="Booking-related updates"
        icon={CalendarCheck}
        iconClass="bg-blue-50 text-blue-700"
      />
      <MetricCard
        title="Maintenance"
        value={maintenanceCount}
        note="Resource service updates"
        icon={Wrench}
        iconClass="bg-amber-50 text-amber-700"
      />
    </section>
  );
}
