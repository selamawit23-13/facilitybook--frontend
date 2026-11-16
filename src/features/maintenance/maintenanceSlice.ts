
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type MaintenanceStatus =
  | "Reported"
  | "Scheduled"
  | "In Progress"
  | "Completed";

export interface MaintenanceRecord {
  id: number;
  resource: string;
  category: string;
  location: string;
  issue: string;
  description: string;
  reportedBy: string;
  startDate: string;
  endDate: string;
  status: MaintenanceStatus;
  affectedReservations: number;
}

const initialRecords: MaintenanceRecord[] = [
  {
    id: 1,
    resource: "Meeting Room B",
    category: "Meeting Room",
    location: "Building A · Floor 2",
    issue: "Air conditioning problem",
    description: "The air conditioning system is not cooling the room properly.",
    reportedBy: "Facility Operator",
    startDate: "2026-11-13",
    endDate: "2026-11-14",
    status: "In Progress",
    affectedReservations: 2,
  },
  {
    id: 2,
    resource: "Projector 08",
    category: "Equipment",
    location: "Building B · Floor 1",
    issue: "Display problem",
    description: "The projector display is not working consistently.",
    reportedBy: "IT Department",
    startDate: "2026-11-14",
    endDate: "2026-11-15",
    status: "Reported",
    affectedReservations: 0,
  },
  {
    id: 3,
    resource: "Computer Lab 1",
    category: "Computer Laboratory",
    location: "Building C · Floor 1",
    issue: "Routine inspection",
    description: "Scheduled inspection of computers, network connections, and electrical equipment.",
    reportedBy: "Facility Manager",
    startDate: "2026-11-15",
    endDate: "2026-11-15",
    status: "Scheduled",
    affectedReservations: 1,
  },
  {
    id: 4,
    resource: "Training Hall",
    category: "Training Room",
    location: "Building A · Floor 3",
    issue: "Lighting repair",
    description: "Replacement and inspection of the lighting system.",
    reportedBy: "Facility Operator",
    startDate: "2026-11-10",
    endDate: "2026-11-12",
    status: "Completed",
    affectedReservations: 0,
  },
  {
    id: 5,
    resource: "Conference Room A",
    category: "Conference Room",
    location: "Building B · Floor 2",
    issue: "Furniture inspection",
    description: "Inspection and repair of damaged conference room furniture.",
    reportedBy: "Facility Operator",
    startDate: "2026-11-16",
    endDate: "2026-11-17",
    status: "Scheduled",
    affectedReservations: 0,
  },
];

interface MaintenanceState {
  records: MaintenanceRecord[];
}

const initialState: MaintenanceState = {
  records: initialRecords,
};

const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    addMaintenanceRecord: (
      state,
      action: PayloadAction<MaintenanceRecord>
    ) => {
      state.records.unshift(action.payload);
    },

    updateMaintenanceStatus: (
      state,
      action: PayloadAction<{
        id: number;
        status: MaintenanceStatus;
      }>
    ) => {
      const record = state.records.find(
        (item) => item.id === action.payload.id
      );

      if (record) {
        record.status = action.payload.status;
      }
    },

    updateMaintenanceRecord: (
      state,
      action: PayloadAction<MaintenanceRecord>
    ) => {
      const index = state.records.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },

    deleteMaintenanceRecord: (
      state,
      action: PayloadAction<number>
    ) => {
      state.records = state.records.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addMaintenanceRecord,
  updateMaintenanceStatus,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;
