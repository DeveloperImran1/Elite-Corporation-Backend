import { z } from 'zod';

// Product Item Schema
const productItemZodSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string().min(1),
  quantity: z.number().min(1),
  price: z.number().min(1),
  subtotal: z.number().min(1),
});

// Order Create Schema
export const OrderCreateZodSchema = z.object({
  trackingId: z.string().optional(),

  // Billing
  customerName: z.string().min(1),
  customerAddress: z.string().min(1),
  customerPhone: z.string().min(6),

  // Location
  thana: z.string().optional(),
  district: z.string().optional(),

  note: z.string().optional(),

  // Product List
  products: z.array(productItemZodSchema).min(1),

  // Pricing
  deliveryCharge: z.number().min(0),
  subtotal: z.number().min(0),
  totalAmount: z.number().min(0),

  // Payment
  paymentMethod: z.enum(['cash_on_delivery']).optional(),

  // Status
  status: z.enum(['Pending', 'Approved', 'Delivered', 'Cancelled']).optional(),
});

export const OrderUpdateZodSchema = z.object({
  customerName: z.string().optional(),
  customerAddress: z.string().optional(),
  customerPhone: z.string().optional(),

  thana: z.string().optional(),
  district: z.string().optional(),
  note: z.string().optional(),

  products: z.array(productItemZodSchema).optional(),

  deliveryCharge: z.number().optional(),
  subtotal: z.number().optional(),
  totalAmount: z.number().optional(),

  paymentMethod: z.enum(['cash_on_delivery']).optional(),

  status: z.enum(['Pending', 'Approved', 'Delivered', 'Cancelled']).optional(),
});
