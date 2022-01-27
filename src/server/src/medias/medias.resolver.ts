import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MediasService } from './medias.service';
import { Media } from './entities/media.entity';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';

@Resolver(() => Media)
export class MediasResolver {
  constructor(private readonly mediasService: MediasService) {}

  @Mutation(() => Media)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  createMedia(@Args('createMediaInput') createMediaInput: CreateMediaInput) {
    return this.mediasService.create(createMediaInput);
  }

  @Query(() => [Media], { name: 'medias' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.mediasService.findAll();
  }

  @Query(() => Media, { name: 'media' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.mediasService.findOne(id);
  }

  @Query(() => Media, { name: 'mediaByModelId' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findFirstByModelId(@Args('modelId', new ParseUUIDPipe()) modelId: string) {
    return this.mediasService.findFirstByModelId(modelId);
  }

  @Mutation(() => Media)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  updateMedia(@Args('updateMediaInput') updateMediaInput: UpdateMediaInput) {
    return this.mediasService.update(updateMediaInput.id, updateMediaInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async removeMedia(@Args('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.mediasService.remove(id);
      return true;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Media)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  softRemoveMedia(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.mediasService.softRemove(id);
  }
}
