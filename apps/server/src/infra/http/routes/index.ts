import { Router } from 'express';
import addressRouter from './address.routes';
import cityRouter from './city.routes';
import customerRouter from './customer.routes';
import stateRouter from './state.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/cities', cityRouter);
router.use('/states', stateRouter);
router.use('/addresses', addressRouter);
router.use('/customers', customerRouter);

export default router;
