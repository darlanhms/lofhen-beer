import { inject, injectable } from 'tsyringe';
import UseCase from '@core/UseCase';
import StateEntity from '@entities/state';
import IStateRepository from '@repositories/IStateRepository';

@injectable()
export default class FindAllStates implements UseCase<undefined, Array<StateEntity>> {
  constructor(
    @inject('StateRepository')
    private stateRepo: IStateRepository,
  ) {}

  async execute(): Promise<Array<StateEntity>> {
    return this.stateRepo.findAll();
  }
}
