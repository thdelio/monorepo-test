import {
  BadGatewayException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InventoryService } from '../../../../../src/app/modules/inventory/services/inventory.service';

describe('InventoryService', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('should proxy inventory payload', async () => {
    const service = new InventoryService();
    const payload = {
      source: 'api-inventory',
      generatedAt: new Date().toISOString(),
      items: [{ id: 1, sku: 'INV-001', name: 'Producto 1', stock: 10 }],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(payload),
    }) as unknown as typeof fetch;

    await expect(service.getInventoryProxy({ limit: 1 })).resolves.toEqual({
      source: 'api-web',
      inventory: payload,
    });
  });

  it('should fail when inventory is unavailable', async () => {
    const service = new InventoryService();
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error('down')) as unknown as typeof fetch;

    await expect(
      service.getInventoryProxy({ limit: 1 }),
    ).rejects.toBeInstanceOf(ServiceUnavailableException);
  });

  it('should fail on invalid payload', async () => {
    const service = new InventoryService();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ source: 'broken' }),
    }) as unknown as typeof fetch;

    await expect(
      service.getInventoryProxy({ limit: 1 }),
    ).rejects.toBeInstanceOf(BadGatewayException);
  });
});
