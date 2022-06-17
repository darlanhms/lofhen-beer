import { StateDTO } from './state';

export interface CityDTO {
  id: string;
  name: string;
  stateId: string;
  state: StateDTO;
}
