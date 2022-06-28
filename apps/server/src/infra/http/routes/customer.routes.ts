import { Router } from 'express';
import CreateCustomerController from '@useCases/customer/createCustomer/createCustomerController';
import { currentUser } from '../middlewares/currentUser';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const customerRouter = Router();

const createCustomerController = new CreateCustomerController();

customerRouter.post('/', currentUser, ensureAuthentication, createCustomerController.handle);

export default customerRouter;
