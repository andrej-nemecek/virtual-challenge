import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { LoggedUser } from '../types/ownTypes';
import { clearAuthData } from '../services/auth';

export const blockUnauthenticatedUser: RequestHandler = (req, res, next) => {
  if (!req.loggedUser) {
    return res.redirect(`/prihlasenie?returnTo=${req.baseUrl + req.path}`);
  }

  next();
};

export const authenticateRequest: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  if (!accessToken) {
    res.locals.loggedUser = null;
    return next();
  }

  jwt.verify(
    accessToken,
    process.env.JWT_SECRET as string,
    (error, decodedAuthData) => {
      if (error) {
        clearAuthData(res);
        return next();
      }
      req.loggedUser = decodedAuthData as LoggedUser;
      res.locals.loggedUser = decodedAuthData;
    }
  );

  next();
};
