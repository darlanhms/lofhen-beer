import { inject, injectable } from 'tsyringe';
import UseCase from '@core/UseCase';
import CustomerEntity from '@entities/customer';
import ICustomerRepository from '@repositories/ICustomerRepository';

@injectable()
export default class FindCustomerById implements UseCase<string, CustomerEntity | null> {
  constructor(
    @inject('CustomerRepository')
    private customerRepo: ICustomerRepository,
  ) {}

  execute(id: string): Promise<CustomerEntity | null> {
    return this.customerRepo.findById(id);
  }
}
