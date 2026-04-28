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

  it('should delegate inventory proxy lookup', () => {
    const controller = app.get<InventoryController>(InventoryController);
    const service = app.get<InventoryService>(InventoryService);
    const serviceSpy = jest
      .spyOn(service, 'getInventoryProxy')
      .mockResolvedValue({
        source: 'api-web',
        inventory: {
          source: 'api-inventory',
          generatedAt: new Date().toISOString(),
          items: [],
        },
      });

    const query = { limit: 2 };
    expect(controller.getInventoryProxy(query)).resolves.toEqual({
      source: 'api-web',
      inventory: expect.objectContaining({
        source: 'api-inventory',
        items: [],
      }),
    });
    expect(serviceSpy).toHaveBeenCalledWith(query);
  });
});
