import { Router } from 'express';
import cityRouter from './city.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/cities', cityRouter);

export default router;
