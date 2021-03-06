import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import UserMapper from '@mappers/userMapper';
import FindUserById from './findUserById';

export default class FindUserByIdController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const findUserById = container.resolve(FindUserById);

    const user = await findUserById.execute(req.params.id);

    return res.json(UserMapper.toDTOOrNull(user));
  }
}
