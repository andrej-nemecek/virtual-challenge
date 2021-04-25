import { Prisma, PrismaClient, Purchase_state } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import {
  DEFAULT_PURCHASE_STATE,
  UNIQUE_CONSTRAINT,
} from '../helpers/constants';
import { ErrorHandler } from '../helpers/errors';

const prisma = new PrismaClient();

export async function createUserOnChallengeRegistration(registrationDetails: {
  userId: number;
  challengeId: number;
  finalPrice: Decimal;
  deadline: Date;
}) {
  const { userId, challengeId, finalPrice, deadline } = registrationDetails;
  try {
    return await prisma.purchase.create({
      include: {
        challenge: true,
      },
      data: {
        deadline,
        state: DEFAULT_PURCHASE_STATE,
        finalPrice,
        challenge: {
          connect: {
            id: challengeId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === UNIQUE_CONSTRAINT
    ) {
      throw new ErrorHandler(
        409,
        'Rovnakú výzvu už máš pod svojim účtom registrovanú'
      );
    } else {
      throw error;
    }
  }
}

export async function getPurchaseDetails(purchaseId: number) {
  return await prisma.purchase.findUnique({
    where: {
      id: purchaseId,
    },
    include: {
      challenge: true,
    },
  });
}

export async function findCompletePurchasesDetails() {
  return await prisma.purchase.findMany({
    include: {
      completedActivities: true,
      user: true,
      challenge: true,
    },
  });
}

export async function findPurchaseCompletedActivities() {
  return await prisma.completedActivity.findMany({});
}

export async function findUserFromPurchase(purchaseId: number) {
  const purchaseWithUser = await prisma.purchase.findUnique({
    where: { id: purchaseId },
    select: {
      user: true,
    },
  });

  return purchaseWithUser?.user;
}

export async function findCompletePurchaseDetails(purchaseId: number) {
  return await prisma.purchase.findUnique({
    where: { id: purchaseId },
    include: {
      completedActivities: {
        include: {
          activity: true,
        },
      },
      challenge: {
        include: {
          activities: true,
        },
      },
      user: true,
    },
  });
}

export async function updatePurchaseState(
  purchaseId: number,
  purchaseState: Purchase_state
) {
  return await prisma.purchase.update({
    where: {
      id: purchaseId,
    },
    data: {
      state: purchaseState,
    },
  });
}
