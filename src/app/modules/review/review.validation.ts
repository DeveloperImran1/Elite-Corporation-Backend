import { z } from 'zod';

// Review Create Schema
export const ReviewCreateZodSchema = z.object({
  customerName: z.string().min(1),

  content: z.string().min(1),
});
