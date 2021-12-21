import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';
import { Model } from './entities/model.entity';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model) private modelsRepository: Repository<Model>,
    private tagsService: TagsService,
  ) {}

  create(createModelInput: CreateModelInput): Promise<Model> {
    const newModel = this.modelsRepository.create(createModelInput);

    return this.modelsRepository.save(newModel);
  }

  findAll(): Promise<Model[]> {
    return this.modelsRepository.find();
  }

  findOne(id: string): Promise<Model> {
    return this.modelsRepository.findOneOrFail(id);
  }

  async update(id: string, updateModelInput: UpdateModelInput): Promise<Model> {
    const updatedModel = await this.modelsRepository.preload({
      id: id,
      ...updateModelInput,
    });

    return this.modelsRepository.save(updatedModel);
  }

  async remove(id: string): Promise<Model> {
    const model = await this.findOne(id);
    return this.modelsRepository.remove(model);
  }

  async addToTag(modelId: string, tagId: string): Promise<Model> {
    const foundModel = await this.modelsRepository.findOne(
      { id: modelId },
      { relations: ['tags'] },
    );
    const foundTag = await this.tagsService.findOne(tagId);

    if (foundModel && foundTag) {
      foundModel.tags = foundModel.tags
        ? [...foundModel.tags, foundTag]
        : [foundTag];

      return this.modelsRepository.save(foundModel);
    } else {
      throw new Error(`Founding model or tag problem`);
    }
  }

  async removeFromTag(modelId: string, tagId: string): Promise<Model> {
    const foundModel = await this.modelsRepository.findOne(
      { id: modelId },
      { relations: ['tags'] },
    );
    const foundTag = await this.tagsService.findOne(tagId);

    if (foundModel && foundTag) {
      foundModel.tags = foundModel.tags
        ? [...foundModel.tags.filter((f) => f.id != tagId)]
        : [];

      return this.modelsRepository.save(foundModel);
    } else {
      throw new Error(`Founding model or tag problem`);
    }
  }
}
