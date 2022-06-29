import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import CustomerMapper from '@mappers/customerMapper';
import FindCustomerById from './findCustomerById';

export default class FindCustomerByIdController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const findCustomerById = container.resolve(FindCustomerById);

    const customer = await findCustomerById.execute(req.params.id);

    return res.json(CustomerMapper.toDTOOrNull(customer));
  }
}
