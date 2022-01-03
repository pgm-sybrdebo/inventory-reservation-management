import { forwardRef, Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsResolver } from './models.resolver';
import { Model } from './entities/model.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from 'src/tags/tags.module';
import { MediasModule } from 'src/medias/medias.module';
import { DevicesModule } from 'src/devices/devices.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Model]),
    TagsModule,
    MediasModule,
    forwardRef(() => DevicesModule),
  ],
  providers: [ModelsResolver, ModelsService],
  exports: [ModelsService],
})
export class ModelsModule {}
