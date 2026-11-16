import { ShieldCheck, UserCheck, UserCog, Users } from "lucide-react";
import { UserMetricCard } from "./user-metric-card";

interface UserStatsProps {
  total: number;
  employees: number;
  managers: number;
  administrators: number;
}

export function UserStats({
  total,
  employees,
  managers,
  administrators,
}: UserStatsProps) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <UserMetricCard
        label="Total users"
        value={total}
        note="Registered accounts"
        icon={<Users size={20} />}
      />
      <UserMetricCard
        label="Employees"
        value={employees}
        note="Standard employee access"
        icon={<UserCheck size={20} />}
      />
      <UserMetricCard
        label="Managers & operators"
        value={managers}
        note="Facility and department roles"
        icon={<UserCog size={20} />}
      />
      <UserMetricCard
        label="Administrators"
        value={administrators}
        note="Platform administration"
        icon={<ShieldCheck size={20} />}
      />
    </section>
  );
}
