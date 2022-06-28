import CustomerEntity from '@entities/customer';

export default interface ICustomerRepository {
  save(customer: CustomerEntity): Promise<CustomerEntity>;
  findById(id: string): Promise<CustomerEntity | null>;
  findAll(): Promise<CustomerEntity[]>;
}
