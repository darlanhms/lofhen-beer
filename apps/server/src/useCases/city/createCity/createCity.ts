import { filledArray } from '@lofhen/utils';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';
import ValidationError from '@core/errors/validationError';
import UseCase from '@core/UseCase';
import CityEntity from '@entities/city';
import ICityRepository from '@repositories/ICityRepository';

interface CreateCityRequest {
  name: string;
  stateId: string;
}

@injectable()
export default class CreateCity implements UseCase<CreateCityRequest, CityEntity> {
  constructor(
    @inject('CityRepository')
    private cityRepo: ICityRepository,
  ) {}

  async execute(request: CreateCityRequest): Promise<CityEntity> {
    const city = new CityEntity({
      name: request.name,
      stateId: request.stateId,
    });

    const errors = await validate(city);

    if (filledArray(errors)) {
      throw new ValidationError(errors);
    }

    const newCity = await this.cityRepo.save(city);

    return newCity;
  }
}
