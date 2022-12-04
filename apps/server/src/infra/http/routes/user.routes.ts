import { Router } from 'express';
import FindUserByIdController from '@useCases/user/findUserById/findUserByIdController';
import UpdateUserController from '@useCases/user/updateUser/updateUserController';
import { currentUser } from '../middlewares/currentUser';
import ensureAdmin from '../middlewares/ensureAdmin';

const userRouter = Router();

const updateUserController = new UpdateUserController();
const findUserByIdController = new FindUserByIdController();

userRouter.get('/:id', currentUser, ensureAdmin, findUserByIdController.handle);
userRouter.put('/:id', currentUser, ensureAdmin, updateUserController.handle);

export default userRouter;
