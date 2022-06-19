import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import StateMapper from '@mappers/stateMapper';
import FindAllStates from './findAllStates';

export default class FindAllStatesController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllStates = container.resolve(FindAllStates);

    const states = await findAllStates.execute();

    return res.json(StateMapper.toDTOs(states));
  }
}
