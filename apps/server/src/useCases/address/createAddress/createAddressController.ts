import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import AddressMapper from '@mappers/addressMapper';
import CreateAddress from './createAddress';

export default class CreateAddressController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const createAddress = container.resolve(CreateAddress);

    const address = await createAddress.execute(req.body);

    return res.json(AddressMapper.toDTO(address));
  }
}
