import createUserProcedure from '@useCases/user/createUser/createUserProcedure';
import currentUserProcedure from '@useCases/user/currentUser/currentUserProcedure';
import deleteUserProcedure from '@useCases/user/deleteUser/deleteUserProcedure';
import findAllUsersProcedure from '@useCases/user/findAllUsers/findAllUsersProcedure';
import findUserByIdProcedure from '@useCases/user/findUserById/findUserByIdProcedure';
import loginProcedure from '@useCases/user/login/loginProcedure';
import { router } from '../index';

const userRouter = router({
  login: loginProcedure,
  create: createUserProcedure,
  current: currentUserProcedure,
  delete: deleteUserProcedure,
  list: findAllUsersProcedure,
  byId: findUserByIdProcedure,
});

export default userRouter;
