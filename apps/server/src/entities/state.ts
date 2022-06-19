import Entity from '@core/Entity';
import { IsNotEmpty } from 'class-validator';

interface StateProps {
  name: string;
  abbr: string;
}

export default class StateEntity extends Entity<StateProps> {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Abreviação é obrigatória' })
  abbr: string;
}
