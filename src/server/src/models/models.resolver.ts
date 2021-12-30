import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ModelsService } from './models.service';
import { Model } from './entities/model.entity';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';
import { ParseUUIDPipe } from '@nestjs/common';
import { Media } from 'src/medias/entities/media.entity';
import { Device } from 'src/devices/entities/device.entity';

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

  @Mutation(() => Model, { name: 'addModelToTag' })
  addToTag(
    @Args('modelId', { type: () => String, nullable: false }) modelId: string,
    @Args('tagId', { type: () => String, nullable: false }) tagId: string,
  ) {
    return this.modelsService.addToTag(modelId, tagId);
  }
  @Mutation(() => Model, { name: 'removeModelFromTag' })
  removeFromTag(
    @Args('modelId', { type: () => String, nullable: false }) modelId: string,
    @Args('tagId', { type: () => String, nullable: false }) tagId: string,
  ) {
    return this.modelsService.removeFromTag(modelId, tagId);
  }

  @ResolveField(returns => [Media])
  medias(@Parent() model: Model): Promise<Media[]> {
    return this.modelsService.getMediasByModelId(model.id);
  }

  @ResolveField(returns => [Device])
  devices(@Parent() model: Model): Promise<Device[]> {
    return this.modelsService.getDevicesByModelId(model.id);
  }
}
