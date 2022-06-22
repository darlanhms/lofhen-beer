import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import UpdateAddress from './updateAddress';

export default class UpdateAddressController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateAddress = container.resolve(UpdateAddress);

    await updateAddress.execute({ ...req.body, id: req.params.id });

    return res.status(StatusCodes.OK).send();
  }
}
