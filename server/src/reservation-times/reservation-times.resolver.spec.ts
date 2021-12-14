import { Test, TestingModule } from '@nestjs/testing';
import { ReservationTimesResolver } from './reservation-times.resolver';
import { ReservationTimesService } from './reservation-times.service';

describe('ReservationTimesResolver', () => {
  let resolver: ReservationTimesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationTimesResolver, ReservationTimesService],
    }).compile();

    resolver = module.get<ReservationTimesResolver>(ReservationTimesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
