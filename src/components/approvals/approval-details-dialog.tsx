import {
  Building2,
  CalendarDays,
  ClipboardCheck,
  Clock3,
  History,
  UserRound,
} from "lucide-react";

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
import { formatDate, formatTime, getStatusStyle } from "./approval-utils";

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-emerald-700">{icon}</div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}

interface ApprovalDetailsDialogProps {
  reservation: Reservation | null;
  onOpenChange: (open: boolean) => void;
  onApprove: (reservation: Reservation) => void;
  onReject: (reservation: Reservation) => void;
}

export function ApprovalDetailsDialog({
  reservation,
  onOpenChange,
  onApprove,
  onReject,
}: ApprovalDetailsDialogProps) {
  return (
    <Dialog open={!!reservation} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        {reservation && (
          <>
            <DialogHeader>
              <DialogTitle>Reservation Details</DialogTitle>
              <DialogDescription>
                Review the reservation information before making a decision.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-3">
              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Resource
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {reservation.resource}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem
                  icon={<UserRound size={16} />}
                  label="Requested by"
                  value={reservation.requestedBy}
                />
                <DetailItem
                  icon={<Building2 size={16} />}
                  label="Department"
                  value={reservation.department}
                />
                <DetailItem
                  icon={<CalendarDays size={16} />}
                  label="Reservation date"
                  value={formatDate(reservation.date)}
                />
                <DetailItem
                  icon={<Clock3 size={16} />}
                  label="Time"
                  value={`${formatTime(reservation.startTime)} – ${formatTime(reservation.endTime)}`}
                />
                <DetailItem
                  icon={<ClipboardCheck size={16} />}
                  label="Approval required"
                  value={reservation.approvalType || "Facility Manager"}
                />
                <DetailItem
                  icon={<History size={16} />}
                  label="Submitted"
                  value={reservation.submitted || "—"}
                />
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Reservation purpose
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {reservation.purpose}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Current status
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    reservation.status
                  )}`}
                >
                  {reservation.status}
                </span>
              </div>

              {reservation.rejectionReason && (
                <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                  <p className="text-xs font-semibold uppercase text-red-600">
                    Rejection reason
                  </p>
                  <p className="mt-2 text-sm text-red-800">
                    {reservation.rejectionReason}
                  </p>
                </div>
              )}

              {reservation.reviewedBy && (
                <p className="text-xs text-slate-500">
                  Reviewed by: {reservation.reviewedBy}
                </p>
              )}
            </div>

            <DialogFooter>
              {reservation.status === "Pending" && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onReject(reservation)}
                  >
                    Reject
                  </Button>

                  <Button
                    type="button"
                    onClick={() => onApprove(reservation)}
                    className="bg-emerald-700 text-white hover:bg-emerald-800"
                  >
                    Approve
                  </Button>
                </>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
