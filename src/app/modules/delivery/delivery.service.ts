/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errorHelpers/AppError';
import { Role } from '../user/user.interfaces';
import { IDelivery } from './delivery.interface';
import { Delivery } from './delivery.model';

const createDeliveryFee = async (payload: Partial<IDelivery>) => {
  const delivery = await Delivery.create(payload);
  return delivery;
};

const getDeliveryFee = async () => {
  const delivery = await Delivery.find();
  return delivery;
};

const updateDeliveryFee = async (
  deliveryId: string,
  payload: Partial<IDelivery>,
  verifiedToken: JwtPayload,
) => {
  // ami admin na hole error diba
  if (verifiedToken.role !== Role.ADMIN) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized');
  }

  const updatedDeliveryFee = await Delivery.findByIdAndUpdate(
    deliveryId,
    payload,
  );

  return updatedDeliveryFee;
};
export const DeliveryService = {
  createDeliveryFee,
  getDeliveryFee,
  updateDeliveryFee,
};
