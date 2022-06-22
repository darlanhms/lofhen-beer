export interface AddressDTO {
  id: string;
  alias: string;
  customerId: string | null;
  link: string | null;
  cityId: string;
  neighborhood: string | null;
  street: string | null;
  number: string | null;
  reference: string | null;
  complement: string | null;
  enabled: boolean;
}
