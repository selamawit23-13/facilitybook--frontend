"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AppShell } from "@/components/layout/app-shell";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import {
  addUser,
  updateUser,
  toggleUserStatus,
} from "@/features/users/userSlice";

import type {
  FacilityUser,
  UserRole,
} from "@/features/users/userSlice";

import {
  UserPageHeader,
} from "@/components/users/user-page-header";

import {
  UserStats,
} from "@/components/users/user-stats";

import {
  UserAccountSummary,
} from "@/components/users/user-account-summary";

import {
  UserRoleInformation,
} from "@/components/users/user-role-information";

import {
  UserFilters,
} from "@/components/users/user-filters";

import {
  UserTable,
} from "@/components/users/user-table";

import {
  UserFormDialog,
  type UserFormData,
} from "@/components/users/user-form-dialog";

const emptyForm: UserFormData = {
  name: "",
  email: "",
  department: "Administration",
  role: "EMPLOYEE",
};

export default function UsersPage() {
  // Redux state and dispatch
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.items);

  // Local UI state
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [statusFilter, setStatusFilter] = useState("All statuses");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<FacilityUser | null>(null);

  const [form, setForm] = useState<UserFormData>(emptyForm);
  const [formError, setFormError] = useState("");

  // User statistics
  const activeCount = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveCount = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const employeeCount = users.filter(
    (user) => user.role === "EMPLOYEE"
  ).length;

  const managerCount = users.filter((user) =>
    [
      "FACILITY_MANAGER",
      "DEPARTMENT_MANAGER",
      "RESOURCE_OPERATOR",
    ].includes(user.role)
  ).length;

  const adminCount = users.filter(
    (user) => user.role === "ADMIN"
  ).length;

  // Search and filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchTerm = search.toLowerCase();

      const searchMatch =
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.department.toLowerCase().includes(searchTerm);

      const roleMatch =
        roleFilter === "All roles" || user.role === roleFilter;

      const statusMatch =
        statusFilter === "All statuses" ||
        user.status === statusFilter;

      return searchMatch && roleMatch && statusMatch;
    });
  }, [users, search, roleFilter, statusFilter]);

  // Open the add-user dialog
  function openAddDialog() {
    setEditingUser(null);
    setForm({ ...emptyForm });
    setFormError("");
    setDialogOpen(true);
  }

  // Open the edit-user dialog
  function openEditDialog(user: FacilityUser) {
    setEditingUser(user);

    setForm({
      name: user.name,
      email: user.email,
      department: user.department,
      role: user.role,
    });

    setFormError("");
    setDialogOpen(true);
  }

  // Close and reset the dialog
  function closeDialog() {
    setDialogOpen(false);
    setEditingUser(null);
    setFormError("");
  }

  // Update form fields
  function handleFormChange(
    field: keyof UserFormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: field === "role" ? value as UserRole : value,
    }));
  }

  // Validate and save a user through Redux
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim().toLowerCase();

    if (
      !cleanName ||
      !cleanEmail ||
      !form.department ||
      !form.role
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    const duplicateEmail = users.some(
      (user) =>
        user.email.toLowerCase() === cleanEmail &&
        user.id !== editingUser?.id
    );

    if (duplicateEmail) {
      setFormError(
        "A user with this email address already exists."
      );
      return;
    }

    if (editingUser) {
      // Update an existing Redux user
      dispatch(
        updateUser({
          ...editingUser,
          name: cleanName,
          email: cleanEmail,
          department: form.department,
          role: form.role,
        })
      );
    } else {
      // Add a new Redux user
      dispatch(
        addUser({
          name: cleanName,
          email: cleanEmail,
          department: form.department,
          role: form.role,
          status: "Active",
        })
      );
    }

    closeDialog();
  }

  // Activate or deactivate a user through Redux
  function handleToggleStatus(userId: number) {
    dispatch(toggleUserStatus(userId));
  }

  return (
    <AppShell>
      <main className="min-w-0 space-y-6 pb-8">

        {/* Page heading */}
        <UserPageHeader onAdd={openAddDialog} />

        {/* User statistics */}
        <UserStats
          total={users.length}
          employees={employeeCount}
          managers={managerCount}
          administrators={adminCount}
        />

        {/* Active and inactive account summaries */}
        <UserAccountSummary
          active={activeCount}
          inactive={inactiveCount}
        />

        {/* Information about platform roles */}
        <UserRoleInformation />

        {/* Users table and filters */}
        <UserTable
          users={filteredUsers}
          totalUsers={users.length}
          filters={
            <UserFilters
              search={search}
              roleFilter={roleFilter}
              statusFilter={statusFilter}
              onSearchChange={setSearch}
              onRoleChange={setRoleFilter}
              onStatusChange={setStatusFilter}
            />
          }
          onEdit={openEditDialog}
          onToggleStatus={handleToggleStatus}
        />

        {/* Add and edit user dialog */}
        <UserFormDialog
          open={dialogOpen}
          editing={editingUser !== null}
          form={form}
          error={formError}
          onClose={closeDialog}
          onSubmit={handleSubmit}
          onChange={handleFormChange}
        />

      </main>
    </AppShell>
  );
}
