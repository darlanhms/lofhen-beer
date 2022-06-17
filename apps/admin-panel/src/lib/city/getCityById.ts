import { CityDTO } from '@lofhen/types';
import apiClient from 'services/api';

export async function getCityById(id: string): Promise<CityDTO | null> {
  const { data } = await apiClient.get(`/cities/${id}`);

  return data;
}
