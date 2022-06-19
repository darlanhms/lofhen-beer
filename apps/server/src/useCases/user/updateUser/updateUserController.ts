import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import UpdateUser from './updateUser';

export default class UpdateUserController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateUser = container.resolve(UpdateUser);

    await updateUser.execute({ ...req.body, id: req.params.id });

    return res.status(StatusCodes.OK).send();
  }
}
