/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';

import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { DeliveryService } from './delivery.service';

const createDeliveryFee = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deliveryFee = await DeliveryService.createDeliveryFee(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Delivery fee created Successfully',
      data: deliveryFee,
    });
  },
);

const getDeliveryFee = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deliveryFee = await DeliveryService.getDeliveryFee();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Delivery fee retried Successfully',
      data: deliveryFee,
    });
  },
);

const updateDeliveryFee = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deliveryId = req.params.id;
    console.log('pyaload', req.body);
    const payload = req.body;
    const verifiedToken: any = req.user;
    const updatedFee = await DeliveryService.updateDeliveryFee(
      deliveryId,
      payload,
      verifiedToken,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Delivery Fee updated successfully',
      data: updatedFee,
    });
  },
);

export const DeliveryController = {
  createDeliveryFee,
  getDeliveryFee,
  updateDeliveryFee,
};
