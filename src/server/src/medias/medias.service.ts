import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { Media } from './entities/media.entity';

@Injectable()
export class MediasService {
  constructor(
    @InjectRepository(Media) private mediasRepository: Repository<Media>,
  ) {}

  create(createMediaInput: CreateMediaInput): Promise<Media> {
    const newMedia = this.mediasRepository.create(createMediaInput);

    return this.mediasRepository.save(newMedia);
  }

  findAll(): Promise<Media[]> {
    return this.mediasRepository.find();
  }

  findAllByModelId(modelId: string): Promise<Media[]> {
    return this.mediasRepository.find({ modelId });
  }

  findOne(id: string): Promise<Media> {
    return this.mediasRepository.findOneOrFail(id);
  }

  findFirstByModelId(modelId: string): Promise<Media> {
    return this.mediasRepository.findOne({
      where: {
        modelId: modelId,
      },
    });
  }

  async update(id: string, updateMediaInput: UpdateMediaInput): Promise<Media> {
    const updatedMedia = await this.mediasRepository.preload({
      id: id,
      ...updateMediaInput,
    });

    return this.mediasRepository.save(updatedMedia);
  }

  async remove(id: string): Promise<Media> {
    const media = await this.findOne(id);
    return this.mediasRepository.remove(media);
  }

  async softRemove(id: string): Promise<Media> {
    const media = await this.findOne(id);
    return this.mediasRepository.softRemove(media);
  }
}
