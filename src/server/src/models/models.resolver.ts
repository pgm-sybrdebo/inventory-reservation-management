import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ModelsService } from './models.service';
import { Model } from './entities/model.entity';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Media } from 'src/medias/entities/media.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';

@Resolver(() => Model)
export class ModelsResolver {
  constructor(private readonly modelsService: ModelsService) {}

  @Mutation(() => Model)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createModel(@Args('createModelInput') createModelInput: CreateModelInput) {
    return this.modelsService.create(createModelInput);
  }

  @Query(() => [Model], { name: 'models' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.modelsService.findAll();
  }

  @Query(() => Int, { name: 'totalModels' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findTotal() {
    return this.modelsService.findAndCount();
  }

  @Query(() => Int, { name: 'differenceLastMonthModels' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findDifferenceLastMonth() {
    return this.modelsService.findDifferenceLastMonth();
  }

  @Query(() => [Model], { name: 'recentModels' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findRecentUsers(@Args('from', { type: () => String }) from: string, @Args('to', { type: () => String }) to: string) {
    return this.modelsService.findRecentModels(from, to);
  }

  @Query(() => Model, { name: 'model' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.modelsService.findOne(id);
  }

  @Mutation(() => Model)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateModel(@Args('updateModelInput') updateModelInput: UpdateModelInput) {
    return this.modelsService.update(updateModelInput.id, updateModelInput);
  }

  @Mutation(() => Model)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeModel(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.modelsService.remove(id);
  }

  @Mutation(() => Model, { name: 'addModelToTag' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  addToTag(
    @Args('modelId', { type: () => String, nullable: false }) modelId: string,
    @Args('tagId', { type: () => String, nullable: false }) tagId: string,
  ) {
    return this.modelsService.addToTag(modelId, tagId);
  }

  @Mutation(() => Model, { name: 'removeModelFromTag' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeFromTag(
    @Args('modelId', { type: () => String, nullable: false }) modelId: string,
    @Args('tagId', { type: () => String, nullable: false }) tagId: string,
  ) {
    return this.modelsService.removeFromTag(modelId, tagId);
  }

  @ResolveField((returns) => [Media])
  medias(@Parent() model: Model): Promise<Media[]> {
    return this.modelsService.getMediasByModelId(model.id);
  }

  @ResolveField((returns) => [Device])
  devices(@Parent() model: Model): Promise<Device[]> {
    return this.modelsService.getDevicesByModelId(model.id);
  }
}
