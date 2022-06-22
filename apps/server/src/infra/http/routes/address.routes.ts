import { Router } from 'express';
import CreateAddressController from '@useCases/address/createAddress/createAddressController';
import { currentUser } from '../middlewares/currentUser';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const addressRouter = Router();

const createAddressController = new CreateAddressController();

addressRouter.post('/', currentUser, ensureAuthentication, createAddressController.handle);

export default addressRouter;
