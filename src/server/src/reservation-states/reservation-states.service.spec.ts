import { Test, TestingModule } from '@nestjs/testing';
import { ReservationStatesService } from './reservation-states.service';

describe('ReservationStatesService', () => {
  let service: ReservationStatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationStatesService],
    }).compile();

    service = module.get<ReservationStatesService>(ReservationStatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
