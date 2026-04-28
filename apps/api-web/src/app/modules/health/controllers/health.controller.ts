import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from '../services/health.service';

@ApiTags('web-health')
@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({ summary: 'Health check basico de API Web' })
  @ApiOkResponse({
    description: 'Mensaje basico de disponibilidad de API Web',
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
