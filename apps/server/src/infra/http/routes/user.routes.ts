import CreateUserController from '@useCases/user/createUser/createUserController';
import LoginController from '@useCases/user/login/loginController';
import { Router } from 'express';

const userRouter = Router();

const createUserController = new CreateUserController();
const loginController = new LoginController();

userRouter.post('/', createUserController.handle);
userRouter.post('/login', loginController.handle);

export default userRouter;
