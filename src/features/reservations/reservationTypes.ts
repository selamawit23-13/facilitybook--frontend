
import type { FormEvent } from "react";
import type {
  Reservation,
  ReservationStatus,
} from "@/features/reservations/reservationSlice";

export interface ReservationFormData {
  resource: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
}

export interface ResourceOption {
  name: string;
  category: string;
  location: string;
  capacity: number;
}

export type ReservationFilter = ReservationStatus | "All statuses";

export interface ResourceFilters {
  category: string;
  location: string;
  minimumCapacity: string;
}

export interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: ReservationFormData;
  resourceOptions: ResourceOption[];
  reservations: Reservation[];
  today: string;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdate: (field: keyof ReservationFormData, value: string) => void;
}
