import CreateUserController from '@useCases/user/createUser/createUserController';
import CurrentUserController from '@useCases/user/currentUser/currentUserController';
import FindAllUsersController from '@useCases/user/findAllUsers/findAllUsersController';
import FindUserByIdController from '@useCases/user/findUserById/findUserByIdController';
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
const findUserByIdController = new FindUserByIdController();
const currentUserController = new CurrentUserController();

userRouter.post('/', currentUser, ensureAdmin, createUserController.handle);
userRouter.get('/', currentUser, ensureAdmin, findAllUsersController.handle);
userRouter.get('/current-user', currentUser, currentUserController.handle);
userRouter.get('/:id', currentUser, ensureAdmin, findUserByIdController.handle);
userRouter.post('/login', loginController.handle);
userRouter.put('/:id', currentUser, ensureAdmin, updateUserController.handle);

export default userRouter;
