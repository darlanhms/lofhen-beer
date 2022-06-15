import { UserDTO } from '@lofhen/types';
import apiClient from 'services/api';

export async function getUserById(id: string): Promise<UserDTO | null> {
  const { data } = await apiClient.get(`/users/${id}`);

  return data;
}
