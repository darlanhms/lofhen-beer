import { CustomerDTO } from '@lofhen/types';
import apiClient from 'services/api';

export default async function getCustomers(): Promise<Array<CustomerDTO>> {
  const { data } = await apiClient.get('/customers');

  return data;
}
