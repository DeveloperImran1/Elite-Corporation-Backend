/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errorHelpers/AppError';
import { getTrackingId } from '../../utils/getTrackingId';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { Role } from '../user/user.interfaces';
import { OrderSearchableFields } from './order.constant';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (payload: Partial<IOrder>) => {
  // status set
  payload.status = 'Pending';

  // trackingId set
  payload.trackingId = getTrackingId();

  const order = await Order.create(payload);
  return order;
};

const getAllOrder = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Order.find(), query);

  const orders = await queryBuilder
    .search(OrderSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    orders.build(),
    queryBuilder.getMeta(),
  ]);
  return {
    meta,
    data,
  };
};

const getSingleOrder = async (trackingId: string, decodedToken: JwtPayload) => {
  const order = await Order.findOne({ trackingId: trackingId });

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  if (decodedToken.role !== Role.ADMIN) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are Unauthorized');
  }

  return order;
};

const updateOrder = async (
  trackingId: string,
  payload: Partial<IOrder>,
  decodedToken: JwtPayload,
) => {
  const isExistOrder = await Order.findOne({ trackingId });
  if (!isExistOrder) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }

  // is Admin
  if (decodedToken.role !== Role.ADMIN) {
    throw new AppError(httpStatus.FORBIDDEN, `You are not authorised`);
  }

  const updatedData = await Order.findOneAndUpdate({ trackingId }, payload, {
    new: true,
    runValidators: true,
  });

  return updatedData;
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
};
