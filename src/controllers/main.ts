import bcrypt from 'bcrypt';

import { RequestHandler } from 'express';
import { createNewUser, findUserByEmail } from '../database/user';
import { DEFAULT_USER_ROLE } from '../helpers/constants';
import {
  comparePasswords,
  createAccessToken,
  clearAuthData,
} from '../services/auth';
import { ErrorHandler } from '../helpers/errors';
import { ACCESS_TOKEN_VALIDITY } from '../helpers/constants';

export const renderHomePage: RequestHandler = (req, res) => {
  res.render('homePage');
};

export const renderRegistrationPage: RequestHandler = (req, res) => {
  res.render('registration');
};

export const registration: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, name, adress, postCode, city } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await createNewUser({
      email,
      password: hashedPassword,
      name,
      role: DEFAULT_USER_ROLE,
      adress,
      postCode,
      city,
    });

    const accessToken = createAccessToken(createdUser.id, createdUser.name);
    res.cookie('accessToken', accessToken, {
      expires: new Date(Date.now() + ACCESS_TOKEN_VALIDITY),
      secure: true,
      httpOnly: true,
    });

    return res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};

export const renderLoginPage: RequestHandler = (req, res) => {
  res.render('login');
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password: providedPassword } = req.body;

    const findedUser = await findUserByEmail(email);
    if (!findedUser) {
      throw new ErrorHandler(403, 'E-mail alebo heslo nie je správne');
    }

    const isPasswordCorrect = await comparePasswords(
      findedUser.password,
      providedPassword
    );
    if (!isPasswordCorrect) {
      throw new ErrorHandler(403, 'E-mail alebo heslo nie je správne');
    }

    const accessToken = createAccessToken(findedUser.id, findedUser.name);
    res.cookie('accessToken', accessToken, {
      expires: new Date(Date.now() + ACCESS_TOKEN_VALIDITY),
      secure: true,
      httpOnly: true,
    });

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

export const logOut: RequestHandler = (req, res) => {
  clearAuthData(res);
  res.redirect('/prihlasenie');
};

export const renderGdpr: RequestHandler = (req, res) => {
  res.render('gdpr');
};

export const renderTerms: RequestHandler = (req, res) => {
  res.render('terms');
};
