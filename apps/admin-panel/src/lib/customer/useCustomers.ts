import { useQuery, UseQueryResult } from 'react-query';
import { CityDTO } from '@lofhen/types';
import getCustomers from './getCustomers';

export default function useCustomers(): UseQueryResult<CityDTO[], unknown> {
  return useQuery(['getCustomers'], async () => {
    return getCustomers();
  });
}
