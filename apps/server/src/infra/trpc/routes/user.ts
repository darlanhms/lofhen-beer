import createUserProcedure from '@useCases/user/createUser/createUserProcedure';
import currentUserProcedure from '@useCases/user/currentUser/currentUserProcedure';
import deleteUserProcedure from '@useCases/user/deleteUser/deleteUserProcedure';
import loginProcedure from '@useCases/user/login/loginProcedure';
import { router } from '../index';

const userRouter = router({
  login: loginProcedure,
  create: createUserProcedure,
  current: currentUserProcedure,
  delete: deleteUserProcedure,
});

export default userRouter;
