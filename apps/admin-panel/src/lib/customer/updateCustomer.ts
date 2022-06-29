import { AddressDTO } from '@lofhen/types';
import apiClient from 'services/api';

interface UpdateCustomerRequest {
  id: string;
  name?: string;
  birthdate?: Date | null;
  phone?: string | null;
  observation?: string | null;
  enabled?: boolean;
  addresses?: Pick<
    AddressDTO,
    | 'id'
    | 'alias'
    | 'cityId'
    | 'link'
    | 'street'
    | 'neighborhood'
    | 'number'
    | 'complement'
    | 'reference'
    | 'enabled'
  >[];
}

export default async function updateCustomer(request: UpdateCustomerRequest): Promise<void> {
  await apiClient.put(`/customers/${request.id}`, request);
}
