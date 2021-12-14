import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ModelsService } from './models.service';
import { Model } from './entities/model.entity';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Model)
export class ModelsResolver {
  constructor(private readonly modelsService: ModelsService) {}

  @Mutation(() => Model)
  createModel(@Args('createModelInput') createModelInput: CreateModelInput) {
    return this.modelsService.create(createModelInput);
  }

  @Query(() => [Model], { name: 'models' })
  findAll() {
    return this.modelsService.findAll();
  }

  @Query(() => Model, { name: 'model' })
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.modelsService.findOne(id);
  }

  @Mutation(() => Model)
  updateModel(@Args('updateModelInput') updateModelInput: UpdateModelInput) {
    return this.modelsService.update(updateModelInput.id, updateModelInput);
  }

  @Mutation(() => Model)
  removeModel(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.modelsService.remove(id);
  }
}
