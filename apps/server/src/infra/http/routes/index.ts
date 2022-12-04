import { Router } from 'express';
import addressRouter from './address.routes';
import cityRouter from './city.routes';
import customerRouter from './customer.routes';
import stateRouter from './state.routes';

const router = Router();

router.use('/cities', cityRouter);
router.use('/states', stateRouter);
router.use('/addresses', addressRouter);
router.use('/customers', customerRouter);

export default router;
