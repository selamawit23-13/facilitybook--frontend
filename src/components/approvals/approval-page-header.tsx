"use client";

import { ClipboardCheck, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApprovalPageHeaderProps {
  onReviewPending: () => void;
}

export function ApprovalPageHeader({
  onReviewPending,
}: ApprovalPageHeaderProps) {
  return (
    <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
          <ClipboardCheck size={17} />
          Reservation Management
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Reservation Approvals
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Review reservation requests, make approval decisions, and keep
          track of the reservation approval workflow.
        </p>
      </div>

      <Button
        type="button"
        onClick={onReviewPending}
        className="bg-emerald-700 text-white hover:bg-emerald-800"
      >
        <Clock3 size={16} className="mr-2" />
        Review pending
      </Button>
    </section>
  );
}
