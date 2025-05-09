export type Attendee = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  registeredAt?: string;
  checkedIn: boolean;
  checkedInAt?: string;
};

export type RegistrationFormData = {
  name: string;
  email: string;
  phone: string;
};