import { Router } from 'express';
import CreateCustomerController from '@useCases/customer/createCustomer/createCustomerController';
import FindCustomerByIdController from '@useCases/customer/findCustomerById/findCustomerByIdController';
import UpdateCustomerController from '@useCases/customer/updateCustomer/updateCustomerController';
import { currentUser } from '../middlewares/currentUser';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const customerRouter = Router();

const createCustomerController = new CreateCustomerController();
const updateCustomerController = new UpdateCustomerController();
const findCustomerByIdController = new FindCustomerByIdController();

customerRouter.post('/', currentUser, ensureAuthentication, createCustomerController.handle);
customerRouter.put('/:id', currentUser, ensureAuthentication, updateCustomerController.handle);
customerRouter.get('/:id', currentUser, ensureAuthentication, findCustomerByIdController.handle);

export default customerRouter;
