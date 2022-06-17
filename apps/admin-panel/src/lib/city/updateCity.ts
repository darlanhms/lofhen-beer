import { CityDTO } from '@lofhen/types';
import apiClient from 'services/api';

export type UpdateCityRequest = Partial<Pick<CityDTO, 'name' | 'stateId'>> & {
  id: string;
};

export async function updateCity(data: UpdateCityRequest): Promise<void> {
  await apiClient.put(`/cities/${data.id}`, data);
}
