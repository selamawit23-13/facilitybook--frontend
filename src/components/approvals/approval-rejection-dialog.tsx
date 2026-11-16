import type { Reservation } from "@/features/reservations/reservationSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApprovalRejectionDialogProps {
  reservation: Reservation | null;
  reason: string;
  error: string;
  onReasonChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ApprovalRejectionDialog({
  reservation,
  reason,
  error,
  onReasonChange,
  onOpenChange,
  onConfirm,
}: ApprovalRejectionDialogProps) {
  return (
    <Dialog open={!!reservation} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reject Reservation</DialogTitle>
          <DialogDescription>
            Provide a reason so the employee understands why this request
            was rejected.
          </DialogDescription>
        </DialogHeader>

        {reservation && (
          <div className="space-y-4 py-3">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-800">
                {reservation.resource}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {reservation.requestedBy} · {reservation.department}
              </p>
            </div>

            <div>
              <label
                htmlFor="rejection-reason"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Rejection reason <span className="text-red-600">*</span>
              </label>

              <textarea
                id="rejection-reason"
                value={reason}
                onChange={(event) => onReasonChange(event.target.value)}
                rows={4}
                placeholder="Explain why this reservation cannot be approved..."
                className="w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />

              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Confirm Rejection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
