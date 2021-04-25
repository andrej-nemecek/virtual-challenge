import { Router } from 'express';
import multer from 'multer';

import { blockUnauthenticatedUser } from '../middlewares/auth';
import {
  renderUserChallenges,
  renderChallengeDetails,
  uploadActivity,
} from '../controllers/user';

export const userRouter = Router();

userRouter.get('/vyzvy', blockUnauthenticatedUser, renderUserChallenges);

userRouter.get(
  '/vyzvy/:purchaseId',
  blockUnauthenticatedUser,
  renderChallengeDetails
);

const storage = multer.memoryStorage();
const multerInstance = multer({ storage: storage });
userRouter.put('/aktivity/', multerInstance.single('file'), uploadActivity);
