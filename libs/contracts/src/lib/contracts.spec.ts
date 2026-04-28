import {
  inventoryItemsResponseSchema,
  inventoryListQuerySchema,
  webInventoryProxyResponseSchema,
} from './contracts.js';

describe('contracts', () => {
  it('should parse default query values', () => {
    expect(inventoryListQuerySchema.parse({})).toEqual({ limit: 5 });
  });

  it('should validate inventory responses', () => {
    const inventoryPayload = {
      source: 'api-inventory',
      generatedAt: new Date().toISOString(),
      items: [{ id: 1, sku: 'SKU-1', name: 'Item 1', stock: 10 }],
    };

    const parsedInventory =
      inventoryItemsResponseSchema.parse(inventoryPayload);
    expect(parsedInventory.items).toHaveLength(1);

    const parsedProxy = webInventoryProxyResponseSchema.parse({
      source: 'api-web',
      inventory: inventoryPayload,
    });

    expect(parsedProxy.inventory.source).toBe('api-inventory');
  });
});
