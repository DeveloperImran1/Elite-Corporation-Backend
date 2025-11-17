import { Types } from 'mongoose';

type OrderStatus = 'Pending' | 'Approved' | 'Delivered' | 'Cancelled';

export interface IOrder {
  _id?: Types.ObjectId;
  trackingId: string;
  // Billing Details
  customerName: string;
  customerAddress: string;
  customerPhone: string;

  // Location
  thana?: string;
  district?: string;

  // Optional note
  note?: string;

  // Pricing / Order Summary
  products: {
    id: string | number;
    name: string;
    quantity: number;
    price: number; // single item price
    subtotal: number;
  }[];

  deliveryCharge: number;
  subtotal: number; // akadhik product er subtotal mila, jeita hoi. Seita main subtotal.
  totalAmount: number;

  // Payment Option
  paymentMethod?: 'cash_on_delivery';
  status: OrderStatus;

  createdAt?: Date;
  updatedAt?: Date;
}
