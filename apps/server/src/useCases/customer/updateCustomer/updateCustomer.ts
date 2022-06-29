import { AddressDTO } from '@lofhen/types';
import { filledArray } from '@lofhen/utils';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';
import NotFoundError from '@core/errors/notFoundError';
import ValidationError from '@core/errors/validationError';
import UseCase from '@core/UseCase';
import AddressEntity from '@entities/address';
import ICustomerRepository from '@repositories/ICustomerRepository';

interface UpdateCustomerRequest {
  id: string;
  name?: string;
  birthdate?: Date | null;
  phone?: string | null;
  observation?: string | null;
  enabled?: boolean;
  addresses?: Pick<
    AddressDTO,
    | 'id'
    | 'alias'
    | 'cityId'
    | 'link'
    | 'street'
    | 'neighborhood'
    | 'number'
    | 'complement'
    | 'reference'
    | 'enabled'
  >[];
}

@injectable()
export default class UpdateCustomer implements UseCase<UpdateCustomerRequest, void> {
  constructor(
    @inject('CustomerRepository')
    private customerRepo: ICustomerRepository,
  ) {}

  async execute(request: UpdateCustomerRequest): Promise<void> {
    const customer = await this.customerRepo.findById(request.id);

    if (!customer) {
      throw new NotFoundError('Cliente para atualizar não encontrado');
    }

    customer.update(request);

    request.addresses?.forEach(address => {
      const addressToUpdate = customer.addresses.find(a => a.id === address.id);

      if (!addressToUpdate) {
        const newAddress = new AddressEntity({
          alias: address.alias,
          customerId: request.id,
          link: address.link,
          cityId: address.cityId,
          neighborhood: address.neighborhood,
          street: address.street,
          number: address.number,
          complement: address.complement,
          reference: address.reference,
        });

        customer.addresses.push(newAddress);
      } else {
        addressToUpdate.update(address);
      }
    });

    const errors = await validate(customer);
    if (filledArray(errors)) {
      throw new ValidationError(errors);
    }

    await this.customerRepo.save(customer);
  }
}
