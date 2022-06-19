import { Router } from 'express';
import CreateCityController from '@useCases/city/createCity/createCityController';
import { currentUser } from '../middlewares/currentUser';
import ensureAdmin from '../middlewares/ensureAdmin';

const cityRouter = Router();

const createCityController = new CreateCityController();

cityRouter.post('/', currentUser, ensureAdmin, createCityController.handle);

export default cityRouter;
