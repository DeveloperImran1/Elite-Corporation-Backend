import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

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

    // Location (Optional)
    thana: { type: String },
    district: { type: String },

    // Note (Optional)
    note: { type: String },

    // -------------------------------
    // Single Product Fields (NEW)
    // -------------------------------
    productName: {
      type: String,
      required: true,
    },

    singleProductPrice: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    // -------------------------------
    // Pricing Summary
    // -------------------------------
    deliveryCharge: {
      type: Number,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // -------------------------------
    // Payment Method
    // -------------------------------
    paymentMethod: {
      type: String,
      enum: ['cash_on_delivery'],
      default: 'cash_on_delivery',
    },

    // -------------------------------
    // Order Status
    // -------------------------------
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

export const Order = model<IOrder>('Order', OrderSchema);
