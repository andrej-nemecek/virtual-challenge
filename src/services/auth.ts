import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { ACCESS_TOKEN_VALIDITY, UserRoles } from '../helpers/constants';
import { findUserById } from '../database/user';
import { ErrorHandler } from '../helpers/errors';

export function createAccessToken(userId: number, userName: string) {
  const accessToken = jwt.sign(
    { userId, userName },
    process.env.JWT_SECRET as string,
    {
      expiresIn: ACCESS_TOKEN_VALIDITY,
    }
  );

  return accessToken;
}

export async function comparePasswords(
  userPassword: string,
  providedPassword: string
) {
  return await bcrypt.compare(providedPassword, userPassword);
}

export function clearAuthData(res: Response) {
  res.locals.loggedUser = null;
  res.clearCookie('accessToken');
}

export async function checkUserRole(
  userId: number,
  userRole: UserRoles
): Promise<boolean> {
  const findedUser = await findUserById(userId);

  if (!findedUser) throw new ErrorHandler(401, 'Používateľ neexistuje');

  if (findedUser.role === userRole) return true;

  return false;
}
