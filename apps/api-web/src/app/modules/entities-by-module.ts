import { HealthEntity } from './health/entities/health.entity';

export const apiWebEntitiesByModule = {
  health: [HealthEntity],
} as const;

export const apiWebEntities = Object.values(apiWebEntitiesByModule).flat();
