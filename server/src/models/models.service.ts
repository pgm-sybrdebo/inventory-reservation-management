import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';
import { Model } from './entities/model.entity';

@Injectable()
export class ModelsService {
  constructor(@InjectRepository(Model) private modelsRepository: Repository<Model>){}

  create(createModelInput: CreateModelInput):Promise<Model> {
    const newModel = this.modelsRepository.create(createModelInput); 

    return this.modelsRepository.save(newModel); 
  }

  findAll():Promise<Model[]> {
    return this.modelsRepository.find();
  }

  findOne(id: string):Promise<Model> {
    return this.modelsRepository.findOneOrFail(id);
  }

  async update(id: string, updateModelInput: UpdateModelInput):Promise<Model> {
    const updatedModel = await this.modelsRepository.preload({
      id: id,
      ...updateModelInput,
    });

    return this.modelsRepository.save(updatedModel);
  }

  async remove(id: string):Promise<Model> {
    const model = await this.findOne(id);
    return this.modelsRepository.remove(model);
  }
}
