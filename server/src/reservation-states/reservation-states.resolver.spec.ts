import { Test, TestingModule } from '@nestjs/testing';
import { ReservationStatesResolver } from './reservation-states.resolver';
import { ReservationStatesService } from './reservation-states.service';

describe('ReservationStatesResolver', () => {
  let resolver: ReservationStatesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationStatesResolver, ReservationStatesService],
    }).compile();

    resolver = module.get<ReservationStatesResolver>(ReservationStatesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
