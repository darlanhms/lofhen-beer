import { useQuery, UseQueryResult } from 'react-query';
import { CityDTO } from '@lofhen/types';
import getCities from './getCities';

export default function useCities(): UseQueryResult<CityDTO[], unknown> {
  return useQuery(['getCities'], async () => {
    return getCities();
  });
}
