import { StateDTO } from '@lofhen/types';
import apiClient from 'services/api';

export default async function getStates(): Promise<Array<StateDTO>> {
  const { data } = await apiClient.get('/states');

  return data;
}
