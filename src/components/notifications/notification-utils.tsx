import {
  Bell,
  CalendarCheck,
  ClipboardCheck,
  Info,
  Wrench,
} from "lucide-react";
import type { NotificationType } from "@/features/notifications/notificationSlice";

export const notificationTypeStyles: Record<
  NotificationType,
  { icon: typeof Bell; color: string; background: string }
> = {
  Reservation: {
    icon: CalendarCheck,
    color: "text-emerald-700",
    background: "bg-emerald-50",
  },
  Approval: {
    icon: ClipboardCheck,
    color: "text-blue-700",
    background: "bg-blue-50",
  },
  Maintenance: {
    icon: Wrench,
    color: "text-amber-700",
    background: "bg-amber-50",
  },
  System: {
    icon: Info,
    color: "text-slate-700",
    background: "bg-slate-100",
  },
};
