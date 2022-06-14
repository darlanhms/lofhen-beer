import { UserDTO } from '@lofhen/types';
import apiClient from 'services/api';

export async function getUsers(): Promise<Array<UserDTO>> {
  const { data } = await apiClient.get('/users');

  return data;
}
