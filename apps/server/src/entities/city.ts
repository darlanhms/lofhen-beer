import { IsNotEmpty } from 'class-validator';
import Entity from '@core/Entity';
import StateEntity from './state';

interface CityProps {
  name: string;
  stateId: string;
  state?: StateEntity;
}

type UpdatableProps = Pick<CityProps, 'name'>;

export default class CityEntity extends Entity<CityProps> {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Estado é obrigatório' })
  stateId: string;

  state: StateEntity;

  update(props: Partial<UpdatableProps>): void {
    if (props.name) {
      this.name = props.name;
    }
  }
}
