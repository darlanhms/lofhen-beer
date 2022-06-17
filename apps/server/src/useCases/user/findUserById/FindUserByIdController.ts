import Controller from '@core/Controller';
import UserMapper from '@mappers/userMapper';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindUserById from './FindUserById';

export default class FindUserByIdController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const findUserById = container.resolve(FindUserById);

    const user = await findUserById.execute(req.params.id);

    return res.json(UserMapper.toDTOOrNull(user));
  }
}
