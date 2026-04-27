import { defineEntity } from '@mikro-orm/core';

export const HealthEntity = defineEntity({
  name: 'HealthEntity',
  tableName: 'health_checks',
  properties: (p) => ({
    id: p.integer().primary(),
    code: p.string().length(32).unique(),
  }),
});
