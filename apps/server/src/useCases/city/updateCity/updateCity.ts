import { inject, injectable } from 'tsyringe';
import NotFoundError from '@core/errors/notFoundError';
import UseCase from '@core/UseCase';
import ICityRepository from '@repositories/ICityRepository';

interface UpdateCityRequest {
  id: string;
  name?: string;
}

@injectable()
export default class UpdateCity implements UseCase<UpdateCityRequest, void> {
  constructor(
    @inject('CityRepository')
    private cityRepo: ICityRepository,
  ) {}

  async execute(request: UpdateCityRequest): Promise<void> {
    const city = await this.cityRepo.findById(request.id);

    if (!city) {
      throw new NotFoundError('Cidade para atualizar não encontrada.');
    }

    city.update({
      name: request.name,
    });

    await this.cityRepo.save(city);
  }
}
