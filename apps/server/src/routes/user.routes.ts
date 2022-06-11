import { Router } from 'express';
import { body } from 'express-validator';
import { currentUser } from 'middlewares/currentUser';
import ensureAdmin from 'middlewares/ensureAdmin';
import { validateRequest } from 'middlewares/validateRequest';
import createUser from 'services/user/createUser';
import login from 'services/user/login';

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

userRouter.post(
  '/',
  currentUser,
  ensureAdmin,
  ...userCreationValidations,
  validateRequest,
  async (req, res) => {
    const user = await createUser(req.body);

    return res.json(user.toDTO());
  },
);

userRouter.post('/login', ...loginValidations, validateRequest, async (req, res) => {
  const { user, jwt } = await login(req.body);

  req.session = { jwt };

  return res.json({
    user: user.toDTO(),
    jwt,
  });
});

export default userRouter;
