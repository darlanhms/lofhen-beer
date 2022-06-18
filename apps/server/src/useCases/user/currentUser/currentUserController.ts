import Controller from '@core/Controller';
import UserMapper from '@mappers/userMapper';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindUserById from '../findUserById/findUserById';

export default class CurrentUserController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    if (!req.user?.id) {
      return res.json(null);
    }

    const findUserById = container.resolve(FindUserById);

    const user = await findUserById.execute(req.user.id);

    return res.json(UserMapper.toDTOOrNull(user));
  }
}
