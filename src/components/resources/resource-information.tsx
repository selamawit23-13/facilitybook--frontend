import { Building2 } from "lucide-react";

export function ResourceInformation() {
  return (
    <section className="fb-panel p-5">
      <div className="mb-4 flex items-center gap-2">
        <Building2 size={19} className="text-emerald-700" />
        <h2 className="font-semibold">Resource Information</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 md:grid-cols-3">
        <div>
          <strong className="text-gray-800">Resource details</strong>
          <p>
            Each resource has a name, category, description and location to help employees identify the right facility or equipment.
          </p>
        </div>

        <div>
          <strong className="text-gray-800">Availability status</strong>
          <p>
            Resources can be available, unavailable or under maintenance. Only available resources should be offered for new reservations.
          </p>
        </div>

        <div>
          <strong className="text-gray-800">Reservation planning</strong>
          <p>
            Capacity, operating hours and resource features help employees choose an appropriate resource for their needs.
          </p>
        </div>
      </div>
    </section>
  );
}
