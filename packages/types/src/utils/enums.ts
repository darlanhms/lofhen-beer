export const Role: {
  ADMIN: 'ADMIN';
  AGENT: 'AGENT';
} = {
  ADMIN: 'ADMIN',
  AGENT: 'AGENT',
};

export type Role = typeof Role[keyof typeof Role];
