import type { LucideIcon } from "lucide-react";

export interface RolePermission {
  role: string;
  description: string;
}

export interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  enabled: boolean;
}

export interface NotificationSetting {
  id: string;
  enabled: boolean;
}

export interface SettingsState {
  notificationPreferences: NotificationSetting[];
  workingDays: string[];
  openingTime: string;
  closingTime: string;
  cancellationHours: string;
  approvalRequired: boolean;
  saved: boolean;
}

export interface SettingsOverview {
  enabledNotifications: number;
  totalNotifications: number;
  operatingHours: string;
  workingDays: number;
}

export interface OverviewCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}

export interface SettingsSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}
