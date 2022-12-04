import { createUserSchema } from '@lofhen/contracts';
import { container } from 'tsyringe';
import { adminProcedure } from '@infra/trpc/procedures';
import UserMapper from '@mappers/userMapper';
import CreateUser from './createUser';

const createUserProcedure = adminProcedure.input(createUserSchema).mutation(async ({ input }) => {
  const createUser = container.resolve(CreateUser);

  const user = await createUser.execute(input);

  return UserMapper.toDTO(user);
});

export default createUserProcedure;
