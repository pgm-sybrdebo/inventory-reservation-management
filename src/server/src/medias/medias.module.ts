import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasResolver } from './medias.resolver';
import { Model } from 'src/models/entities/model.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [MediasResolver, MediasService],
  exports: [MediasService]
})
export class MediasModule {}
