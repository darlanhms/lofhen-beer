import { container } from 'tsyringe';
import Controller from '@core/Controller';
import UserMapper from '@mappers/userMapper';
import { Request, Response } from 'express';
import FindAllUsers from './findAllUsers';

export default class FindAllUsersController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(FindAllUsers);

    const users = await createUser.execute();

    return res.json(UserMapper.toDTOs(users));
  }
}
