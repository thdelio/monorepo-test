import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
