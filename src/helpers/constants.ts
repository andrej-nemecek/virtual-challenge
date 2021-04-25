export const DEFAULT_USER_ROLE = 1;
export const DEFAULT_PURCHASE_STATE = 'Neuhradena';

/* 43200000ms = 12 hours */
export const ACCESS_TOKEN_VALIDITY = 43200000;

/* Prisma error codes */
export const UNIQUE_CONSTRAINT = 'P2002';

export enum UserRoles {
  USER = 1,
  ADMIN = 2,
}
