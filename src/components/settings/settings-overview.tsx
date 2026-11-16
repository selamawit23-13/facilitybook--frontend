import {
  ShieldCheck,
  Bell,
  Clock,
  CalendarDays,
} from "lucide-react";

import { OverviewCard } from "./overview-card";

interface SettingsOverviewProps {
  enabledNotifications: number;
  openingTime: string;
  closingTime: string;
  workingDaysCount: number;
}

export function SettingsOverview({
  enabledNotifications,
  openingTime,
  closingTime,
  workingDaysCount,
}: SettingsOverviewProps) {
  return (
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
        value={`${enabledNotifications} / 4`}
        description="Enabled notification types"
      />
      <OverviewCard
        icon={<Clock size={20} />}
        label="Operating hours"
        value={`${openingTime} – ${closingTime}`}
        description="Configured daily schedule"
      />
      <OverviewCard
        icon={<CalendarDays size={20} />}
        label="Working days"
        value={`${workingDaysCount} days`}
        description="Selected weekly schedule"
      />
    </section>
  );
}
