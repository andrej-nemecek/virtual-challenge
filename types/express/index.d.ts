declare namespace Express {
  interface Request {
    loggedUser?: {
      userId: number;
      userName: string;
    };
  }
}
