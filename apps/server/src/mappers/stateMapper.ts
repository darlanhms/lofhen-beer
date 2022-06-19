import { StateDTO } from '@lofhen/types';
import { State } from '@prisma/client';
import Mapper from '@core/Mapper';
import StateEntity from '@entities/state';

class StateMapperBase extends Mapper<StateEntity, State, StateDTO> {
  toEntity(persisted: State): StateEntity {
    return new StateEntity(
      {
        name: persisted.name,
        abbr: persisted.abbr,
      },
      persisted.id,
    );
  }

  toPersistence(entity: StateEntity): State {
    return {
      id: entity.id,
      name: entity.name,
      abbr: entity.abbr,
    };
  }

  toDTO(entity: StateEntity): StateDTO {
    return {
      id: entity.id,
      name: entity.name,
      abbr: entity.abbr,
    };
  }
}

const StateMapper = new StateMapperBase();

export default StateMapper;
