import { Role } from '../utils/enums';

export interface UserDTO {
  id: string;
  name: string;
  username: string;
  role: Role;
  createdAt: Date;
}
