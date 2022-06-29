import { Router } from 'express';
import CreateCustomerController from '@useCases/customer/createCustomer/createCustomerController';
import UpdateCustomerController from '@useCases/customer/updateCustomer/updateCustomerController';
import { currentUser } from '../middlewares/currentUser';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const customerRouter = Router();

const createCustomerController = new CreateCustomerController();
const updateCustomerController = new UpdateCustomerController();

customerRouter.post('/', currentUser, ensureAuthentication, createCustomerController.handle);
customerRouter.put('/:id', currentUser, ensureAuthentication, updateCustomerController.handle);

export default customerRouter;
