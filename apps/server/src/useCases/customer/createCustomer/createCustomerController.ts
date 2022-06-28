import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import CustomerMapper from '@mappers/customerMapper';
import CreateCustomer from './createCustomer';

export default class CreateCustomerController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const createCustomer = container.resolve(CreateCustomer);

    const customer = await createCustomer.execute({ ...req.body, createdBy: req.user?.id });

    return res.json(CustomerMapper.toDTO(customer));
  }
}
