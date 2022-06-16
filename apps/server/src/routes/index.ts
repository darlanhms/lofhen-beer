import { Router } from 'express';
import stateRouter from './state.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/states', stateRouter);

export default router;
