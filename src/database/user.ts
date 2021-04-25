import { CompletedActivity_state, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { ErrorHandler } from '../helpers/errors';
import { UNIQUE_CONSTRAINT } from '../helpers/constants';

const prisma = new PrismaClient();

export async function findAllUsers() {
  return await prisma.user.findMany();
}

export async function findUserById(userId: number) {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
}

export async function findUserByEmail(userEmail: string) {
  return await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });
}

export async function createNewUser(user: Prisma.UserCreateInput) {
  try {
    return await prisma.user.create({ data: user });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === UNIQUE_CONSTRAINT
    ) {
      throw new ErrorHandler(409, 'Používateľ s takýmto e-mailom už existuje');
    } else {
      throw error;
    }
  }
}

export async function getUserChallenges(userId: number) {
  const userWithChallenges = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      purchases: {
        select: {
          id: true,
          deadline: true,
          challenge: {
            include: {
              activities: true,
            },
          },
        },
      },
    },
  });

  return userWithChallenges?.purchases;
}

export async function getChallengeActivitiesById(challengeId: number) {
  return await prisma.activity.findMany({
    where: {
      challengeId,
    },
  });
}

export async function getUserActivitiesById(purchaseId: number) {
  return await prisma.completedActivity.findMany({
    where: {
      purchaseId,
    },
  });
}

export async function createActivityEvidence(activityDetails: {
  date: Date;
  evidence: string;
  state: CompletedActivity_state;
  activityId: number;
  userId: number;
  purchaseId: number;
}) {
  return await prisma.completedActivity.upsert({
    where: {
      unique_activityId_purchaseId: {
        activityId: activityDetails.activityId,
        purchaseId: activityDetails.purchaseId,
      },
    },
    create: activityDetails,
    update: activityDetails,
  });
}

export async function updateActivityState(
  acitivityId: number,
  newState: CompletedActivity_state
) {
  return await prisma.completedActivity.update({
    where: {
      id: acitivityId,
    },
    data: {
      state: newState,
    },
  });
}
