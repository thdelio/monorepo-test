import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from '../../../../../src/app/modules/inventory/controllers/inventory.controller';
import { InventoryService } from '../../../../../src/app/modules/inventory/services/inventory.service';

describe('InventoryController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [InventoryService],
    }).compile();
  });

  it('should return inventory items from service', () => {
    const controller = app.get<InventoryController>(InventoryController);
    expect(controller.getInventoryItems({ limit: 2 })).toEqual({
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
