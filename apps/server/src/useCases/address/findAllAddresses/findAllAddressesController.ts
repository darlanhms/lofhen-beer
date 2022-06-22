import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import AddressMapper from '@mappers/addressMapper';
import FindAllAddresses from './findAllAddresses';

export default class FindAllAddressesController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllAddress = container.resolve(FindAllAddresses);

    const addresses = await findAllAddress.execute();

    return res.json(AddressMapper.toDTOs(addresses));
  }
}
