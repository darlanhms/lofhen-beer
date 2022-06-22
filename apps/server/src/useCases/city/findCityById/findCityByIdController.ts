import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import CityMapper from '@mappers/cityMapper';
import FindCityById from './findCityById';

export default class FindCityByIdController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const findCityById = container.resolve(FindCityById);

    const city = await findCityById.execute(req.params.id);

    return res.json(CityMapper.toDTOOrNull(city));
  }
}
