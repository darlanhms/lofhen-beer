import { CityDTO } from '@lofhen/types';
import apiClient from 'services/api';

export default async function getCities(): Promise<Array<CityDTO>> {
  const { data } = await apiClient.get('/cities');

  return data;
}
