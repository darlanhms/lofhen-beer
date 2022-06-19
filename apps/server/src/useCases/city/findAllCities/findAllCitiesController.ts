import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import CityMapper from '@mappers/cityMapper';
import FindAllCities from './findAllCities';

export default class FindAllCitiesController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllCities = container.resolve(FindAllCities);

    const cities = await findAllCities.execute();

    return res.json(CityMapper.toDTOs(cities));
  }
}
