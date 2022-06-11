import { UserDTO } from 'models/user';

declare global {
  namespace Express {
    interface Request {
      user?: UserDTO;
    }
  }
}