import { Controller, Get, Query } from '@nestjs/common';
import {
  InventoryListQueryDto,
  WebInventoryProxyResponseDto,
} from '@erp/contracts';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InventoryService } from '../services/inventory.service';

@ApiTags('web-inventory')
@Controller('web/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Proxy de inventario consumiendo api-inventory' })
  @ApiOkResponse({
    description: 'Respuesta de api-web con datos de api-inventory',
    type: WebInventoryProxyResponseDto,
  })
  @Get('items')
  getInventoryProxy(@Query() query: InventoryListQueryDto) {
    return this.inventoryService.getInventoryProxy(query);
  }
}
