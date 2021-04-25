import { RequestHandler } from 'express';
import {
  findCompletePurchaseDetails,
  findCompletePurchasesDetails,
  findUserFromPurchase,
  updatePurchaseState,
} from '../database/purchase';
import { updateActivityState } from '../database/user';
import { UserRoles } from '../helpers/constants';
import { ErrorHandler } from '../helpers/errors';
import { checkUserRole } from '../services/auth';

export const renderDashboard: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.loggedUser!.userId;

    const canAccess = await checkUserRole(userId, UserRoles.ADMIN);
    if (!canAccess) {
      throw new ErrorHandler(
        403,
        'Nemáš dostatok práv na zobrazenie tejto stránky'
      );
    }

    const purchasesCompleteDetails = await findCompletePurchasesDetails();

    res.render('admin/dashboard', {
      purchases: purchasesCompleteDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const renderPurchaseDetails: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.loggedUser!.userId;

    const canAccess = await checkUserRole(userId, UserRoles.ADMIN);
    if (!canAccess) {
      throw new ErrorHandler(
        403,
        'Nemáš dostatok práv na zobrazenie tejto stránky'
      );
    }

    const userToCheck = await findUserFromPurchase(
      Number(req.params.purchaseId)
    );
    if (!userToCheck) throw new ErrorHandler(404, 'Používateľ sa nenašiel');

    const purchaseCompleteDetails = await findCompletePurchaseDetails(
      Number(req.params.purchaseId)
    );

    res.render('admin/purchaseDetails', {
      purchaseDetails: purchaseCompleteDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const editPurchaseDetails: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.loggedUser!.userId;
    const purchaseId = Number(req.params.purchaseId);

    const canAccess = await checkUserRole(userId, UserRoles.ADMIN);
    if (!canAccess) {
      throw new ErrorHandler(
        403,
        'Nemáš dostatok práv na zobrazenie tejto stránky'
      );
    }

    await updatePurchaseState(purchaseId, req.body.state);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const changeActivityState: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.loggedUser!.userId;
    const activityId = Number(req.params.activityId);

    const canAccess = await checkUserRole(userId, UserRoles.ADMIN);
    if (!canAccess) {
      throw new ErrorHandler(
        403,
        'Nemáš dostatok práv na zobrazenie tejto stránky'
      );
    }

    await updateActivityState(activityId, req.body.activityState);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
