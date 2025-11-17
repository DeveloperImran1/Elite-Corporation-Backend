/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';

import { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { IOrder } from './order.interface';
import { OrderService } from './order.service';

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await OrderService.createOrder(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order created Successfully',
      data: order,
    });
  },
);

const getAllOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await OrderService.getAllOrder(
      req.query as Record<string, string>,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order retried Successfully',
      data: order,
    });
  },
);

const getSingleOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const trackingId = req.params.id;
    const decodedToken = req.user;
    const order = await OrderService.getSingleOrder(trackingId, decodedToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order retried Successfully',
      data: order,
    });
  },
);

const updateOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const trackingId = req.params.id;
    const decodedToken = req.user;

    const payload = req.body;

    const order = await OrderService.updateOrder(
      trackingId as string,
      payload as Partial<IOrder>,
      decodedToken as JwtPayload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order updated Successfully',
      data: order,
    });
  },
);

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
};
