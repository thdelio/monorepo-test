import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LoggerModule } from 'nestjs-pino';
import mikroOrmConfig from './mikro-orm.config';
import { HealthController } from './modules/health/controllers/health.controller';
import { InventoryController } from './modules/inventory/controllers/inventory.controller';
import { HealthService } from './modules/health/services/health.service';
import { InventoryService } from './modules/inventory/services/inventory.service';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
  ],
  controllers: [HealthController, InventoryController],
  providers: [HealthService, InventoryService],
})
export class AppModule {}
