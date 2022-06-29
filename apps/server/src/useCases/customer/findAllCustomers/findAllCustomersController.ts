import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import CustomerMapper from '@mappers/customerMapper';
import FindAllCustomer from './findAllCustomers';

export default class FindAllCustomersController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllCustomer = container.resolve(FindAllCustomer);

    const customer = await findAllCustomer.execute();

    return res.json(CustomerMapper.toDTOs(customer));
  }
}
