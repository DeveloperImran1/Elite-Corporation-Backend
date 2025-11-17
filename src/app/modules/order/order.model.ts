import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

// Product Item (Embedded)
const ProductItemSchema = new Schema(
  {
    id: { type: Schema.Types.Mixed, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    subtotal: { type: Number, required: true },
  },
  { _id: false },
);

// Order Schema
const OrderSchema = new Schema<IOrder>(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },

    // Billing Details
    customerName: { type: String, required: true },
    customerAddress: { type: String, required: true },
    customerPhone: { type: String, required: true },

    // Location
    thana: { type: String },
    district: { type: String },

    // Extra notes
    note: { type: String },

    // Products List
    products: {
      type: [ProductItemSchema],
      required: true,
    },

    // Pricing / Calculation
    deliveryCharge: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    totalAmount: { type: Number, required: true },

    // Payment
    paymentMethod: {
      type: String,
      enum: ['cash_on_delivery'],
      default: 'cash_on_delivery',
    },

    // Status
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto-add
  },
);

export const Order = model<IOrder>('Order', OrderSchema);
