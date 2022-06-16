import { State } from '@prisma/client';
import prisma from 'client';
import BadRequestError from 'errors/badRequestError';

export type CreateStateRequest = Pick<State, 'name' | 'abbr'>;

export async function createState(data: CreateStateRequest): Promise<State> {
  const alreadyRegisteredState = await prisma.state.findFirst({
    where: {
      name: data.name,
    },
  });

  if (alreadyRegisteredState) {
    throw new BadRequestError('Estado com o mesmo nome já cadastrado');
  }

  return prisma.state.create({
    data,
  });
}
