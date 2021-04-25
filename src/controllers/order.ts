import { RequestHandler } from 'express';
import { findChallengeById } from '../database/challenge';
import { getPurchaseDetails } from '../database/purchase';
import { findUserById } from '../database/user';
import { ErrorHandler } from '../helpers/errors';
import { registerUserOnChallenge } from '../services/process-orders';

export const renderOrder: RequestHandler = async (req, res, next) => {
  try {
    const findedUser = await findUserById(req.loggedUser!.userId);
    if (!findedUser) {
      throw new ErrorHandler(403, 'Takýto používateľ neexistuje');
    }

    const findedChallenge = await findChallengeById(Number(req.params.id));
    if (!findedChallenge) {
      throw new ErrorHandler(404, 'Takáto výzva neexistuje');
    }

    return res.render('order', {
      user: findedUser,
      challenge: findedChallenge,
    });
  } catch (error) {
    return next(error);
  }
};

export const processOrder: RequestHandler = async (req, res, next) => {
  try {
    const challengeId = Number(req.params.id);

    const createdPurchase = await registerUserOnChallenge(
      req.loggedUser!.userId,
      challengeId
    );

    return res
      .status(200)
      .json({ redirect: `/objednavka/platba/${createdPurchase.id}` });
  } catch (error) {
    next(error);
  }
};

export const renderPaymentDetails: RequestHandler = async (req, res, next) => {
  try {
    const purchaseId = Number(req.params.id);
    const purchaseDetails = await getPurchaseDetails(purchaseId);

    if (!purchaseDetails) {
      throw new ErrorHandler(404, 'Takáto objednávka neexistuje');
    }

    if (purchaseDetails.userId !== req.loggedUser!.userId) {
      throw new ErrorHandler(403, 'Nemáš právo na zobrazenie tejto stránky');
    }

    return res.render('purchase', { purchaseDetails });
  } catch (error) {
    return next(error);
  }
};
