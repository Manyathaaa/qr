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

export const events = [
  {
    id: "1",
    name: "Tech Conference 2025",
    description: "A conference about the latest in tech.",
    date: "2025-03-15",
    location: "Bangalore",
    attendees: [
      { id: "a1", name: "John Doe", checkedIn: true },
      { id: "a2", name: "Jane Smith", checkedIn: false },
    ],
  },
  {
    id: "2",
    name: "Codeathon 2025",
    description: "A competitive event for coders.",
    date: "2025-04-20",
    location: "Mumbai",
    attendees: [
      { id: "b1", name: "Alex Kim", checkedIn: true },
      { id: "b2", name: "Sophia Lee", checkedIn: true },
    ],
  },
  {
    id: "3",
    name: "Startup Expo 2025",
    description: "A showcase of new startups and innovations.",
    date: "2025-05-10",
    location: "Delhi",
    attendees: [
      { id: "c1", name: "Michael Chen", checkedIn: false },
      { id: "c2", name: "Emily Zhang", checkedIn: true },
    ],
  },
];

