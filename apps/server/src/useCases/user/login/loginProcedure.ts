import { loginSchema } from '@lofhen/contracts';
import { container } from 'tsyringe';
import { publicProcedure } from '@infra/trpc/procedures';
import UserMapper from '@mappers/userMapper';
import Login from './login';

const loginProcedure = publicProcedure.input(loginSchema).mutation(async ({ input }) => {
  const login = container.resolve(Login);

  const { user, jwt } = await login.execute(input);

  return {
    jwt,
    user: UserMapper.toDTO(user),
  };
});

export default loginProcedure;
