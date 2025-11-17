import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interfaces';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post('/login', AuthControllers.credentialsLogin);
router.post('/refresh-token', AuthControllers.getNewAccessToken);
router.post('/logout', AuthControllers.logout);

// previours password ke change kore new password set korbo.
router.post(
  '/change-password',
  checkAuth(...Object.values(Role)),
  AuthControllers.changePassword,
);
export const AuthRoutes = router;
