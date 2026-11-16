import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

type ModulePageProps = {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  metrics: { label: string; value: string; note: string }[];
  columns: string[];
  rows: string[][];
};

export function ModulePage({
  title,
  description,
  actionLabel,
  actionHref,
  metrics,
  columns,
  rows,
}: ModulePageProps) {
  return (
    <AppShell>
      <div className="fb-page-heading">
        <div>
          <div className="fb-eyebrow">FACILITYBOOK MANAGEMENT</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <Link href={actionHref} className="fb-primary-button">
          <Plus size={17} /> {actionLabel}
        </Link>
      </div>

      <section className="fb-stat-grid fb-module-stats">
        {metrics.map((metric) => (
          <article className="fb-stat-card" key={metric.label}>
            <div className="fb-stat-top">{metric.label}</div>
            <div className="fb-stat-value">{metric.value}</div>
            <div className="fb-stat-change">{metric.note}</div>
          </article>
        ))}
      </section>

      <section className="fb-panel fb-module-panel">
        <div className="fb-panel-heading">
          <div>
            <h2>{title} overview</h2>
            <p>Sample records for demonstration</p>
          </div>
          <span className="fb-period-label">{rows.length} records</span>
        </div>

        <div className="fb-table-wrap">
          <table className="fb-table fb-module-table">
            <thead>
              <tr>
                {columns.map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${title}-${index}`}>
                  {row.map((value, cellIndex) => {
                    const normalized = value.toLowerCase();
                    const status = [
                      "approved", "available", "active", "completed",
                      "pending", "under maintenance", "in progress",
                      "rejected", "unavailable", "cancelled", "read", "unread"
                    ].includes(normalized);

                    let statusColor = "blue";
                    if (["approved", "available", "active", "completed", "read"].includes(normalized)) statusColor = "green";
                    if (["pending", "under maintenance", "in progress", "unread"].includes(normalized)) statusColor = "amber";
                    if (["rejected", "unavailable", "cancelled"].includes(normalized)) statusColor = "red";

                    return (
                      <td key={cellIndex}>
                        {status
                          ? <span className={`fb-status ${statusColor}`}>{value}</span>
                          : <strong>{value}</strong>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <footer className="fb-footer">FacilityBook <span>•</span> Demonstration data</footer>
    </AppShell>
  );
}
