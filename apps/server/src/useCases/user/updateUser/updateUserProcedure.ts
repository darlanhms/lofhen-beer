import { updateUserSchema } from '@lofhen/contracts';
import { container } from 'tsyringe';
import { adminProcedure } from '@infra/trpc/procedures';
import UpdateUser from './updateUser';

const updateUserProcedure = adminProcedure.input(updateUserSchema).mutation(async ({ input }) => {
  const updateUser = container.resolve(UpdateUser);

  await updateUser.execute(input);
});

export default updateUserProcedure;
