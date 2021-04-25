import { ErrorRequestHandler } from 'express';
import { ErrorHandler, ValidationError } from '../helpers/errors';

export const hanndleErrors: ErrorRequestHandler = function (
  error,
  req,
  res,
  next
) {
  if (error instanceof ErrorHandler) {
    console.error(
      `ERROR HANDLER: ${error.statusCode} - ${error.statusMessage}`
    );
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      statusMessages: [error.statusMessage],
    });
  } else if (error instanceof ValidationError) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      statusMessages: error.statusMessages,
    });
  } else {
    console.error(error);
    return res.render('error500');
  }
};
