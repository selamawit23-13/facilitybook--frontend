import {
  Boxes,
  CheckCircle2,
  Wrench,
} from "lucide-react";
import type { ResourceStatsProps } from "@/features/resourceTypes";

export function ResourceStats({
  total,
  available,
  maintenance,
  unavailable,
}: ResourceStatsProps) {
  const cards = [
    {
      label: "Total Resources",
      value: total,
      description: "Registered facilities and equipment",
      icon: <Boxes size={19} />,
    },
    {
      label: "Available",
      value: available,
      description: "Ready for reservation",
      icon: <CheckCircle2 size={19} />,
    },
    {
      label: "Under Maintenance",
      value: maintenance,
      description: "Currently being serviced",
      icon: <Wrench size={19} />,
    },
    {
      label: "Unavailable",
      value: unavailable,
      description: "Not currently bookable",
      icon: <span className="text-lg font-semibold">!</span>,
    },
  ];

  return (
    <section className="fb-stat-grid fb-module-stats">
      {cards.map((card) => (
        <article className="fb-stat-card" key={card.label}>
          <div className="fb-stat-top flex items-center justify-between">
            {card.label}
            {card.icon}
          </div>
          <div className="fb-stat-value">{card.value}</div>
          <div className="fb-stat-change">{card.description}</div>
        </article>
      ))}
    </section>
  );
}
