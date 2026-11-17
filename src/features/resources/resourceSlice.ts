
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ResourceStatus =
  | "Available"
  | "Unavailable"
  | "Under Maintenance";

export interface Resource {
  id: number;
  name: string;
  description: string;
  category: string;
  building: string;
  floor: string;
  location: string;
  capacity: number;
  features: string;
  operatingHours: string;
  availableDays: string[];
  status: ResourceStatus;
}

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const initialResources: Resource[] = [
  {
    id: 1,
    name: "Conference Room A",
    description: "Main executive conference room",
    category: "Meeting Room",
    building: "Main Building",
    floor: "Floor 2",
    location: "East Wing",
    capacity: 20,
    features: "Projector, Wi-Fi, Video Conference",
    operatingHours: "08:00 - 18:00",
    availableDays: [...weekdays],
    status: "Available",
  },
  {
    id: 2,
    name: "Computer Laboratory 2",
    description: "Computer training and practical laboratory",
    category: "Computer Lab",
    building: "Block B",
    floor: "Floor 1",
    location: "North Wing",
    capacity: 35,
    features: "Computers, Projector, Wi-Fi",
    operatingHours: "08:00 - 17:00",
    availableDays: [...weekdays],
    status: "Available",
  },
  {
    id: 3,
    name: "Training Hall",
    description: "Large hall for staff training and workshops",
    category: "Training Hall",
    building: "Main Building",
    floor: "Ground Floor",
    location: "Central Wing",
    capacity: 100,
    features: "Sound System, Projector, Microphones",
    operatingHours: "07:00 - 20:00",
    availableDays: [...weekdays],
    status: "Available",
  },
  {
    id: 4,
    name: "Meeting Room B",
    description: "Small department meeting space",
    category: "Meeting Room",
    building: "Block C",
    floor: "Floor 3",
    location: "West Wing",
    capacity: 12,
    features: "Display Screen, Wi-Fi",
    operatingHours: "08:00 - 17:00",
    availableDays: [...weekdays],
    status: "Under Maintenance",
  },
  {
    id: 5,
    name: "Projector 04",
    description: "Portable presentation equipment",
    category: "Equipment",
    building: "Block A",
    floor: "Floor 1",
    location: "Equipment Store",
    capacity: 1,
    features: "HDMI, Wireless Connection",
    operatingHours: "08:00 - 17:00",
    availableDays: [...weekdays],
    status: "Unavailable",
  },
];

const resourceSlice = createSlice({
  name: "resources",
  initialState: {
    items: initialResources,
  },
  reducers: {
    addResource: (state, action: PayloadAction<Resource>) => {
      state.items.unshift(action.payload);
    },

    updateResource: (state, action: PayloadAction<Resource>) => {
      const index = state.items.findIndex(
        (resource) => resource.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    deleteResource: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (resource) => resource.id !== action.payload
      );
    },
  },
});

export const {
  addResource,
  updateResource,
  deleteResource,
} = resourceSlice.actions;

export default resourceSlice.reducer;
