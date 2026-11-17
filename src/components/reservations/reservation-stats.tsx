
import {
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
} from "lucide-react";

interface ReservationStatsProps {
  total: number;
  upcoming: number;
  pending: number;
  approved: number;
}

export function ReservationStats({
  total,
  upcoming,
  pending,
  approved,
}: ReservationStatsProps) {
  const stats = [
    {
      title: "Total Reservations",
      value: total,
      note: "All recorded booking requests",
      icon: ClipboardList,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Upcoming",
      value: upcoming,
      note: "Approved and pending bookings",
      icon: CalendarDays,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Approval",
      value: pending,
      note: "Awaiting an approval decision",
      icon: CircleAlert,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Approved",
      value: approved,
      note: "Confirmed reservations",
      icon: CheckCircle2,
      iconStyle: "bg-gray-100 text-gray-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-gray-600">
                {stat.title}
              </span>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={20} />
              </div>
            </div>

            <div className="mt-3 text-3xl font-bold text-gray-900">
              {stat.value}
            </div>

            <p className="mt-2 text-xs text-gray-500">
              {stat.note}
            </p>
          </article>
        );
      })}
    </section>
  );
}
