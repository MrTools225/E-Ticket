export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  availableTickets: number;
  totalTickets: number;
  imageUrl?: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  purchaseDate: string;
  quantity: number;
  totalPrice: number;
  status: 'active' | 'used' | 'cancelled';
  qrCode?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdAt: string;
}