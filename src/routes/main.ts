import { Router } from 'express';
import multer from 'multer';

import {
  checkValidationResult,
  validateUserRegistration,
  validateUserLogin,
} from '../middlewares/validator';
import {
  renderHomePage,
  registration,
  login,
  renderRegistrationPage,
  renderLoginPage,
  logOut,
  renderGdpr,
  renderTerms,
} from '../controllers/main';

export const mainRouter = Router();

mainRouter.get('/', renderHomePage);

mainRouter.get('/registracia', renderRegistrationPage);

mainRouter.post(
  '/registracia',
  multer().none(),
  validateUserRegistration(),
  checkValidationResult,
  registration
);

mainRouter.get('/prihlasenie', renderLoginPage);

mainRouter.post(
  '/prihlasenie',
  multer().none(),
  validateUserLogin(),
  checkValidationResult,
  login
);

mainRouter.get('/odhlasenie', logOut);

mainRouter.get('/gdpr', renderGdpr);

mainRouter.get('/podmienky', renderTerms);
