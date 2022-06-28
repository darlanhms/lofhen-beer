import { CustomerDTO } from '@lofhen/types';
import { Customer } from '@prisma/client';
import Mapper from '@core/Mapper';
import CustomerEntity from '@entities/customer';

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
    };
  }
}

const CustomerMapper = new CustomerMapperBase();

export default CustomerMapper;
