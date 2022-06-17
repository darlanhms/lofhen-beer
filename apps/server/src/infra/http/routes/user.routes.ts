import CreateUserController from '@useCases/user/createUser/createUserController';
import FindAllUsersController from '@useCases/user/findAllUsers/findAllUsersController';
import LoginController from '@useCases/user/login/loginController';
import UpdateUserController from '@useCases/user/updateUser/updateUserController';
import { Router } from 'express';
import { currentUser } from '../middlewares/currentUser';
import ensureAdmin from '../middlewares/ensureAdmin';

const userRouter = Router();

const createUserController = new CreateUserController();
const loginController = new LoginController();
const findAllUsersController = new FindAllUsersController();
const updateUserController = new UpdateUserController();

userRouter.post('/', currentUser, ensureAdmin, createUserController.handle);
userRouter.get('/', currentUser, ensureAdmin, findAllUsersController.handle);
userRouter.post('/login', loginController.handle);
userRouter.put('/:id', currentUser, ensureAdmin, updateUserController.handle);

export default userRouter;
