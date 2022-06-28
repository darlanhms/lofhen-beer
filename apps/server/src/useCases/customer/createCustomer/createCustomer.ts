import { AddressDTO, CustomerDTO } from '@lofhen/types';
import { filledArray } from '@lofhen/utils';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';
import ValidationError from '@core/errors/validationError';
import UseCase from '@core/UseCase';
import AddressEntity from '@entities/address';
import CustomerEntity from '@entities/customer';
import ICustomerRepository from '@repositories/ICustomerRepository';

interface CreateCustomerRequest
  extends Pick<CustomerDTO, 'name' | 'birthdate' | 'phone' | 'observation' | 'createdBy'> {
  addresses?: Pick<
    AddressDTO,
    'alias' | 'link' | 'cityId' | 'neighborhood' | 'street' | 'number' | 'reference' | 'complement'
  >[];
}

@injectable()
export default class CreateCustomer implements UseCase<CreateCustomerRequest, CustomerEntity> {
  constructor(
    @inject('CustomerRepository')
    private customerRepo: ICustomerRepository,
  ) {}

  async execute(request: CreateCustomerRequest): Promise<CustomerEntity> {
    const customer = new CustomerEntity({
      name: request.name,
      birthdate: request.birthdate,
      phone: request.phone,
      observation: request.observation,
      addresses:
        request.addresses?.map(
          address =>
            new AddressEntity({
              alias: address.alias,
              cityId: address.cityId,
              link: address.link,
              customerId: null,
              complement: address.complement,
              neighborhood: address.neighborhood,
              number: address.number,
              reference: address.reference,
              street: address.street,
            }),
        ) || [],
      createdBy: request.createdBy,
    });

    const errors = await validate(customer);
    if (filledArray(errors)) {
      throw new ValidationError(errors);
    }

    await this.customerRepo.save(customer);

    return customer;
  }
}
