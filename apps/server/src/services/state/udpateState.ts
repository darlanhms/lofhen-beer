import { State } from '@prisma/client';
import prisma from 'client';

export type UpdateStateRequest = Partial<Pick<State, 'name' | 'abbr'>> & {
  id: string;
};

export async function updateState(data: UpdateStateRequest): Promise<void> {
  await prisma.state.update({
    where: {
      id: data.id,
    },
    data,
  });
}
