import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import UpdateCustomer from './updateCustomer';

export default class UpdateCustomerController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateCustomer = container.resolve(UpdateCustomer);

    await updateCustomer.execute({ ...req.body, id: req.params.id });

    return res.status(StatusCodes.OK).send();
  }
}
