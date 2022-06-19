import { Router } from 'express';
import cityRouter from './city.routes';
import stateRouter from './state.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/cities', cityRouter);
router.use('/states', stateRouter);

export default router;
