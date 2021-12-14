import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MediasService } from './medias.service';
import { Media } from './entities/media.entity';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Media)
export class MediasResolver {
  constructor(private readonly mediasService: MediasService) {}

  @Mutation(() => Media)
  createMedia(@Args('createMediaInput') createMediaInput: CreateMediaInput) {
    return this.mediasService.create(createMediaInput);
  }

  @Query(() => [Media], { name: 'medias' })
  findAll() {
    return this.mediasService.findAll();
  }

  @Query(() => Media, { name: 'media' })
  findOne(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.mediasService.findOne(id);
  }

  @Mutation(() => Media)
  updateMedia(@Args('updateMediaInput') updateMediaInput: UpdateMediaInput) {
    return this.mediasService.update(updateMediaInput.id, updateMediaInput);
  }

  @Mutation(() => Media)
  removeMedia(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.mediasService.remove(id);
  }
}
