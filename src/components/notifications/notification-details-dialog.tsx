import { Bell, X } from "lucide-react";
import type { NotificationItem } from "@/features/notifications/notificationSlice";
import { notificationTypeStyles } from "./notification-utils";

interface NotificationDetailsDialogProps {
  notification: NotificationItem | null;
  onClose: () => void;
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-700">{value}</p>
    </div>
  );
}

export function NotificationDetailsDialog({
  notification,
  onClose,
}: NotificationDetailsDialogProps) {
  if (!notification) return null;

  const style = notificationTypeStyles[notification.type];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-dialog-title"
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-emerald-700" />
            <h2 className="font-bold text-[#17251e]">
              Notification details
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close dialog"
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <span
              className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${style.background} ${style.color}`}
            >
              {notification.type}
            </span>

            <h3
              id="notification-dialog-title"
              className="mt-3 text-xl font-bold text-[#17251e]"
            >
              {notification.title}
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              {notification.message}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
            <DetailItem
              label="Related resource"
              value={notification.resource}
            />
            <DetailItem
              label="Recipient"
              value={notification.recipient}
            />
            <DetailItem label="Date" value={notification.date} />
            <DetailItem label="Time" value={notification.time} />
            <DetailItem
              label="Read status"
              value={notification.read ? "Read" : "Unread"}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-xl bg-[#123d2b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#195239]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
