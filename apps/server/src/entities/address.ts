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

type UpdatableProps = Pick<
  AddressProps,
  'alias' | 'link' | 'neighborhood' | 'street' | 'number' | 'reference' | 'complement' | 'enabled'
>;

export default class AddressEntity extends Entity<AddressProps> {
  @IsNotEmpty({ message: 'Apelido é obrigatório' })
  alias: string;

  customerId: string | null;

  private _link: string | null;

  @IsOptional()
  @IsUrl(undefined, { message: 'Link do endereço deve ser válido' })
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

  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  cityId: string;

  neighborhood: string | null;

  street: string | null;

  number: string | null;

  reference: string | null;

  complement: string | null;

  enabled: boolean;

  city: CityEntity;

  constructor(props: AddressProps, id?: string) {
    const propsWithDefault: AddressProps = {
      enabled: true,
      ...props,
    };

    super(propsWithDefault, id);
  }

  update(props: Partial<UpdatableProps>): void {
    if (props.alias) {
      this.alias = props.alias;
    }
    if (props.link || props.link === null) {
      this.link = props.link;
    }
    if (props.neighborhood || props.neighborhood === null) {
      this.neighborhood = props.neighborhood;
    }
    if (props.street || props.street === null) {
      this.street = props.street;
    }
    if (props.number || props.number === null) {
      this.number = props.number;
    }
    if (props.reference || props.reference === null) {
      this.reference = props.reference;
    }
    if (props.complement || props.complement === null) {
      this.complement = props.complement;
    }
    if (props.enabled || props.enabled === false) {
      this.enabled = props.enabled;
    }
  }
}
