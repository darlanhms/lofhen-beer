import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import CityMapper from '@mappers/cityMapper';
import CreateCity from './createCity';

export default class CreateCityController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const createCity = container.resolve(CreateCity);

    const city = await createCity.execute(req.body);

    return res.json(CityMapper.toDTO(city));
  }
}
