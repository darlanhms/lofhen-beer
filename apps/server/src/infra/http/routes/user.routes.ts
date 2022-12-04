import { Router } from 'express';
import UpdateUserController from '@useCases/user/updateUser/updateUserController';
import { currentUser } from '../middlewares/currentUser';
import ensureAdmin from '../middlewares/ensureAdmin';

const userRouter = Router();

const updateUserController = new UpdateUserController();

userRouter.put('/:id', currentUser, ensureAdmin, updateUserController.handle);

export default userRouter;
