// Shared application types

export type {
  UserRole,
} from "@/features/users/userSlice";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string>;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SelectOption {
  label: string;
  value: string;
}