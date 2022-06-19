import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import UpdateCity from './updateCity';

export default class UpdateCityController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateCity = container.resolve(UpdateCity);

    await updateCity.execute({ ...req.body, id: req.params.id });

    return res.status(200).send();
  }
}
