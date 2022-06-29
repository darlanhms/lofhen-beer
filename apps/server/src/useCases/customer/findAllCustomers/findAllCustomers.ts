import { inject, injectable } from 'tsyringe';
import UseCase from '@core/UseCase';
import CustomerEntity from '@entities/customer';
import ICustomerRepository from '@repositories/ICustomerRepository';

@injectable()
export default class FindAllCustomers implements UseCase<undefined, Array<CustomerEntity>> {
  constructor(
    @inject('CustomerRepository')
    private customerRepo: ICustomerRepository,
  ) {}

  execute(): Promise<Array<CustomerEntity>> {
    return this.customerRepo.findAll();
  }
}
