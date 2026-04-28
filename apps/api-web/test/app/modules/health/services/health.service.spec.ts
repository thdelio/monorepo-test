import { HealthService } from '../../../../../src/app/modules/health/services/health.service';

describe('HealthService', () => {
  it('should return health payload', () => {
    const service = new HealthService();
    expect(service.getData()).toEqual({ message: 'Hello API' });
  });
});
