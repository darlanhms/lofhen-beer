import createUserProcedure from '@useCases/user/createUser/createUserProcedure';
import loginProcedure from '@useCases/user/login/loginProcedure';
import { router } from '../index';

const userRouter = router({
  login: loginProcedure,
  create: createUserProcedure,
});

export default userRouter;
