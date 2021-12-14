import { Test, TestingModule } from '@nestjs/testing';
import { DamagesResolver } from './damages.resolver';
import { DamagesService } from './damages.service';

describe('DamagesResolver', () => {
  let resolver: DamagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DamagesResolver, DamagesService],
    }).compile();

    resolver = module.get<DamagesResolver>(DamagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
