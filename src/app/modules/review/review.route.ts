import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validationRequest';
import { Role } from '../user/user.interfaces';
import { ReviewController } from './review.controller';
import { ReviewCreateZodSchema } from './review.validation';
const router = Router();

router.post(
  '/create-review',
  checkAuth(Role.ADMIN),
  multerUpload.single('file'),
  validateRequest(ReviewCreateZodSchema),
  ReviewController.createReview,
);

router.get('/all-review', ReviewController.getAllReview);
router.delete('/:id', checkAuth(Role.ADMIN), ReviewController.deleteReview);

export const ReviewRoutes = router;
