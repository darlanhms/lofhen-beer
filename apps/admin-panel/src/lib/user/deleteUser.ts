import apiClient from 'services/api';

export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}
