import prisma from 'client';
import { Router } from 'express';
import { body } from 'express-validator';
import { currentUser } from 'middlewares/currentUser';
import ensureAdmin from 'middlewares/ensureAdmin';
import { ensureAuthentication } from 'middlewares/ensureAuthentication';
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

cityRouter.get('/', currentUser, ensureAuthentication, async (req, res) => {
  const cities = await prisma.city.findMany({
    include: {
      state: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return res.json(cities);
});

cityRouter.get('/:id', currentUser, ensureAuthentication, async (req, res) => {
  const city = await prisma.city.findFirst({
    where: {
      id: req.params.id,
    },
    include: {
      state: true,
    },
  });

  return res.json(city);
});

export default cityRouter;
