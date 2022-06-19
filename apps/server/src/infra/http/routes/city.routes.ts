import { Router } from 'express';
import CreateCityController from '@useCases/city/createCity/createCityController';
import FindAllCitiesController from '@useCases/city/findAllCities/findAllCitiesController';
import UpdateCityController from '@useCases/city/updateCity/updateCityController';
import { currentUser } from '../middlewares/currentUser';
import ensureAdmin from '../middlewares/ensureAdmin';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const cityRouter = Router();

const createCityController = new CreateCityController();
const updateCityController = new UpdateCityController();
const findAllCitiesController = new FindAllCitiesController();

cityRouter.post('/', currentUser, ensureAdmin, createCityController.handle);
cityRouter.get('/', currentUser, ensureAuthentication, findAllCitiesController.handle);
cityRouter.put('/:id', currentUser, ensureAdmin, updateCityController.handle);

export default cityRouter;
