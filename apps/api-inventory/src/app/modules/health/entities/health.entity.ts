import { defineEntity } from '@mikro-orm/core';

export const InventoryHealthEntity = defineEntity({
  name: 'InventoryHealthEntity',
  tableName: 'inventory_health_checks',
  properties: (p) => ({
    id: p.integer().primary(),
    code: p.string().length(32).unique(),
  }),
});
