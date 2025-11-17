import { Types } from 'mongoose';

export interface IReview {
  _id?: Types.ObjectId;
  customerName: string;
  profilePhoto?: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
