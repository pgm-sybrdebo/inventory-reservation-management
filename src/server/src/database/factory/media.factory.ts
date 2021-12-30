import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Media } from 'src/medias/entities/media.entity';

const types = ['jpeg', 'png', 'mp4'];
interface Context {
  id: string
}

define(Media, (faker: typeof Faker, context: Context) => {
  const { id } = context;
  const media = new Media();
  media.modelId = id;
  media.type = 'jpeg';
  media.source = 'defaultImage.jpeg';
  return media;
});
