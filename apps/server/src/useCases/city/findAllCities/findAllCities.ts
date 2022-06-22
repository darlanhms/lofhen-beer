import { inject, injectable } from 'tsyringe';
import UseCase from '@core/UseCase';
import CityEntity from '@entities/city';
import ICityRepository from '@repositories/ICityRepository';

@injectable()
export default class FindAllCities implements UseCase<undefined, Array<CityEntity>> {
  constructor(
    @inject('CityRepository')
    private cityRepo: ICityRepository,
  ) {}

  async execute(): Promise<Array<CityEntity>> {
    return this.cityRepo.findAll();
  }
}
