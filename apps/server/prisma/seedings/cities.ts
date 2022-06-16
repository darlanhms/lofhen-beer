import { City, PrismaClient } from '@prisma/client';
import { defaultStates } from './states';

export const defaultCities: Array<City> = [
  {
    id: 'e9e35b15-78c5-4533-836e-698a85071cf0',
    name: 'São João Batista',
    stateId: defaultStates[0].id,
  },
  {
    id: '3749a055-e1b0-4166-ae91-9e995f22c614',
    name: 'Nova Trento',
    stateId: defaultStates[0].id,
  },
  {
    id: '787b2eec-c236-48d0-af37-f36115c528d9',
    name: 'Canelinha',
    stateId: defaultStates[0].id,
  },
  {
    id: 'bb46be99-9eba-46d3-8b65-d712500ee520',
    name: 'Major Gercino',
    stateId: defaultStates[0].id,
  },
  {
    id: '15399e4f-f963-405d-af48-9e95abd1be1c',
    name: 'Brusque',
    stateId: defaultStates[0].id,
  },
  {
    id: '39fb18b8-e7d8-42d4-a444-ca9f4b93ceb9',
    name: 'Tijucas',
    stateId: defaultStates[0].id,
  },
  {
    id: '24c42bd1-297a-4395-8f77-f76ecd6c251e',
    name: 'Itapema',
    stateId: defaultStates[0].id,
  },
  {
    id: '4c17c1b7-be0e-41ba-8989-a938cfba5dec',
    name: 'Bombinhas',
    stateId: defaultStates[0].id,
  },
  {
    id: '59e8d205-87b7-4df6-8367-dfcc1e018d0f',
    name: 'Porto Belo',
    stateId: defaultStates[0].id,
  },
  {
    id: 'd367ef1d-bc61-43bd-b697-293728aa0b2e',
    name: 'Florianópolis',
    stateId: defaultStates[0].id,
  },
];

const prisma = new PrismaClient();

export async function seedCities(): Promise<void> {
  for (const city of defaultCities) {
    await prisma.city.upsert({
      where: { id: city.id },
      create: city,
      update: city,
    });
  }
}
