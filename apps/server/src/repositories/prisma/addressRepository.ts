import AddressEntity from '@entities/address';
import prisma from '@infra/prisma/client';
import AddressMapper from '@mappers/addressMapper';
import IAddressRepository from '@repositories/IAddressRepository';

export default class AddressRepository implements IAddressRepository {
  async save(address: AddressEntity): Promise<AddressEntity> {
    const addressToPersist = AddressMapper.toPersistence(address);

    const persisted = await prisma.address.upsert({
      where: {
        id: addressToPersist.id,
      },
      create: addressToPersist,
      update: addressToPersist,
      include: {
        city: true,
      },
    });

    return AddressMapper.toEntity(persisted);
  }

  async findById(id: string): Promise<AddressEntity | null> {
    const address = await prisma.address.findFirst({
      where: {
        id,
      },
      include: {
        city: true,
      },
    });

    return AddressMapper.toEntityOrNull(address);
  }

  async findAll(): Promise<AddressEntity[]> {
    const addresses = await prisma.address.findMany({
      include: {
        city: true,
      },
    });

    return AddressMapper.toEntities(addresses);
  }
}
