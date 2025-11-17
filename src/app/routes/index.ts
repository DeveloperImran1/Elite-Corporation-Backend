import { Router } from 'express';
import { AuthRoutes } from '../modules/auths/auth.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { StatsRoutes } from '../modules/stats/stats.route';
import { UserRoutes } from '../modules/user/user.route';

export const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/stats',
    route: StatsRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
