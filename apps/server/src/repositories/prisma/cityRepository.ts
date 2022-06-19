import CityEntity from '@entities/city';
import prisma from '@infra/prisma/client';
import CityMapper from '@mappers/cityMapper';
import ICityRepository from '@repositories/ICityRepository';

export default class CityRepository implements ICityRepository {
  async save(city: CityEntity): Promise<CityEntity> {
    const cityToPersist = CityMapper.toPersistence(city);

    const persisted = await prisma.city.upsert({
      where: {
        id: cityToPersist.id,
      },
      create: cityToPersist,
      update: {
        name: cityToPersist.name,
        stateId: cityToPersist.stateId,
      },
      include: {
        state: true,
      },
    });

    return CityMapper.toEntity(persisted);
  }

  async findById(id: string): Promise<CityEntity | null> {
    const city = await prisma.city.findFirst({
      where: {
        id,
      },
      include: {
        state: true,
      },
    });

    return CityMapper.toEntityOrNull(city);
  }

  async findAll(): Promise<CityEntity[]> {
    const cities = await prisma.city.findMany({
      include: {
        state: true,
      },
    });

    return CityMapper.toEntities(cities);
  }
}
