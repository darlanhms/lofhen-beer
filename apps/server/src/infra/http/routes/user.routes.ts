import { Router } from 'express';
import DeleteUserController from '@useCases/user/deleteUser/deleteUserController';
import FindAllUsersController from '@useCases/user/findAllUsers/findAllUsersController';
import FindUserByIdController from '@useCases/user/findUserById/findUserByIdController';
import UpdateUserController from '@useCases/user/updateUser/updateUserController';
import { currentUser } from '../middlewares/currentUser';
import ensureAdmin from '../middlewares/ensureAdmin';

const userRouter = Router();

const findAllUsersController = new FindAllUsersController();
const updateUserController = new UpdateUserController();
const findUserByIdController = new FindUserByIdController();
const deleteUserController = new DeleteUserController();

userRouter.get('/', currentUser, ensureAdmin, findAllUsersController.handle);
userRouter.get('/:id', currentUser, ensureAdmin, findUserByIdController.handle);
userRouter.put('/:id', currentUser, ensureAdmin, updateUserController.handle);
userRouter.delete('/:id', currentUser, ensureAdmin, deleteUserController.handle);

export default userRouter;
