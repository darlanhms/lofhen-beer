import Controller from '@core/Controller';
import UserMapper from '@mappers/userMapper';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Login from './login';

export default class LoginController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const login = container.resolve(Login);

    const { user, jwt } = await login.execute(req.body);

    req.session = { jwt };

    return res.json({
      user: UserMapper.toDTO(user),
      jwt,
    });
  }
}
