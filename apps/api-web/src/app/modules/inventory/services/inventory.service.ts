import {
  BadGatewayException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  inventoryItemsResponseSchema,
  type InventoryListQuery,
  type WebInventoryProxyResponse,
} from '@erp/contracts';

@Injectable()
export class InventoryService {
  private readonly inventoryApiBaseUrl =
    process.env.INVENTORY_API_URL ?? 'http://localhost:5000/api';

  async getInventoryProxy(
    query: InventoryListQuery,
  ): Promise<WebInventoryProxyResponse> {
    const searchParams = new URLSearchParams({ limit: String(query.limit) });
    const url = `${this.inventoryApiBaseUrl}/inventory/items?${searchParams.toString()}`;

    let response: Response;
    try {
      response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });
    } catch {
      throw new ServiceUnavailableException(
        `No se pudo conectar con api-inventory en ${this.inventoryApiBaseUrl}`,
      );
    }

    if (!response.ok) {
      throw new ServiceUnavailableException(
        `api-inventory respondio con estado ${response.status}`,
      );
    }

    const payload = await response.json();
    const inventory = inventoryItemsResponseSchema.safeParse(payload);

    if (!inventory.success) {
      throw new BadGatewayException(
        'api-inventory devolvio un formato invalido',
      );
    }

    return {
      source: 'api-web',
      inventory: inventory.data,
    };
  }
}
