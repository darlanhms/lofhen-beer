import { container } from 'tsyringe';
import UserMapper from '@mappers/userMapper';
import Login from '@useCases/user/login/login';
import loginSchema from '@useCases/user/login/loginSchema';
import { publicProcedure, router } from '../trpc';

const userRouter = router({
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const login = container.resolve(Login);

    const { user, jwt } = await login.execute(input);

    return {
      jwt,
      user: UserMapper.toDTO(user),
    };
  }),
});

export default userRouter;
