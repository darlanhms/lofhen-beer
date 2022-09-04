import { AddressDTO, CustomerDTO } from '@lofhen/types';
import apiClient from 'services/api';

export type CreateCustomerAddressRequest = Pick<
  AddressDTO,
  'alias' | 'link' | 'cityId' | 'neighborhood' | 'street' | 'number' | 'reference' | 'complement'
>;

export interface CreateCustomerRequest
  extends Pick<CustomerDTO, 'name' | 'birthdate' | 'phone' | 'observation' | 'createdBy'> {
  addresses?: CreateCustomerAddressRequest[];
}

export default async function createCustomer(request: CreateCustomerRequest): Promise<CustomerDTO> {
  const { data } = await apiClient.post('/customers', request);

  return data;
}
