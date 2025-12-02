import { Types } from 'mongoose';

export type OrderStatus = 'Pending' | 'Approved' | 'Delivered' | 'Cancelled';

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

  // Product (Single Product Order)
  productName: string;
  singleProductPrice: number;
  quantity: number;

  // Pricing Summary
  deliveryCharge: number;
  subtotal: number; // quantity * singleProductPrice
  totalAmount: number; // subtotal + deliveryCharge

  // Payment
  paymentMethod?: 'cash_on_delivery';

  // Order Lifecycle
  status: OrderStatus;

  createdAt?: Date;
  updatedAt?: Date;
}
