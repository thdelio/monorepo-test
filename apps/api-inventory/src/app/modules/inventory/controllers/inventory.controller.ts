import { Controller, Get, Query } from '@nestjs/common';
import {
  InventoryItemsResponseDto,
  InventoryListQueryDto,
} from '@erp/contracts';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InventoryService } from '../services/inventory.service';

@ApiTags('inventory-items')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Obtiene items de inventario' })
  @ApiOkResponse({
    description: 'Listado simplificado de items de inventario',
    type: InventoryItemsResponseDto,
  })
  @Get('items')
  getInventoryItems(@Query() query: InventoryListQueryDto) {
    return this.inventoryService.getInventoryItems(query);
  }
}
