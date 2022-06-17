import { CityDTO } from '@lofhen/types';
import apiClient from 'services/api';

export type CreateCityRequest = Pick<CityDTO, 'name' | 'stateId'>;

export default async function createCity(city: CreateCityRequest): Promise<CityDTO> {
  const { data } = await apiClient.post('/cities', city);

  return data;
}
