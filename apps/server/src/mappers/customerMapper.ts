import { CustomerDTO } from '@lofhen/types';
import { Address, Customer as PrismaCustomer } from '@prisma/client';
import Mapper from '@core/Mapper';
import CustomerEntity from '@entities/customer';
import AddressMapper from './addressMapper';

interface Customer extends PrismaCustomer {
  addresses?: Array<Address>;
}

class CustomerMapperBase extends Mapper<CustomerEntity, Customer, CustomerDTO> {
  toEntity(persisted: Customer): CustomerEntity {
    return new CustomerEntity(
      {
        name: persisted.name,
        birthdate: persisted.birthdate,
        phone: persisted.phone,
        observation: persisted.observation,
        createdBy: persisted.createdBy,
        createdAt: persisted.createdAt,
        enabled: persisted.enabled,
        addresses: persisted.addresses?.map(AddressMapper.toEntity) || [],
      },
      persisted.id,
    );
  }

  toPersistence(entity: CustomerEntity): Customer {
    return {
      id: entity.id,
      name: entity.name,
      birthdate: entity.birthdate,
      phone: entity.phone,
      observation: entity.observation,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt,
      enabled: entity.enabled,
      addresses: entity.addresses.map(AddressMapper.toPersistence),
    };
  }

  toDTO(entity: CustomerEntity): CustomerDTO {
    return {
      id: entity.id,
      name: entity.name,
      birthdate: entity.birthdate,
      phone: entity.phone,
      observation: entity.observation,
      createdAt: entity.createdAt,
      createdBy: entity.createdBy,
      enabled: entity.enabled,
      addresses: AddressMapper.toDTOs(entity.addresses),
    };
  }
}

const CustomerMapper = new CustomerMapperBase();

export default CustomerMapper;
