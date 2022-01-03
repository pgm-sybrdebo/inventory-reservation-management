import { Module } from '@nestjs/common';
import { DamagesService } from './damages.service';
import { DamagesResolver } from './damages.resolver';
import { Damage } from './entities/damage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Damage])],
  providers: [DamagesResolver, DamagesService],
  exports: [DamagesService]
})
export class DamagesModule {}
