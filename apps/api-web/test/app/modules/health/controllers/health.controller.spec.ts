import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../../../../../src/app/modules/health/controllers/health.controller';
import { HealthService } from '../../../../../src/app/modules/health/services/health.service';

describe('HealthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();
  });

  it('should return health payload', () => {
    const controller = app.get<HealthController>(HealthController);
    expect(controller.getData()).toEqual({ message: 'Hello API' });
  });
});
