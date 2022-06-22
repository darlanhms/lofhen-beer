import { AddressDTO } from '@lofhen/types';
import { Address as PrismaAddress, City } from '@prisma/client';
import Mapper from '@core/Mapper';
import AddressEntity from '@entities/address';
import CityMapper from './cityMapper';

interface Address extends PrismaAddress {
  city?: City;
}

class AddressMapperBase extends Mapper<AddressEntity, PrismaAddress, AddressDTO> {
  toEntity(persisted: Address): AddressEntity {
    return new AddressEntity(
      {
        alias: persisted.alias,
        customerId: persisted.customerId,
        link: persisted.link,
        cityId: persisted.cityId,
        neighborhood: persisted.neighborhood,
        street: persisted.street,
        number: persisted.number,
        complement: persisted.complement,
        reference: persisted.reference,
        enabled: persisted.enabled,
        city: CityMapper.toEntityOrUndefined(persisted.city),
      },
      persisted.id,
    );
  }

  toPersistence(entity: AddressEntity): PrismaAddress {
    return {
      id: entity.id,
      alias: entity.alias,
      customerId: entity.customerId,
      cityId: entity.cityId,
      link: entity.link,
      neighborhood: entity.neighborhood,
      street: entity.street,
      number: entity.number,
      complement: entity.complement,
      enabled: entity.enabled,
      reference: entity.reference,
    };
  }

  toDTO(entity: AddressEntity): AddressDTO {
    return {
      id: entity.id,
      alias: entity.alias,
      customerId: entity.customerId,
      cityId: entity.cityId,
      link: entity.link,
      neighborhood: entity.neighborhood,
      street: entity.street,
      number: entity.number,
      complement: entity.complement,
      reference: entity.reference,
      enabled: entity.enabled,
    };
  }
}

const AddressMapper = new AddressMapperBase();

export default AddressMapper;
