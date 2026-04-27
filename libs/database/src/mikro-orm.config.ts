import { defineConfig, type Options } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

const config: Options = defineConfig({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dbName: process.env.DB_NAME ?? 'erp',
  user: process.env.DB_USER ?? 'erp',
  password: process.env.DB_PASS ?? 'erp',
  entities: [
    './dist/apps/api-web/src/app/modules/**/entities/*.entity.js',
    './dist/libs/database/src/entities/*.entity.js',
  ],
  entitiesTs: [
    './apps/api-web/src/app/modules/**/entities/*.entity.ts',
    './libs/database/src/entities/*.entity.ts',
  ],
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
});

export default config;