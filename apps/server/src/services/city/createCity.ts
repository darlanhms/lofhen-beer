import { City } from '@prisma/client';
import prisma from 'client';
import BadRequestError from 'errors/badRequestError';

export type CreateCityRequest = Pick<City, 'name' | 'stateId'>;

export async function createCity(data: CreateCityRequest): Promise<City> {
  const alreadyRegisteredCity = await prisma.city.findFirst({
    where: {
      name: data.name,
    },
  });

  if (alreadyRegisteredCity) {
    throw new BadRequestError('Cidade com o mesmo nome já criada');
  }

  return prisma.city.create({
    data,
  });
}
