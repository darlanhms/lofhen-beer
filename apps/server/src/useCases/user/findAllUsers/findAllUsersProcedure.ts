import { container } from 'tsyringe';
import { adminProcedure } from '@infra/trpc/procedures';
import UserMapper from '@mappers/userMapper';
import FindAllUsers from './findAllUsers';

const findAllUsersProcedure = adminProcedure.query(async () => {
  const findAllUsers = container.resolve(FindAllUsers);

  const users = await findAllUsers.execute();

  return UserMapper.toDTOs(users);
});

export default findAllUsersProcedure;
