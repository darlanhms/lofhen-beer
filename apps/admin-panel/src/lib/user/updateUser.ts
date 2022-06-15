import { UserDTO } from '@lofhen/types';
import apiClient from 'services/api';

export type UpdateUserRequest = Partial<Omit<UserDTO, 'id' | 'createdAt'>> & {
  id: string;
};

export async function updateUser(req: UpdateUserRequest): Promise<UserDTO> {
  const { data } = await apiClient.put(`/users/${req.id}`, req);

  return data;
}
