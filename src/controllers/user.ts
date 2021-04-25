import { CompletedActivity_state, Prisma } from '@prisma/client';
import { RequestHandler } from 'express';
import { getPurchaseDetails } from '../database/purchase';
import {
  createActivityEvidence,
  getChallengeActivitiesById,
  getUserActivitiesById,
  getUserChallenges,
} from '../database/user';
import { ErrorHandler } from '../helpers/errors';
import { uploadImageToCloudinary } from '../services/cloudinary';
import { mergeActivities } from '../services/user-dashboard';

export const renderUserChallenges: RequestHandler = async (req, res) => {
  const userChallenges = await getUserChallenges(req.loggedUser!.userId);

  res.render('userChallenges', {
    userChallenges,
  });
};

export const renderChallengeDetails: RequestHandler = async (
  req,
  res,
  next
) => {
  const purchaseId = Number(req.params.purchaseId);

  try {
    const purchaseDetails = await getPurchaseDetails(purchaseId);

    if (!purchaseDetails) {
      throw new ErrorHandler(404, 'Takáto objednávka neexistuje');
    }

    if (purchaseDetails?.userId !== req.loggedUser!.userId) {
      throw new ErrorHandler(403, 'Nemáš právo na zobrazenie tejto stránky');
    }

    const challengeActivities = await getChallengeActivitiesById(
      purchaseDetails!.challengeId
    );
    const userCompletedActivities = await getUserActivitiesById(purchaseId);

    const mergedActivities = mergeActivities(
      challengeActivities,
      userCompletedActivities
    );

    res.render('challengeDetails', {
      activities: mergedActivities,
      purchaseDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadActivity: RequestHandler = async (req, res, next) => {
  const result = await uploadImageToCloudinary(req.file);

  try {
    const activityEvidence = await createActivityEvidence({
      date: new Date(),
      evidence: result.secure_url,
      state: CompletedActivity_state.kontrola,
      activityId: Number(req.body.activityId),
      purchaseId: Number(req.body.purchaseId),
      userId: req.loggedUser!.userId,
    });

    res.status(201).json({
      secure_url: result.secure_url,
      activityEvidence: activityEvidence,
    });
  } catch (error) {
    next(error);
  }
};
