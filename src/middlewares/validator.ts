import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { ValidationError } from '../helpers/errors';

export const checkValidationResult: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => {
      return error.msg;
    });
    next(new ValidationError(400, errorMessages));
  }

  next();
};

export function validateUserRegistration() {
  return [
    body('email', 'E-mail nie je v správnom formáte').isEmail(),
    body('password', 'Vyplň heslo').trim().notEmpty().isString(),
    body('name', 'Vyplň meno a priezvisko').trim().notEmpty().isString(),
    body('adress', 'Vyplň adresu').trim().notEmpty().isString(),
    body('city', 'Vyplň mesto').trim().notEmpty().isString(),
    body('postCode', 'Vyplň PSČ').trim().notEmpty().isString(),
  ];
}

export function validateUserLogin() {
  return [
    body('email', 'E-mail nie je v správnom formáte').isEmail(),
    body('password', 'Vyplň heslo').trim().escape().notEmpty().isString(),
  ];
}
