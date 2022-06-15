import { UserDTO } from '@lofhen/types';
import apiClient from 'services/api';

export type CreateUserRequest = Omit<UserDTO, 'id' | 'createdAt'>;

export async function createUser(req: CreateUserRequest): Promise<UserDTO> {
  const { data } = await apiClient.post('/users', req);

  return data;
}
