import { z } from 'zod';

// =====================
// CREATE ORDER SCHEMA
// =====================
export const OrderCreateZodSchema = z.object({
  trackingId: z.string().optional(),

  // Billing
  customerName: z.string().min(1, 'Customer name is required'),
  customerAddress: z.string().min(1, 'Customer address is required'),
  customerPhone: z.string().min(6, 'Phone number is too short'),

  // Location
  thana: z.string().optional(),
  district: z.string().optional(),

  note: z.string().optional(),

  // ======================
  // Single Product Fields
  // ======================
  productName: z.string().min(1, 'Product name is required'),
  singleProductPrice: z.number().min(1, 'Product price must be > 0'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),

  // Pricing
  deliveryCharge: z.number().min(0, 'Delivery charge cannot be negative'),
  subtotal: z.number().min(0, 'Subtotal cannot be negative'),
  totalAmount: z.number().min(0, 'Total amount cannot be negative'),

  // Payment
  paymentMethod: z.enum(['cash_on_delivery']).optional(),

  // Status
  status: z.enum(['Pending', 'Approved', 'Delivered', 'Cancelled']).optional(),
});

// =====================
// UPDATE ORDER SCHEMA
// =====================
export const OrderUpdateZodSchema = z.object({
  customerName: z.string().optional(),
  customerAddress: z.string().optional(),
  customerPhone: z.string().optional(),

  thana: z.string().optional(),
  district: z.string().optional(),
  note: z.string().optional(),

  // Single Product Fields
  productName: z.string().optional(),
  singleProductPrice: z.number().optional(),
  quantity: z.number().optional(),

  // Pricing
  deliveryCharge: z.number().optional(),
  subtotal: z.number().optional(),
  totalAmount: z.number().optional(),

  paymentMethod: z.enum(['cash_on_delivery']).optional(),

  status: z.enum(['Pending', 'Approved', 'Delivered', 'Cancelled']).optional(),
});
