import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import Controller from '@core/Controller';
import DeleteUser from './deleteUser';

export default class DeleteUserController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const deleteUser = container.resolve(DeleteUser);

    await deleteUser.execute(req.params.id);

    return res.status(StatusCodes.OK).send();
  }
}
