import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsResolver } from './models.resolver';
import { Model } from './entities/model.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Model]), TagsModule],
  providers: [ModelsResolver, ModelsService]
})
export class ModelsModule {}
