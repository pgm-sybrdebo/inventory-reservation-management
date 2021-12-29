import { Test, TestingModule } from '@nestjs/testing';
import { ReservationTimesService } from './reservation-times.service';

describe('ReservationTimesService', () => {
  let service: ReservationTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationTimesService],
    }).compile();

    service = module.get<ReservationTimesService>(ReservationTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
