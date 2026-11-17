
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReservationPageHeaderProps {
  onNewReservation: () => void;
}

export function ReservationPageHeader({
  onNewReservation,
}: ReservationPageHeaderProps) {
  return (
    <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
            FacilityBook Management
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Reservation Management
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create resource reservations, track booking requests and manage
          upcoming schedules.
        </p>
      </div>

      <Button
        type="button"
        onClick={onNewReservation}
        className="shrink-0 self-start bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 sm:self-center"
      >
        <Plus size={17} />
        New Reservation
      </Button>
    </section>
  );
}
