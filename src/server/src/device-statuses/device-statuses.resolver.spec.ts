import { Test, TestingModule } from '@nestjs/testing';
import { DeviceStatusesResolver } from './device-statuses.resolver';
import { DeviceStatusesService } from './device-statuses.service';

describe('DeviceStatusesResolver', () => {
  let resolver: DeviceStatusesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceStatusesResolver, DeviceStatusesService],
    }).compile();

    resolver = module.get<DeviceStatusesResolver>(DeviceStatusesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
