interface AuthenticatedUser {
  id: string;
  username: string;
  fullname: string;
  profilePic: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      NODE_ENV: string;
    }
  }
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
