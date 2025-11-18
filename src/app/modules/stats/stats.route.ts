import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interfaces';
import { StatsController } from './stats.controller';

const router = Router();

router.get('/order', checkAuth(Role.ADMIN), StatsController.getOrderStats);

export const StatsRoutes = router;
