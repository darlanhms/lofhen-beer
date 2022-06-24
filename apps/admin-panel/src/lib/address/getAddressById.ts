import { AddressDTO } from '@lofhen/types';
import apiClient from 'services/api';

export default async function getAddressById(id: string): Promise<AddressDTO | null> {
  const { data } = await apiClient.get(`/addresses/${id}`);

  return data;
}
