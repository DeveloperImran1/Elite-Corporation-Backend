import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validationRequest';
import { Role } from '../user/user.interfaces';
import { DeliveryController } from './delivery.controller';
import { DeliveryCreateZodSchema } from './delivery.validation';
const router = Router();

router.post(
  '/create-delivery',
  checkAuth(Role.ADMIN),
  validateRequest(DeliveryCreateZodSchema),
  DeliveryController.createDeliveryFee,
);

router.get('/delivery-fee', DeliveryController.getDeliveryFee);
router.patch(
  '/:id',
  checkAuth(Role.ADMIN),
  DeliveryController.updateDeliveryFee,
);

export const DeliveryRoutes = router;
