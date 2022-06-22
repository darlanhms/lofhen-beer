import CityEntity from '@entities/city';

export default interface ICityRepository {
  save(city: CityEntity): Promise<CityEntity>;
  findById(id: string): Promise<CityEntity | null>;
  findAll(): Promise<Array<CityEntity>>;
}
