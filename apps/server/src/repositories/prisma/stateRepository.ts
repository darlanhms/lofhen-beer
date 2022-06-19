import StateEntity from '@entities/state';
import prisma from '@infra/prisma/client';
import StateMapper from '@mappers/stateMapper';
import IStateRepository from '@repositories/IStateRepository';

export default class StateRepository implements IStateRepository {
  async findAll(): Promise<StateEntity[]> {
    const states = await prisma.state.findMany({});

    return StateMapper.toEntities(states);
  }
}
