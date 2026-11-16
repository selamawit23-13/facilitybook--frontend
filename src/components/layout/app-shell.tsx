
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Wrench,
  Bell,
  ChartNoAxesCombined,
  Users,
  Settings,
  Menu,
  X,
  Search,
  LogOut,
  ChevronRight,
  Mail,
  Sparkles,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    label: "Facilities & Resources",
    href: "/resources",
    icon: Building2,
    expandable: true,
  },
  { label: "Reservations", href: "/reservations", icon: CalendarDays },
  { label: "Approvals", href: "/approvals", icon: ClipboardCheck },
  { label: "Maintenance", href: "/maintenance", icon: Wrench },
  { label: "Users", href: "/users", icon: Users },
  { label: "Reports", href: "/reports", icon: ChartNoAxesCombined },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Close the mobile sidebar whenever the user changes pages.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  }

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="fb-shell fb-green-theme">
      {/* Mobile navigation overlay */}
      {mobileOpen && (
        <button
          type="button"
          className="fb-mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fb-sidebar ${mobileOpen ? "fb-sidebar-open" : ""}`}
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div className="fb-brand">
          <div className="fb-brand-icon">
            <Building2 size={29} strokeWidth={2.3} />
          </div>

          <span className="fb-brand-name">FacilityBook</span>

          <button
            type="button"
            className="fb-close-menu"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation label */}
        <div className="fb-nav-label">MENU</div>

        {/* Main navigation */}
        <nav className="fb-navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`fb-nav-link ${
                  active ? "fb-nav-active" : ""
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={21} strokeWidth={2.2} />

                <span>{item.label}</span>

                {item.expandable && (
                  <ChevronRight
                    className="fb-nav-chevron"
                    size={17}
                    aria-hidden="true"
                  />
                )}

                {item.label === "Approvals" && (
                  <span className="fb-nav-count">5</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar help card */}
        <div className="fb-sidebar-help">
          <div className="fb-help-icon">
            <Sparkles size={20} />
          </div>

          <strong>Smart Facility Management</strong>

          <span>Book · Manage · Optimize</span>

          <Link href="/reports" className="fb-help-button">
            Explore features
            <ChevronRight size={15} />
          </Link>
        </div>

        {/* Sidebar bottom */}
        <div className="fb-sidebar-bottom">
          <div className="fb-system-navigation">
            <Link
              href="/settings"
              className={`fb-nav-link ${
                isActive("/settings") ? "fb-nav-active" : ""
              }`}
              aria-current={
                isActive("/settings") ? "page" : undefined
              }
              onClick={() => setMobileOpen(false)}
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </div>

          <button
            type="button"
            className="fb-nav-link fb-logout-button"
            onClick={logout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="fb-main">
        {/* Topbar */}
        <header className="fb-topbar">
          <div className="fb-topbar-left">
            <button
              type="button"
              className="fb-menu-button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
            >
              <Menu size={23} />
            </button>

            {/* Search */}
            <label className="fb-search">
              <Search size={21} />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search for resources, rooms, or users..."
                aria-label="Search resources, rooms, or users"
              />

              <kbd>Ctrl + K</kbd>
            </label>
          </div>

          {/* Topbar actions */}
          <div className="fb-topbar-actions">
            <Link
              href="/notifications"
              className="fb-top-action"
              aria-label="Notifications"
            >
              <Bell size={21} />
              <span className="fb-notification-dot">1</span>
            </Link>

            <Link
              href="/notifications"
              className="fb-top-action"
              aria-label="Messages"
            >
              <Mail size={21} />
            </Link>

            <div className="fb-top-divider" />

            {/* User profile */}
            <div className="fb-admin-profile">
              <div className="fb-top-avatar">SH</div>

              <div className="fb-admin-details">
                <strong>Selamawit Hailu</strong>
                <span>ADMIN</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="fb-content">{children}</div>
      </main>
    </div>
  );
}
