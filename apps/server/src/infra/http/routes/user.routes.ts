import CreateUserController from '@useCases/user/createUser/createUserController';
import FindAllUsersController from '@useCases/user/findAllUsers/findAllUsersController';
import LoginController from '@useCases/user/login/loginController';
import { Router } from 'express';
import { currentUser } from '../middlewares/currentUser';
import ensureAdmin from '../middlewares/ensureAdmin';

const userRouter = Router();

const createUserController = new CreateUserController();
const loginController = new LoginController();
const findAllUsers = new FindAllUsersController();

userRouter.post('/', currentUser, ensureAdmin, createUserController.handle);
userRouter.get('/', currentUser, ensureAdmin, findAllUsers.handle);
userRouter.post('/login', loginController.handle);

export default userRouter;
