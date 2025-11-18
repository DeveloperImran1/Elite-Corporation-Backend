/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { StatsServices } from './stat.service';

const getOrderStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await StatsServices.getOrderStats();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order stats retrived successfully',
      data: order,
    });
  },
);

export const StatsController = {
  getOrderStats,
};
