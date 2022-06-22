import { Router } from 'express';
import FindAllStatesController from '@useCases/state/findAllStates/findAllStatesController';
import { currentUser } from '../middlewares/currentUser';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const stateRouter = Router();

const findAllStatesController = new FindAllStatesController();

stateRouter.get('/', currentUser, ensureAuthentication, findAllStatesController.handle);

export default stateRouter;
