import { UserDTO } from '@lofhen/types';
import apiClient from 'services/api';

export async function getCurrentUser(): Promise<UserDTO | null> {
  const { data } = await apiClient.get('/users/current-user');

  return data;
}
