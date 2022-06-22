import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import Entity from '@core/Entity';
import getFirstLinkFromString from '@core/utils/getFirstLinkFromString';
import CityEntity from './city';

interface AddressProps {
  alias: string;
  customerId: string | null;
  link: string | null;
  cityId: string;
  neighborhood: string | null;
  street: string | null;
  number: string | null;
  reference: string | null;
  complement: string | null;
  enabled?: boolean;
  city?: CityEntity;
}

export default class AddressEntity extends Entity<AddressProps> {
  @IsNotEmpty({ message: 'Apelido é obrigatório' })
  alias: string;

  customerId: string | null;

  @IsOptional()
  @IsUrl({ message: 'Link do endereço deve ser válido' })
  _link: string | null;

  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  cityId: string;

  neighborhood: string | null;

  street: string | null;

  number: string | null;

  reference: string | null;

  complement: string | null;

  enabled: boolean;

  city: CityEntity;

  get link(): string | null {
    return this._link;
  }

  set link(link: string | null) {
    if (link) {
      this._link = getFirstLinkFromString(link) || '';
    } else {
      this._link = null;
    }
  }

  constructor(props: AddressProps, id?: string) {
    const propsWithDefault: AddressProps = {
      enabled: true,
      ...props,
    };

    super(propsWithDefault, id);
  }
}
