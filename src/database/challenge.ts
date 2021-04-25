import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findChallengeById(challengeId: number) {
  return await prisma.challenge.findFirst({
    where: {
      id: challengeId,
    },
    include: {
      activities: true,
    },
  });
}
