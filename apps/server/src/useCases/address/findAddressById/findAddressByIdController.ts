import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import AddressMapper from '@mappers/addressMapper';
import FindAddressById from './findAddressById';

export default class FindAddressByIdController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAddressById = container.resolve(FindAddressById);

    const address = await findAddressById.execute(req.params.id);

    return res.json(AddressMapper.toDTOOrNull(address));
  }
}
