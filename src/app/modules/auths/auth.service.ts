/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';

import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/AppError';
import { createNewAccessTokenWithRefreshToken } from '../../utils/userTokens';
import { IUser } from '../user/user.interfaces';
import { User } from '../user/user.model';

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Invalid Password');
  }

  return isUserExist;
};

// new token generate using refresh token
const getNewAccessToken = async (refreshToken: string) => {
  // refresh token dia new akta token create korar kaj ta utils > userTokens.ts file er moddhe akta function a koreci.
  const accessToken = await createNewAccessTokenWithRefreshToken(refreshToken);
  return {
    accessToken,
  };
};

const changePassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload,
) => {
  const user = await User.findById(decodedToken.userId);

  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    user?.password as string,
  );

  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your old password not matched!');
  }

  // aikhane user null hobena, aita bujhar jonno not null assertion symbol (!) use koreci. ar hash kora password ke user.password er moddhe bose, save() kore diasi.
  user!.password = await bcryptjs.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  user!.save();
};
export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
  changePassword,
};
