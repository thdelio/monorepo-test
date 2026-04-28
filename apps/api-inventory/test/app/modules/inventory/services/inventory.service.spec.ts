import { InventoryService } from '../../../../../src/app/modules/inventory/services/inventory.service';

describe('InventoryService', () => {
  it('should return inventory items', () => {
    const service = new InventoryService();

    expect(service.getInventoryItems({ limit: 2 })).toEqual({
      source: 'api-inventory',
      generatedAt: expect.any(String),
      items: [
        {
          id: 1,
          sku: 'INV-001',
          name: 'Producto 1',
          stock: 10,
        },
        {
          id: 2,
          sku: 'INV-002',
          name: 'Producto 2',
          stock: 20,
        },
      ],
    });
  });
});
