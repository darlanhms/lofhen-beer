import CustomerEntity from '@entities/customer';
import prisma from '@infra/prisma/client';
import CustomerMapper from '@mappers/customerMapper';
import ICustomerRepository from '@repositories/ICustomerRepository';

export default class CustomerRepository implements ICustomerRepository {
  async save(customer: CustomerEntity): Promise<CustomerEntity> {
    const customerToPersist = CustomerMapper.toPersistence(customer);

    const persisted = await prisma.customer.upsert({
      where: {
        id: customerToPersist.id,
      },
      create: customerToPersist,
      update: customerToPersist,
    });

    return CustomerMapper.toEntity(persisted);
  }

  async findById(id: string): Promise<CustomerEntity | null> {
    const customer = await prisma.customer.findFirst({
      where: {
        id,
      },
    });

    return CustomerMapper.toEntityOrNull(customer);
  }

  async findAll(): Promise<CustomerEntity[]> {
    const customers = await prisma.customer.findMany();

    return CustomerMapper.toEntities(customers);
  }
}
