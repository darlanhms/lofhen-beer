import { City } from '@prisma/client';
import prisma from 'client';

type UpdateCityRequest = Partial<Pick<City, 'name' | 'stateId'>> & {
  id: string;
};

export async function updateCity(data: UpdateCityRequest): Promise<void> {
  await prisma.city.update({
    where: {
      id: data.id,
    },
    data,
  });
}
