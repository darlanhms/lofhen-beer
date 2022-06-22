import AddressEntity from '@entities/address';

export default interface IAddressRepository {
  save(address: AddressEntity): Promise<AddressEntity>;
  findById(id: string): Promise<AddressEntity | null>;
  findAll(): Promise<Array<AddressEntity>>;
}
