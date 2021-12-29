import { Test, TestingModule } from '@nestjs/testing';
import { DeviceStatusesService } from './device-statuses.service';

describe('DeviceStatusesService', () => {
  let service: DeviceStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceStatusesService],
    }).compile();

    service = module.get<DeviceStatusesService>(DeviceStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
