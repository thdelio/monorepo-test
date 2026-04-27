import { defineEntity } from '@mikro-orm/core';

export const User = defineEntity({
  name: 'users',
  properties: {
    id: { type: 'uuid', primary: true, default: () => crypto.randomUUID() },
    name: { type: 'string' },
    email: { type: 'string', unique: true },
    createdAt: { type: 'date', onCreate: () => new Date() },
  },
});
