import createUserProcedure from '@useCases/user/createUser/createUserProcedure';
import currentUserProcedure from '@useCases/user/currentUser/currentUserProcedure';
import loginProcedure from '@useCases/user/login/loginProcedure';
import { router } from '../index';

const userRouter = router({
  login: loginProcedure,
  create: createUserProcedure,
  current: currentUserProcedure,
});

export default userRouter;
