import { CalendarDays } from "lucide-react";

export function ReservationGuidelines() {
  return (
    <section className="fb-panel p-5">
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays
          size={19}
          className="text-emerald-700"
        />
        <h2 className="font-semibold">
          Reservation Guidelines
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 md:grid-cols-3">
        <div>
          <strong className="text-gray-800">
            Booking requests
          </strong>
          <p>
            Employees select a resource, date, time and purpose
            before submitting a reservation.
          </p>
        </div>

        <div>
          <strong className="text-gray-800">
            Approval workflow
          </strong>
          <p>
            Reservations requiring authorization remain pending
            until the appropriate manager makes a decision.
          </p>
        </div>

        <div>
          <strong className="text-gray-800">
            Resource availability
          </strong>
          <p>
            Booking conflicts and maintenance periods must be
            checked before a reservation is confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
