import { Router } from 'express';
import createUser from 'services/user/createUser';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const user = await createUser(req.body);

  return res.json(user.toDTO());
});

export default userRouter;
