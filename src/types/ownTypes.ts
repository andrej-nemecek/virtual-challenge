import { Decimal } from '@prisma/client/runtime';

// TODO -> fix duplicit type in index.d.ts
export type LoggedUser = { userId: number; userName: string };

export type ChallengeRegistrationDetails = {
  email: string;
  userName: string;
  id: number;
  price: Decimal;
  challengeName: string;
  challengeDeadline: Date;
  challengeTimePeriod: number;
};
