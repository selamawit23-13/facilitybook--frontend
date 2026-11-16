import {
  ArrowUpRight,
  Check,
  Clock,
  Inbox,
} from "lucide-react";
import type { NotificationItem } from "@/features/notifications/notificationSlice";
import { notificationTypeStyles } from "./notification-utils";

interface NotificationListProps {
  notifications: NotificationItem[];
  totalCount: number;
  onView: (item: NotificationItem) => void;
  onMarkRead: (id: number) => void;
  onClearFilters: () => void;
}

export function NotificationList({
  notifications,
  totalCount,
  onView,
  onMarkRead,
  onClearFilters,
}: NotificationListProps) {
  return (
    <div>
      <div>
        {notifications.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {notifications.map((item) => {
              const style = notificationTypeStyles[item.type];
              const TypeIcon = style.icon;

              return (
                <div
                  key={item.id}
                  className={`group flex gap-3 px-4 py-5 transition hover:bg-slate-50 sm:gap-4 sm:px-5 ${
                    !item.read ? "bg-emerald-50/30" : "bg-white"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.background} ${style.color}`}
                  >
                    <TypeIcon size={20} />
                  </div>

                  <button
                    onClick={() => onView(item)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-[#17251e]">
                        {item.title}
                      </span>

                      {!item.read && (
                        <span className="h-2 w-2 rounded-full bg-emerald-600" />
                      )}

                      <span
                        className={`rounded-md px-2 py-1 text-[10px] font-semibold ${style.background} ${style.color}`}
                      >
                        {item.type}
                      </span>
                    </div>

                    <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-500">
                      {item.message}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={13} />
                        {item.date} · {item.time}
                      </span>
                      <span>{item.recipient}</span>
                    </div>
                  </button>

                  <div className="flex shrink-0 flex-col items-end justify-between gap-2">
                    <button
                      onClick={() => onView(item)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700"
                      aria-label="View notification details"
                      title="View details"
                    >
                      <ArrowUpRight size={18} />
                    </button>

                    {!item.read && (
                      <button
                        onClick={() => onMarkRead(item.id)}
                        className="whitespace-nowrap rounded-lg px-2 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
                      >
                        <span className="inline-flex items-center gap-1">
                          <Check size={13} />
                          Mark read
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Inbox size={26} />
            </div>

            <h3 className="font-semibold text-slate-800">
              No notifications found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Try changing your filter or search term to find other
              notifications.
            </p>

            <button
              onClick={onClearFilters}
              className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-3 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-500">
          Showing {notifications.length} of {totalCount} notifications
        </p>
        <p className="text-xs text-slate-400">
          Demonstration data · Backend integration pending
        </p>
      </div>
    </div>
  );
}


