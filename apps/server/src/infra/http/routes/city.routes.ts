import { Router } from 'express';
import CreateCityController from '@useCases/city/createCity/createCityController';
import FindAllCitiesController from '@useCases/city/findAllCities/findAllCitiesController';
import FindCityByIdController from '@useCases/city/findCityById/findCityByIdController';
import UpdateCityController from '@useCases/city/updateCity/updateCityController';
import { currentUser } from '../middlewares/currentUser';
import ensureAdmin from '../middlewares/ensureAdmin';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const cityRouter = Router();

const createCityController = new CreateCityController();
const updateCityController = new UpdateCityController();
const findAllCitiesController = new FindAllCitiesController();
const findCityByIdController = new FindCityByIdController();

cityRouter.post('/', currentUser, ensureAdmin, createCityController.handle);
cityRouter.get('/', currentUser, ensureAuthentication, findAllCitiesController.handle);
cityRouter.get('/:id', currentUser, ensureAuthentication, findCityByIdController.handle);
cityRouter.put('/:id', currentUser, ensureAdmin, updateCityController.handle);

export default cityRouter;
