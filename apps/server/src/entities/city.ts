import Entity from '@core/Entity';
import { IsNotEmpty } from 'class-validator';
import StateEntity from './state';

interface CityProps {
  name: string;
  stateId: string;
  state: StateEntity;
}

export default class CityEntity extends Entity<CityProps> {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Estado é obrigatório' })
  stateId: string;

  state: StateEntity;
}
