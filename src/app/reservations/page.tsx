
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { AppShell } from "@/components/layout/app-shell";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import type { ReservationFilter } from "@/features/reservations/reservationTypes";

import { ReservationPageHeader } from "@/components/reservations/reservation-page-header";
import { ReservationStats } from "@/components/reservations/reservation-stats";
import { ReservationTable } from "@/components/reservations/reservation-table";
import { ReservationGuidelines } from "@/components/reservations/reservation-guidelines";
import { NewReservationDialog } from "@/components/reservations/new-reservation-dialog";

import {
  addReservation,
  cancelReservation,
} from "@/features/reservations/reservationSlice";

const resourceOptions = [
  {
    name: "Conference Room A",
    category: "Meeting Room",
    location: "Main Building · Floor 2",
    capacity: 20,
  },
  {
    name: "Computer Laboratory 2",
    category: "Computer Lab",
    location: "Block B · Floor 1",
    capacity: 35,
  },
  {
    name: "Training Hall",
    category: "Training Hall",
    location: "Main Building · Ground Floor",
    capacity: 100,
  },
  {
    name: "Projector 04",
    category: "Equipment",
    location: "Block A · Equipment Store",
    capacity: 1,
  },
];

const emptyForm = {
  resource: "",
  date: "",
  startTime: "",
  endTime: "",
  purpose: "",
};

function formatDate(date: string) {
  if (!date) return "—";

  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(time: string) {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export default function ReservationsPage() {
  const dispatch = useAppDispatch();

  const reservations = useAppSelector(
    (state) => state.reservations.items
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<ReservationFilter>("All statuses");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    setToday(`${year}-${month}-${day}`);
  }, []);

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        reservation.resource.toLowerCase().includes(searchText) ||
        reservation.requestedBy.toLowerCase().includes(searchText) ||
        reservation.department.toLowerCase().includes(searchText) ||
        reservation.purpose.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All statuses" ||
        reservation.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, search, statusFilter]);

  const pendingCount = reservations.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedCount = reservations.filter(
    (item) => item.status === "Approved"
  ).length;

  const upcomingCount = reservations.filter(
    (item) =>
      item.date >= today &&
      (item.status === "Approved" || item.status === "Pending")
  ).length;

  function updateForm(field: keyof typeof emptyForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  }

  function openNewReservation() {
    setForm(emptyForm);
    setError("");
    setDialogOpen(true);
  }

  function addNewReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (
      !form.resource ||
      !form.date ||
      !form.startTime ||
      !form.endTime ||
      !form.purpose.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!today) {
      setError("Please wait for the date to load and try again.");
      return;
    }

    if (form.date < today) {
      setError("Please select today or a future date.");
      return;
    }

    if (form.endTime <= form.startTime) {
      setError("End time must be later than start time.");
      return;
    }

    const selectedResource = resourceOptions.find(
      (item) => item.name === form.resource
    );

    if (!selectedResource) {
      setError("Please select a valid resource.");
      return;
    }

    const hasConflict = reservations.some((reservation) => {
      if (
        reservation.resource !== form.resource ||
        reservation.date !== form.date ||
        (reservation.status !== "Pending" &&
          reservation.status !== "Approved")
      ) {
        return false;
      }

      return (
        form.startTime < reservation.endTime &&
        form.endTime > reservation.startTime
      );
    });

    if (hasConflict) {
      setError(
        "This resource already has a pending or approved reservation during that time. Please choose another time."
      );
      return;
    }

    dispatch(
      addReservation({
        resource: selectedResource.name,
        category: selectedResource.category,
        location: selectedResource.location,
        requestedBy: "Current Employee",
        department: "My Department",
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        purpose: form.purpose.trim(),
        status: "Pending",
        approvalType: "Facility Manager",
        submitted: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      })
    );

    setForm(emptyForm);
    setDialogOpen(false);
    setError("");
  }

  function handleCancelReservation(id: number) {
    dispatch(cancelReservation(id));
  }

  return (
    <AppShell>
      <div className="fb-enterprise-dashboard">
        <ReservationPageHeader
          onNewReservation={openNewReservation}
        />

        <ReservationStats
          total={reservations.length}
          upcoming={upcomingCount}
          pending={pendingCount}
          approved={approvedCount}
        />

        <ReservationTable
          reservations={filteredReservations}
          search={search}
          statusFilter={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onCancel={handleCancelReservation}
          formatDate={formatDate}
          formatTime={formatTime}
        />

        <ReservationGuidelines />

        <footer className="fb-footer">
          FacilityBook <span>•</span> Reservation Management
          <span>•</span> Demonstration data
        </footer>
      </div>

      <NewReservationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        form={form}
        resourceOptions={resourceOptions}
        reservations={reservations}
        today={today}
        error={error}
        onSubmit={addNewReservation}
        onUpdate={updateForm}
      />
    </AppShell>
  );
}
