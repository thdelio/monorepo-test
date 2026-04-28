import { Injectable } from '@nestjs/common';
import type {
  InventoryItemsResponse,
  InventoryListQuery,
} from '@erp/contracts';

@Injectable()
export class InventoryService {
  getInventoryItems(query: InventoryListQuery): InventoryItemsResponse {
    const generatedAt = new Date().toISOString();

    const items = Array.from({ length: query.limit }, (_, index) => ({
      id: index + 1,
      sku: `INV-${String(index + 1).padStart(3, '0')}`,
      name: `Producto ${index + 1}`,
      stock: (index + 1) * 10,
    }));

    return {
      source: 'api-inventory',
      generatedAt,
      items,
    };
  }
}
