import prisma from 'client';
import { excludeFields } from 'database/excludeFields';
import { Router } from 'express';
import { body } from 'express-validator';
import { currentUser } from 'middlewares/currentUser';
import ensureAdmin from 'middlewares/ensureAdmin';
import { validateRequest } from 'middlewares/validateRequest';
import createUser from 'services/user/createUser';
import deleteUser from 'services/user/deleteUser';
import login from 'services/user/login';
import updateUser from 'services/user/updateUser';

const userRouter = Router();

const loginValidations = [
  body('username').trim().notEmpty().withMessage('Nome de usuário é obrigatório'),
  body('password').trim().notEmpty().withMessage('Senha é obrigatória'),
];

const userCreationValidations = [
  body('name').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('username').trim().notEmpty().withMessage('Nome de usuário é obrigatório'),
  body('role')
    .trim()
    .notEmpty()
    .withMessage('Cargo é obrigatório')
    .isIn(['ADMIN', 'AGENT'])
    .withMessage('Cargo deve ser ADMIN ou AGENT'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('A senha deve ter no mínimo 4 caracteres e no máximo 20'),
];

const userUpdateValidations = [
  body('password')
    .optional()
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('A senha deve ter no mínimo 4 caracteres e no máximo 20'),
];

userRouter.post(
  '/',
  currentUser,
  ensureAdmin,
  ...userCreationValidations,
  validateRequest,
  async (req, res) => {
    const user = await createUser(req.body);

    return res.json(user);
  },
);

userRouter.put(
  '/:id',
  currentUser,
  ensureAdmin,
  ...userUpdateValidations,
  validateRequest,
  async (req, res) => {
    await updateUser({
      id: req.params.id,
      ...req.body,
    });

    return res.status(200).send();
  },
);

userRouter.get('/', currentUser, ensureAdmin, async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      ...excludeFields('user', ['password']),
    },
  });

  return res.json(users);
});

userRouter.get('/current-user', currentUser, async (req, res) => {
  if (!req.user?.id) {
    return res.json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.user?.id,
    },
    select: {
      ...excludeFields('user', ['password']),
    },
  });

  if (!user) {
    return res.json({ user: null });
  }

  return res.json({ user });
});

userRouter.get('/:id', currentUser, ensureAdmin, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
    select: {
      ...excludeFields('user', ['password']),
    },
  });

  return res.json(user);
});

userRouter.delete('/:id', currentUser, ensureAdmin, async (req, res) => {
  await deleteUser(req.params.id);

  return res.status(200).send();
});

userRouter.post('/login', ...loginValidations, validateRequest, async (req, res) => {
  const { user, jwt } = await login(req.body);

  req.session = { jwt };

  return res.json({
    user: {
      ...user,
      password: undefined,
    },
    jwt,
  });
});

userRouter.post('/logout', async (req, res) => {
  req.session = null;

  return res.status(200).send();
});

export default userRouter;
