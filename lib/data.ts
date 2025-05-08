import { Attendee } from "./types";

// Mock data for the attendees
export const attendees: Attendee[] = [
  {
    id: "att_1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 123-4567",
    registeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    checkedIn: true,
    checkedInAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "att_2",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 987-6543",
    registeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    checkedIn: true,
    checkedInAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "att_3",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "+1 (555) 456-7890",
    registeredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    checkedIn: false,
  },
  {
    id: "att_4",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 789-0123",
    registeredAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    checkedIn: false,
  },
  {
    id: "att_5",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 321-6549",
    registeredAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    checkedIn: false,
  },
];