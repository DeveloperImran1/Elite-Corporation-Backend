import { model, Schema } from 'mongoose';
import { IReview } from './review.interface';

const ReviewSchema = new Schema<IReview>(
  {
    customerName: { type: String, required: true },
    profilePhoto: { type: String },
    content: { type: String, required: true },
  },
  {
    timestamps: true, // createdAt, updatedAt auto-add
  },
);

export const Review = model<IReview>('Review', ReviewSchema);
