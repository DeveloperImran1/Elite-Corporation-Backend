/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';

import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { ReviewService } from './review.service';

const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = { ...req.body, profilePhoto: req.file?.path };
    const review = await ReviewService.createReview(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review created Successfully',
      data: review,
    });
  },
);

const getAllReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await ReviewService.getAllReview();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review retried Successfully',
      data: review,
    });
  },
);

const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.id;
    const verifiedToken: any = req.user;
    const reviewDelete = await ReviewService.deleteReview(
      reviewId,
      verifiedToken,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review deleted successfully',
      data: reviewDelete,
    });
  },
);

export const ReviewController = {
  createReview,
  getAllReview,
  deleteReview,
};
