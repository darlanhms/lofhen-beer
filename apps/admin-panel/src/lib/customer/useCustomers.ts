import { useQuery, UseQueryResult } from 'react-query';
import { CustomerDTO } from '@lofhen/types';
import getCustomers from './getCustomers';

export default function useCustomers(): UseQueryResult<CustomerDTO[], unknown> {
  return useQuery(['getCustomers'], async () => {
    return getCustomers();
  });
}
