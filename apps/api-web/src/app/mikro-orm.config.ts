import { Migrator } from '@mikro-orm/migrations';
import type { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { apiWebEntities } from './modules/entities-by-module';

const mikroOrmConfig: MikroOrmModuleSyncOptions = {
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dbName: process.env.DB_NAME ?? 'erp',
  user: process.env.DB_USER ?? 'erp',
  password: process.env.DB_PASS ?? 'erp',
  entities: apiWebEntities,
  entitiesTs: apiWebEntities,
  extensions: [Migrator, SeedManager],
  migrations: {
    path: './libs/database/src/migrations',
    pathTs: './libs/database/src/migrations',
  },
  seeder: {
    path: './libs/database/src/seeders',
    pathTs: './libs/database/src/seeders',
    defaultSeeder: 'DatabaseSeeder',
  },
};

export default mikroOrmConfig;