import { Bell, CheckCheck } from "lucide-react";

interface NotificationPageHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

export function NotificationPageHeader({
  unreadCount,
  onMarkAllAsRead,
}: NotificationPageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
          <Bell size={16} />
          Communication Center
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#14231c] sm:text-3xl">
          Notifications
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Stay informed about reservation activity, approval decisions,
          and resource maintenance updates.
        </p>
      </div>

      <button
        onClick={onMarkAllAsRead}
        disabled={unreadCount === 0}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CheckCheck size={17} />
        Mark all as read
      </button>
    </div>
  );
}
