import { Router } from 'express';
import CreateAddressController from '@useCases/address/createAddress/createAddressController';
import FindAllAddressesController from '@useCases/address/findAllAddresses/findAllAddressesController';
import UpdateAddressController from '@useCases/address/updateAddress/updateAddressController';
import { currentUser } from '../middlewares/currentUser';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const addressRouter = Router();

const createAddressController = new CreateAddressController();
const findAllAddressesController = new FindAllAddressesController();
const updateAddressController = new UpdateAddressController();

addressRouter.post('/', currentUser, ensureAuthentication, createAddressController.handle);
addressRouter.get('/', currentUser, ensureAuthentication, findAllAddressesController.handle);
addressRouter.put('/:id', currentUser, ensureAuthentication, updateAddressController.handle);

export default addressRouter;
