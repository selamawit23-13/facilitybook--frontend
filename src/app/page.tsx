
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
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";

const stats = [
  {
    title: "Total Facilities",
    value: "12",
    icon: Building2,
    dark: true,
  },
  {
    title: "Total Resources",
    value: "87",
    icon: Box,
  },
  {
    title: "Upcoming Reservations",
    value: "18",
    icon: CalendarDays,
  },
  {
    title: "Under Maintenance",
    value: "7",
    icon: CircleAlert,
    warning: true,
  },
];

const upcoming = [
  {
    title: "Conference Room A",
    date: "Nov 14, 2026",
    time: "09:00 AM",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=180&q=85",
  },
  {
    title: "Projector (Main Hall)",
    date: "Nov 14, 2026",
    time: "01:00 PM",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=180&q=85",
  },
  {
    title: "Training Room 1",
    date: "Nov 15, 2026",
    time: "10:00 AM",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=180&q=85",
  },
];

const activities = [
  {
    title: "New reservation approved",
    detail: "Conference Room A",
    time: "2 hours ago",
    icon: CheckCircle2,
    type: "success",
  },
  {
    title: "Maintenance request updated",
    detail: "Air Conditioner",
    time: "3 hours ago",
    icon: Wrench,
    type: "normal",
  },
  {
    title: "Resource returned",
    detail: "Laptop",
    time: "5 hours ago",
    icon: CheckCircle2,
    type: "success",
  },
];

const weekData = [
  { day: "Mon", value: 8 },
  { day: "Tue", value: 10.5 },
  { day: "Wed", value: 15.5 },
  { day: "Thu", value: 12 },
  { day: "Fri", value: 8.5 },
  { day: "Sat", value: 7 },
  { day: "Sun", value: 11.5 },
];

function ReservationChart() {
  const points = weekData
    .map((item, index) => {
      const x = 30 + index * 76;
      const y = 150 - item.value * 7.1;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="fb-line-chart">
      <svg
        viewBox="0 0 520 195"
        role="img"
        aria-label="Weekly reservation activity chart"
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

        {weekData.map((item, index) => {
          const x = 30 + index * 76;
          const y = 150 - item.value * 7.1;

          return (
            <g key={item.day}>
              <circle cx={x} cy={y} r="5" fill="#078453" />
              <circle cx={x} cy={y} r="2" fill="white" />
              <text
                x={x}
                y="175"
                textAnchor="middle"
                fontSize="11"
                fill="#647067"
              >
                {item.day}
              </text>
            </g>
          );
        })}

        {[0, 5, 10, 15, 20].map((value, index) => (
          <text
            key={value}
            x="2"
            y={154 - index * 35}
            fontSize="10"
            fill="#7b877f"
          >
            {value}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <AppShell>
      <div className="fb-enterprise-dashboard">
        <section className="fb-enterprise-welcome">
          <div>
            <h1>Welcome back, Selamawit!</h1>
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
                  <strong>{stat.value}</strong>
                  {stat.warning && (
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

              <button className="fb-period-button" type="button">
                This Week <ChevronDown size={15} />
              </button>
            </div>

            <div className="fb-chart-tooltip">
              <strong>18 Reservations</strong>
              <span>Weekly overview</span>
            </div>

            <ReservationChart />
          </article>

          <article className="fb-enterprise-card fb-resource-status">
            <div className="fb-enterprise-card-heading">
              <h2>Resource Status</h2>
            </div>

            <div className="fb-donut-layout">
              <div className="fb-donut">
                <div className="fb-donut-center">
                  <strong>87</strong>
                  <span>Total</span>
                </div>
              </div>

              <div className="fb-donut-legend">
                <div>
                  <i className="available-dot" />
                  <span>
                    <strong>Available</strong>
                    <small>52 (60%)</small>
                  </span>
                </div>

                <div>
                  <i className="reserved-dot" />
                  <span>
                    <strong>Reserved</strong>
                    <small>28 (32%)</small>
                  </span>
                </div>

                <div>
                  <i className="maintenance-dot" />
                  <span>
                    <strong>Under Maintenance</strong>
                    <small>7 (8%)</small>
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
              {upcoming.map((item) => (
                <div className="fb-upcoming-item" key={item.title}>
                  <img src={item.image} alt={item.title} />

                  <div className="fb-upcoming-info">
                    <strong>{item.title}</strong>
                    <span>
                      <CalendarDays size={13} />
                      {item.date} · {item.time}
                    </span>
                  </div>

                  <span
                    className={`fb-booking-status ${
                      item.status === "Pending" ? "pending" : ""
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
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
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div className="fb-activity-item" key={activity.title}>
                    <div className={`fb-activity-icon ${activity.type}`}>
                      <Icon size={17} />
                    </div>

                    <div className="fb-activity-info">
                      <strong>{activity.title}</strong>
                      <span>
                        {activity.detail} · {activity.time}
                      </span>
                    </div>
                  </div>
                );
              })}
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
    </AppShell>
  );
}
