import { findChallengeById } from '../database/challenge';
import { createUserOnChallengeRegistration } from '../database/purchase';
import { findUserById } from '../database/user';
import { sendPaymentEmail } from './send-email';

function computeDeadline(numberOfDays: number) {
  let deadline = new Date();
  deadline.setDate(deadline.getDate() + numberOfDays);
  return deadline;
}

export async function registerUserOnChallenge(
  userId: number,
  challengeId: number
) {
  const challengeDetails = await findChallengeById(challengeId);
  if (!challengeDetails) throw new Error('Takáto výzva neexistuje');

  const finalPrice = challengeDetails.price;
  const deadline = computeDeadline(challengeDetails.timePeriod);

  const createdPurchase = await createUserOnChallengeRegistration({
    userId,
    challengeId,
    deadline,
    finalPrice,
  });

  const findedUser = await findUserById(userId);

  sendPaymentEmail({
    email: findedUser!.email,
    id: createdPurchase.id,
    challengeName: createdPurchase.challenge.name,
    challengeDeadline: createdPurchase.deadline,
    challengeTimePeriod: createdPurchase.challenge.timePeriod,
    price: createdPurchase.finalPrice,
    userName: findedUser!.name,
  });

  return createdPurchase;
}
