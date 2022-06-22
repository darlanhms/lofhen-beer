import { AddressDTO } from '@lofhen/types';
import apiClient from 'services/api';

export default async function getAddresses(): Promise<Array<AddressDTO>> {
  const { data } = await apiClient.get('/addresses');

  return data;
}
