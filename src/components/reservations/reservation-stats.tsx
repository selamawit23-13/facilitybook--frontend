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
    },
    {
      title: "Upcoming",
      value: upcoming,
      note: "Approved and pending bookings",
      icon: CalendarDays,
    },
    {
      title: "Pending Approval",
      value: pending,
      note: "Awaiting an approval decision",
      icon: CircleAlert,
    },
    {
      title: "Approved",
      value: approved,
      note: "Confirmed reservations",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="fb-stat-grid fb-module-stats">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article className="fb-stat-card" key={stat.title}>
            <div className="fb-stat-top flex items-center justify-between">
              {stat.title}
              <Icon size={19} />
            </div>
            <div className="fb-stat-value">{stat.value}</div>
            <div className="fb-stat-change">{stat.note}</div>
          </article>
        );
      })}
    </section>
  );
}
