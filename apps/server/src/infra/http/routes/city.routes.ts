import { Router } from 'express';
import CreateCityController from '@useCases/city/createCity/createCityController';
import UpdateCityController from '@useCases/city/updateCity/updateCityController';
import { currentUser } from '../middlewares/currentUser';
import ensureAdmin from '../middlewares/ensureAdmin';

const cityRouter = Router();

const createCityController = new CreateCityController();
const updateCityController = new UpdateCityController();

cityRouter.post('/', currentUser, ensureAdmin, createCityController.handle);
cityRouter.put('/:id', currentUser, ensureAdmin, updateCityController.handle);

export default cityRouter;
