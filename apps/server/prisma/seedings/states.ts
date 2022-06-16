import { PrismaClient, State } from '@prisma/client';

export const defaultStates: Array<State> = [
  {
    id: 'a514f563-92c3-4203-b90d-fee4e8955419',
    name: 'Santa Catarina',
    abbr: 'SC',
  },
];

const prisma = new PrismaClient();

export async function seedStates(): Promise<void> {
  for (const defaultState of defaultStates) {
    await prisma.state.upsert({
      where: { id: defaultState.id },
      create: defaultState,
      update: {},
    });
  }
}
