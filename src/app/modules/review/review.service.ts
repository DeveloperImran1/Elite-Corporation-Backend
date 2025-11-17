/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errorHelpers/AppError';
import { Role } from '../user/user.interfaces';
import { IReview } from './review.interface';
import { Review } from './review.model';

const createReview = async (payload: Partial<IReview>) => {
  const order = await Review.create(payload);
  return order;
};

const getAllReview = async () => {
  const review = await Review.find();
  return review;
  //   const queryBuilder = new QueryBuilder(Order.find(), query);

  //   const orders = await queryBuilder
  //     .search(OrderSearchableFields)
  //     .filter()
  //     .sort()
  //     .fields()
  //     .paginate();

  //   const [data, meta] = await Promise.all([
  //     orders.build(),
  //     queryBuilder.getMeta(),
  //   ]);
  //   return {
  //     meta,
  //     data,
  //   };
};

const deleteReview = async (reviewId: string, verifiedToken: JwtPayload) => {
  // ami admin na hole error diba
  if (verifiedToken.role !== Role.ADMIN) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized');
  }

  const deletedReview = await Review.findByIdAndDelete(reviewId);

  return deletedReview;
};
export const ReviewService = {
  createReview,
  getAllReview,
  deleteReview,
};
