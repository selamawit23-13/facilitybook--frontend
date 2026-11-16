export interface TrendItem {
  label: string;
  value: number;
}

export interface DepartmentItem {
  name: string;
  reservations: number;
}

export interface ResourceUsageItem {
  name: string;
  category: string;
  usage: number;
  bookings: number;
}

export interface PeakTimeItem {
  time: string;
  percentage: number;
  bookings: number;
}

export interface ReportMetric {
  title: string;
  value: string;
  note: string;
}
