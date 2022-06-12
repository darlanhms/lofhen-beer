import { UserDTO } from 'type-utils';

declare global {
  namespace Express {
    interface Request {
      user?: UserDTO;
    }
  }
}
