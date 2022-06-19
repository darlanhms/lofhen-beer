import { inject, injectable } from 'tsyringe';
import UseCase from '@core/UseCase';
import CityEntity from '@entities/city';
import ICityRepository from '@repositories/ICityRepository';

@injectable()
export default class FindCityById implements UseCase<string, CityEntity | null> {
  constructor(
    @inject('CityRepository')
    private cityRepo: ICityRepository,
  ) {}

  execute(id: string): Promise<CityEntity | null> {
    return this.cityRepo.findById(id);
  }
}
