import { filledArray } from '@lofhen/utils';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';
import ValidationError from '@core/errors/validationError';
import UseCase from '@core/UseCase';
import AddressEntity from '@entities/address';
import IAddressRepository from '@repositories/IAddressRepository';

interface CreateAddressRequest {
  alias: string;
  customerId: string | null;
  link: string | null;
  cityId: string;
  neighborhood: string | null;
  street: string | null;
  number: string | null;
  reference: string | null;
  complement: string | null;
}

@injectable()
export default class CreateAddress implements UseCase<CreateAddressRequest, AddressEntity> {
  constructor(
    @inject('AddressRepository')
    private addressRepo: IAddressRepository,
  ) {}

  async execute(request: CreateAddressRequest): Promise<AddressEntity> {
    const address = new AddressEntity({
      alias: request.alias,
      customerId: request.customerId,
      link: request.link,
      cityId: request.cityId,
      neighborhood: request.neighborhood,
      street: request.street,
      number: request.number,
      complement: request.complement,
      reference: request.reference,
    });

    const errors = await validate(address);
    if (filledArray(errors)) {
      throw new ValidationError(errors);
    }

    const newAddress = await this.addressRepo.save(address);

    return newAddress;
  }
}
