import { Router } from 'express';
import {
  renderOrder,
  processOrder,
  renderPaymentDetails,
} from '../controllers/order';
import { blockUnauthenticatedUser } from '../middlewares/auth';

export const orderRouter = Router();

orderRouter.get('/vyzva/:id', blockUnauthenticatedUser, renderOrder);

orderRouter.post('/vyzva/:id', blockUnauthenticatedUser, processOrder);

orderRouter.get('/platba/:id', blockUnauthenticatedUser, renderPaymentDetails);
