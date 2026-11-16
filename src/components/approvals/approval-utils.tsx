import type { ReservationStatus } from "@/features/reservations/reservationSlice";

export function formatDate(date: string) {
  if (!date) return "—";

  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(time: string) {
  if (!time) return "—";

  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function getStatusStyle(status: ReservationStatus) {
  if (status === "Approved") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (status === "Rejected") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (status === "Cancelled") {
    return "bg-slate-100 text-slate-600 border-slate-200";
  }

  return "bg-amber-50 text-amber-700 border-amber-200";
}
