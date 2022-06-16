import { Router } from 'express';
import { body } from 'express-validator';
import { currentUser } from 'middlewares/currentUser';
import ensureAdmin from 'middlewares/ensureAdmin';
import { validateRequest } from 'middlewares/validateRequest';
import { createCity } from 'services/city/createCity';
import { updateCity } from 'services/city/updateCity';

const cityRouter = Router();

const createCityValidations = [
  body('name').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('stateId').trim().notEmpty().withMessage('Estado é obrigatório'),
];

cityRouter.post('/', currentUser, ensureAdmin, ...createCityValidations, validateRequest, async (req, res) => {
  const city = await createCity(req.body);

  return res.json(city);
});

cityRouter.put('/:id', currentUser, ensureAdmin, async (req, res) => {
  await updateCity({ ...req.body, id: req.params.id });

  return res.status(200).send();
});

export default cityRouter;
