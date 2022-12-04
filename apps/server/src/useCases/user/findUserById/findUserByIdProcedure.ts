import { container } from 'tsyringe';
import { z } from 'zod';
import { adminProcedure } from '@infra/trpc/procedures';
import UserMapper from '@mappers/userMapper';
import FindUserById from './findUserById';

const findUserByIdProcedure = adminProcedure.input(z.string()).query(async ({ input }) => {
  const findUserById = container.resolve(FindUserById);

  const user = await findUserById.execute(input);

  return UserMapper.toDTOOrNull(user);
});

export default findUserByIdProcedure;
