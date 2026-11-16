"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  markNotificationRead,
  markAllNotificationsRead,
  type NotificationItem,
} from "@/features/notifications/notificationSlice";

import { NotificationPageHeader } from "@/components/notifications/notification-page-header";
import { NotificationStats } from "@/components/notifications/notification-stats";
import { NotificationFilters } from "@/components/notifications/notification-filters";
import { NotificationList } from "@/components/notifications/notification-list";
import { NotificationInformation } from "@/components/notifications/notification-information";
import { NotificationDetailsDialog } from "@/components/notifications/notification-details-dialog";

export default function NotificationsPage() {
  const dispatch = useAppDispatch();

  // Notification records are now managed by Redux.
  const notifications = useAppSelector(
    (state) => state.notifications.items
  );

  // These states control only the page interface.
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedNotificationId, setSelectedNotificationId] =
    useState<number | null>(null);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const selectedNotification =
    notifications.find((item) => item.id === selectedNotificationId) ?? null;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Unread" && !item.read) ||
        (activeFilter === "Read" && item.read) ||
        item.type === activeFilter;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.message.toLowerCase().includes(searchText) ||
        item.resource.toLowerCase().includes(searchText) ||
        item.recipient.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [notifications, activeFilter, search]);

  function markAsRead(id: number) {
    dispatch(markNotificationRead(id));
  }

  function markAllAsRead() {
    dispatch(markAllNotificationsRead());
  }

  function openNotification(item: NotificationItem) {
    setSelectedNotificationId(item.id);
    markAsRead(item.id);
  }

  function clearFilters() {
    setSearch("");
    setActiveFilter("All");
  }

  return (
    <AppShell>
      <main className="min-h-screen bg-[#f5f8f6] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px] space-y-6">
          <NotificationPageHeader
            unreadCount={unreadCount}
            onMarkAllAsRead={markAllAsRead}
          />

          <NotificationStats notifications={notifications} />

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <NotificationFilters
              search={search}
              activeFilter={activeFilter}
              unreadCount={unreadCount}
              onSearchChange={setSearch}
              onFilterChange={setActiveFilter}
            />

            <NotificationList
              notifications={filteredNotifications}
              totalCount={notifications.length}
              onView={openNotification}
              onMarkRead={markAsRead}
              onClearFilters={clearFilters}
            />
          </section>

          <NotificationInformation />

          <p className="text-center text-xs text-slate-400">
            Demonstration data only. Notification records currently use the
            shared Redux store and are not yet connected to the backend.
          </p>
        </div>

        <NotificationDetailsDialog
          notification={selectedNotification}
          onClose={() => setSelectedNotificationId(null)}
        />
      </main>
    </AppShell>
  );
}
