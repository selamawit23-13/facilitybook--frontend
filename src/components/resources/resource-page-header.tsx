import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResourcePageHeader({
  onAdd,
}: {
  onAdd: () => void;
}) {
  return (
    <section className="fb-page-heading">
      <div>
        <div className="fb-eyebrow">FACILITYBOOK MANAGEMENT</div>
        <h1>Resource Management</h1>
        <p>
          Register, organize and monitor the facilities and equipment available for reservation.
        </p>
      </div>

      <Button
        type="button"
        onClick={onAdd}
        className="bg-emerald-700 text-white hover:bg-emerald-800"
      >
        <Plus size={17} />
        Add Resource
      </Button>
    </section>
  );
}
