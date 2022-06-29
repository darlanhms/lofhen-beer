import { CustomerDTO } from '@lofhen/types';
import apiClient from 'services/api';

export default async function getCustomerById(id: string): Promise<CustomerDTO | null> {
  const { data } = await apiClient.get(`/customers/${id}`);

  return data;
}
