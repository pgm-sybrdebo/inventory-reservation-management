import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsResolver } from './models.resolver';
import { Model } from './entities/model.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  providers: [ModelsResolver, ModelsService]
})
export class ModelsModule {}
