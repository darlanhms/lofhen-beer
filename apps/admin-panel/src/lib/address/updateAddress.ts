import apiClient from 'services/api';

export interface UpdateAddressRequest {
  id: string;
  alias?: string;
  link?: string | null;
  neighborhood?: string | null;
  street?: string | null;
  number?: string | null;
  reference?: string | null;
  complement?: string | null;
  enabled?: boolean;
}

export default async function updateAddress(request: UpdateAddressRequest): Promise<void> {
  await apiClient.put(`/addresses/${request.id}`, request);
}
