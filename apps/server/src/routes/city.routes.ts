import { Router } from 'express';
import { body } from 'express-validator';
import { currentUser } from 'middlewares/currentUser';
import ensureAdmin from 'middlewares/ensureAdmin';
import { validateRequest } from 'middlewares/validateRequest';
import { createCity } from 'services/city/createCity';

const cityRouter = Router();

const createCityValidations = [
  body('name').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('stateId').trim().notEmpty().withMessage('Estado é obrigatório'),
];

cityRouter.post('/', currentUser, ensureAdmin, ...createCityValidations, validateRequest, async (req, res) => {
  const city = await createCity(req.body);

  return res.json(city);
});

export default cityRouter;
