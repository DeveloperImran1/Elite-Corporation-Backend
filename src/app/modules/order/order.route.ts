import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validationRequest';
import { Role } from '../user/user.interfaces';
import { OrderController } from './order.controller';
import { OrderCreateZodSchema } from './order.validation';
const router = Router();

router.post(
  '/create-order',
  validateRequest(OrderCreateZodSchema),
  OrderController.createOrder,
);

router.get('/all-order', checkAuth(Role.ADMIN), OrderController.getAllOrder);

router.get('/:id', checkAuth(Role.ADMIN), OrderController.getSingleOrder);

router.patch('/:id', checkAuth(Role.ADMIN), OrderController.updateOrder);

export const OrderRoutes = router;
