import { InventoryHealthEntity } from './health/entities/health.entity';

export const apiInventoryEntitiesByModule = {
  health: [InventoryHealthEntity],
} as const;

export const apiInventoryEntities = Object.values(
  apiInventoryEntitiesByModule,
).flat();
