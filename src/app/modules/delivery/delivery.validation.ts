import { z } from 'zod';

// Delivery Create Schema
export const DeliveryCreateZodSchema = z.object({
  deliveryFee: z.number().min(0),
});

// Delivery Updated Schema
export const DeliveryUpdateZodSchema = z.object({
  deliveryFee: z.number().min(0),
});
