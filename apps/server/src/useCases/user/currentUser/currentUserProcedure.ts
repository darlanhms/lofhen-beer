import { container } from 'tsyringe';
import { publicProcedure } from '@infra/trpc/procedures';
import UserMapper from '@mappers/userMapper';
import FindUserById from '../findUserById/findUserById';

const currentUserProcedure = publicProcedure.query(async ({ ctx }) => {
  if (!ctx.user) {
    return null;
  }

  const findUserById = container.resolve(FindUserById);

  const user = await findUserById.execute(ctx.user.id);

  return user ? UserMapper.toDTOOrNull(user) : null;
});

export default currentUserProcedure;
