
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout as logoutAction } from "@/features/auth/authSlice";

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

type UserRole =
  | "ADMIN"
  | "EMPLOYEE"
  | "FACILITY_MANAGER"
  | "DEPARTMENT_MANAGER"
  | "RESOURCE_OPERATOR";

const navigationByRole: Record<
  UserRole,
  {
    label: string;
    href: string;
    icon: typeof LayoutDashboard;
  }[]
> = {
  ADMIN: [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Facilities & Resources", href: "/resources", icon: Building2 },
    { label: "Reservations", href: "/reservations", icon: CalendarDays },
    { label: "Users", href: "/users", icon: Users },
    { label: "Reports", href: "/reports", icon: ChartNoAxesCombined },
  ],

  EMPLOYEE: [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Facilities & Resources", href: "/resources", icon: Building2 },
    { label: "Reservations", href: "/reservations", icon: CalendarDays },
  ],

  FACILITY_MANAGER: [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Facilities & Resources", href: "/resources", icon: Building2 },
    { label: "Reservations", href: "/reservations", icon: CalendarDays },
    { label: "Approvals", href: "/approvals", icon: ClipboardCheck },
    { label: "Maintenance", href: "/maintenance", icon: Wrench },
    { label: "Reports", href: "/reports", icon: ChartNoAxesCombined },
  ],

  DEPARTMENT_MANAGER: [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Facilities & Resources", href: "/resources", icon: Building2 },
    { label: "Reservations", href: "/reservations", icon: CalendarDays },
    { label: "Approvals", href: "/approvals", icon: ClipboardCheck },
    { label: "Reports", href: "/reports", icon: ChartNoAxesCombined },
  ],

  RESOURCE_OPERATOR: [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Facilities & Resources", href: "/resources", icon: Building2 },
    { label: "Reservations", href: "/reservations", icon: CalendarDays },
    { label: "Maintenance", href: "/maintenance", icon: Wrench },
  ],
};

function normalizeRole(role?: string): UserRole {
  const normalized = role?.replace(/^ROLE_/, "").toUpperCase();

  if (
    normalized === "ADMIN" ||
    normalized === "EMPLOYEE" ||
    normalized === "FACILITY_MANAGER" ||
    normalized === "DEPARTMENT_MANAGER" ||
    normalized === "RESOURCE_OPERATOR"
  ) {
    return normalized;
  }

  return "EMPLOYEE";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  const user = useAppSelector((state) => state.auth.user);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const role = normalizeRole(user?.role);
  const navigation = navigationByRole[role];

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function logout() {
    localStorage.removeItem("facilitybook_token");
    localStorage.removeItem("facilitybook_user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logoutAction());
    router.replace("/login");
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Redirecting to login...
        </p>
      </div>
    );
  }

  return (
    <div className="fb-shell fb-green-theme">
      {mobileOpen && (
        <button
          type="button"
          className="fb-mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fb-sidebar ${mobileOpen ? "fb-sidebar-open" : ""}`}
        aria-label="Main navigation"
      >
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

        <div className="fb-nav-label">MENU</div>

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

                {item.href === "/resources" && (
                  <ChevronRight
                    className="fb-nav-chevron"
                    size={17}
                    aria-hidden="true"
                  />
                )}

                {item.href === "/approvals" && (
                  <span className="fb-nav-count">5</span>
                )}
              </Link>
            );
          })}
        </nav>

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

        <div className="fb-sidebar-bottom">
          <div className="fb-system-navigation">
            {role === "ADMIN" && (
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
            )}
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

      <main className="fb-main">
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

            <div className="fb-admin-profile">
              <div className="fb-top-avatar">
                {user?.fullName
                  ?.split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "U"}
              </div>

              <div className="fb-admin-details">
                <strong>{user?.fullName || "User"}</strong>
                <span>{role.replaceAll("_", " ")}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="fb-content">{children}</div>
      </main>
    </div>
  );
}
