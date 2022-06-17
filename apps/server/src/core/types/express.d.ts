import { UserDTO } from '@lofhen/types';

declare global {
  namespace Express {
    interface Request {
      user?: UserDTO;
    }
  }
}
