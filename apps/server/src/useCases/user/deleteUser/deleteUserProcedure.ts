import { container } from 'tsyringe';
import { z } from 'zod';
import { adminProcedure } from '@infra/trpc/procedures';
import DeleteUser from './deleteUser';

const deleteUserProcedure = adminProcedure.input(z.string()).mutation(async ({ input }) => {
  const deleteUser = container.resolve(DeleteUser);

  await deleteUser.execute(input);
});

export default deleteUserProcedure;
