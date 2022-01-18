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
import { Optional, ParseIntPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Media } from 'src/medias/entities/media.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';
import { Tag } from 'src/tags/entities/tag.entity';
import { Filter } from './dto/filter-model.input';
import { Total } from './dto/total';

@Resolver(() => Model)
export class ModelsResolver {
  constructor(private readonly modelsService: ModelsService) {}

  @Mutation(() => Model)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  createModel(@Args('createModelInput') createModelInput: CreateModelInput) {
    return this.modelsService.create(createModelInput);
  }

  @Query(() => Int, { name: 'totalModelsByName' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async totalModelsByName(
    @Args('name', { type: () => String }) name: string,
  ) {
    return this.modelsService.countWithName(name);
  }

  @Query(() => [Model], { name: 'models' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  findAll() {
    return this.modelsService.findAll();
  }

  @Query(() => [Model], { name: 'modelsByNameWithPagination' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAllByNameWithPagination(
    @Args('name', { type: () => String }) name: string,
    @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
    @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  ) {
    return this.modelsService.findAllByNameWithPagination(name, offset, limit);
  }

  @Query(() => [Model], { name: 'modelsWithPagination' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  findAllByPagination(
    @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
    @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  ) {
    return this.modelsService.findAllByPagination(offset, limit);
  }

  // @Query(() => [Model], { name: 'modelsByTagIdWithPagination' })
  // // @UseGuards(JwtAuthGuard, RolesGuard)
  // // @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  // findAllByTagId(
  //   @Args('tagIds', { type: () => [String] }) tagIds: string[],
  //   @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
  //   @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  // ) {
  //   return this.modelsService.findAllByTagIdsPagination(tagIds, offset, limit);
  // }

  @Query(() => [Model], { name: 'modelsByFilterWithPagination' })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  findAllByFilterWithPagination(
    @Args('filter') filter: Filter,
    @Args('offset', { type: () => Int }, new ParseIntPipe()) offset: number,
    @Args('limit', { type: () => Int }, new ParseIntPipe()) limit: number,
  ) {
    return this.modelsService.findAllByFilterWithPagination(filter, offset, limit);
  }

  // @Query(() => [Model], { name: 'modelsByTagId' })
  // // @UseGuards(JwtAuthGuard, RolesGuard)
  // // @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  // findAllByTagIdWithPagination(
  //   @Args('tagIds', { type: () => [String] }) tagIds: string[],
  // ) {
  //   return this.modelsService.findAllByTagIds(tagIds);
  // }

  @Query(() => Int, { name: 'totalModels' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async findTotal() {
    return this.modelsService.findAndCount();
  }


  @Query(() => [Total], { name: 'totalModelsWithFilter' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async findTotalWithFilter(
    @Args('filter') filter: Filter
    // @Optional()
    // @Args('tagIds', { type: () => [String] }) tagIds: string[], nullable: true
    // @Args({
    //   name: 'tagIds', 
    //   type: () =>  [String],
    //   nullable: true,
    // }
  ) {
    return this.modelsService.countWithFilter(filter);
  }

  @Query(() => Int, { name: 'differenceLastMonthModels' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async findDifferenceLastMonth() {
    return this.modelsService.findDifferenceLastMonth();
  }

  @Query(() => [Model], { name: 'recentModels' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async findRecentUsers(
    @Args('from', { type: () => String }) from: string,
    @Args('to', { type: () => String }) to: string,
  ) {
    return this.modelsService.findRecentModels(from, to);
  }

  @Query(() => Model, { name: 'model' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.SUPER_ADMIN)
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.modelsService.findOne(id);
  }

  @Mutation(() => Model)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  updateModel(@Args('updateModelInput') updateModelInput: UpdateModelInput) {
    return this.modelsService.update(updateModelInput.id, updateModelInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async removeModel(@Args('id', new ParseUUIDPipe()) id: string) { 
    try {
      await this.modelsService.remove(id);
      return true;
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => Model)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  softRemoveModel(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.modelsService.softRemove(id);
  }

  @Mutation(() => Model, { name: 'addModelToTag' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  addToTag(
    @Args('modelId', { type: () => String, nullable: false }) modelId: string,
    @Args('tagId', { type: () => String, nullable: false }) tagId: string,
  ) {
    return this.modelsService.addToTag(modelId, tagId);
  }

  @Mutation(() => Model, { name: 'removeModelFromTag' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
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

  @ResolveField((returns) => [Tag])
  tags(@Parent() model: Model): Promise<Tag[]> {
    return this.modelsService.getTagsByModelId(model.id);
  }
}
