import { Types } from 'mongoose';

export interface IDelivery {
  _id?: Types.ObjectId;
  deliveryFee: number;
  createdAt?: Date;
  updatedAt?: Date;
}
