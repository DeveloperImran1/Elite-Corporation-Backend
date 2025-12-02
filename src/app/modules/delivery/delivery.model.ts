import { model, Schema } from 'mongoose';
import { IDelivery } from './delivery.interface';

const DeliverySchema = new Schema<IDelivery>(
  {
    deliveryFee: { type: Number, required: true },
  },
  {
    timestamps: true, // createdAt, updatedAt auto-add
  },
);

export const Delivery = model<IDelivery>('Delivery', DeliverySchema);
