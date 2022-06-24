import { filledArray } from '@lofhen/utils';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';
import NotFoundError from '@core/errors/notFoundError';
import ValidationError from '@core/errors/validationError';
import UseCase from '@core/UseCase';
import IAddressRepository from '@repositories/IAddressRepository';

interface UpdateAddressRequest {
  id: string;
  alias?: string;
  link?: string | null;
  neighborhood?: string | null;
  street?: string | null;
  number?: string | null;
  reference?: string | null;
  complement?: string | null;
  enabled?: boolean;
}

@injectable()
export default class UpdateAddress implements UseCase<UpdateAddressRequest, void> {
  constructor(
    @inject('AddressRepository')
    private addressRepo: IAddressRepository,
  ) {}

  async execute(request: UpdateAddressRequest): Promise<void> {
    const address = await this.addressRepo.findById(request.id);

    if (!address) {
      throw new NotFoundError('Endereço para editar não encontrado.');
    }

    address.update(request);

    const errors = await validate(address);

    if (filledArray(errors)) {
      throw new ValidationError(errors);
    }

    await this.addressRepo.save(address);
  }
}
