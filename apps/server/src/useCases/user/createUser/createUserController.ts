import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import UserMapper from '@mappers/userMapper';
import CreateUser from './createUser';

export default class CreateUserController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateUser);

    const user = await createUser.execute(req.body);

    return res.json(UserMapper.toDTO(user));
  }
}
