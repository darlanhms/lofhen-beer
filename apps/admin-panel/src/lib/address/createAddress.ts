import { AddressDTO } from '@lofhen/types';
import apiClient from 'services/api';

export interface CreateAddressRequest {
  alias: string;
  customerId: string | null;
  link: string | null;
  cityId: string;
  neighborhood: string | null;
  street: string | null;
  number: string | null;
  reference: string | null;
  complement: string | null;
}

export default async function createAddress(addressData: CreateAddressRequest): Promise<AddressDTO> {
  const { data } = await apiClient.post('/addresses', addressData);

  return data;
}
