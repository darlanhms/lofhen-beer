import { Router } from 'express';
import cityRouter from './city.routes';
import stateRouter from './state.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/states', stateRouter);
router.use('/cities', cityRouter);

export default router;
