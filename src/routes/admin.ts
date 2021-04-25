import { Router } from 'express';
import multer from 'multer';
import {
  changeActivityState,
  editPurchaseDetails,
  renderDashboard,
  renderPurchaseDetails,
} from '../controllers/admin';
import { blockUnauthenticatedUser } from '../middlewares/auth';

export const adminRouter = Router();

adminRouter.get('/dashboard', blockUnauthenticatedUser, renderDashboard);

adminRouter.get(
  '/purchase/:purchaseId',
  blockUnauthenticatedUser,
  renderPurchaseDetails
);

adminRouter.post(
  '/purchase/:purchaseId',
  multer().none(),
  blockUnauthenticatedUser,
  editPurchaseDetails
);

adminRouter.put(
  '/activity/:activityId',
  multer().none(),
  blockUnauthenticatedUser,
  changeActivityState
);
