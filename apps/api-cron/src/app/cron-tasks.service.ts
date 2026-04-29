import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronTasksService {
  private readonly logger = new Logger(CronTasksService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  runHealthCheckTask() {
    this.logger.log('Background task executed: simple health-check test.');
  }
}
