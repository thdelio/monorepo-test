import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from '../services/health.service';

@ApiTags('inventory-health')
@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({ summary: 'Health check basico de API Inventory' })
  @ApiOkResponse({
    description: 'Mensaje basico de disponibilidad de API Inventory',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Hello API' },
      },
      required: ['message'],
    },
  })
  @Get()
  getData() {
    return this.healthService.getData();
  }
}
