import { Router } from 'express';
import { body } from 'express-validator';
import { currentUser } from 'middlewares/currentUser';
import ensureAdmin from 'middlewares/ensureAdmin';
import { validateRequest } from 'middlewares/validateRequest';
import { createState } from 'services/state/createState';
import { updateState } from 'services/state/udpateState';

const stateRouter = Router();

const stateCreationValidations = [
  body('name').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('abbr').trim().notEmpty().withMessage('Abreviação é obrigatória'),
];

stateRouter.post(
  '/',
  currentUser,
  ensureAdmin,
  ...stateCreationValidations,
  validateRequest,
  async (req, res) => {
    const state = await createState(req.body);

    return res.json(state);
  },
);
stateRouter.put('/:id', currentUser, ensureAdmin, async (req, res) => {
  const state = await updateState({ ...req.body, id: req.params.id });

  return res.json(state);
});

export default stateRouter;
