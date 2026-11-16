import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReservationPageHeaderProps {
  onNewReservation: () => void;
}

export function ReservationPageHeader({
  onNewReservation,
}: ReservationPageHeaderProps) {
  return (
    <section className="fb-page-heading">
      <div>
        <div className="fb-eyebrow">
          FACILITYBOOK MANAGEMENT
        </div>
        <h1>Reservation Management</h1>
        <p>
          Create resource reservations, track booking requests
          and manage upcoming schedules.
        </p>
      </div>

      <Button
        type="button"
        onClick={onNewReservation}
        className="bg-emerald-700 text-white hover:bg-emerald-800"
      >
        <Plus size={17} />
        New Reservation
      </Button>
    </section>
  );
}
