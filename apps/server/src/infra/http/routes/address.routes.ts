import { Router } from 'express';
import CreateAddressController from '@useCases/address/createAddress/createAddressController';
import FindAllAddressesController from '@useCases/address/findAllAddresses/findAllAddressesController';
import { currentUser } from '../middlewares/currentUser';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const addressRouter = Router();

const createAddressController = new CreateAddressController();
const findAllAddressesController = new FindAllAddressesController();

addressRouter.post('/', currentUser, ensureAuthentication, createAddressController.handle);
addressRouter.get('/', currentUser, ensureAuthentication, findAllAddressesController.handle);

export default addressRouter;
