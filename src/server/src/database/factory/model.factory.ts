import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Model } from '../../models/entities/model.entity';
import MODELS from '../data/models.json';
import { Tag } from 'src/tags/entities/tag.entity';

let number = 0;
interface Context {
  tags: Tag[];
}

define(Model, (faker: typeof Faker, context: Context) => {
  const { tags } = context;
  const model = new Model();
  const copyTags = tags.slice(0);
  const newTags = copyTags.splice(
    faker.random.number({ min: 0, max: 4 }),
    faker.random.number({ min: 1, max: 4 }),
  );
  model.max_reservation_time = faker.random.number({ min: 1, max: 100 });
  model.name = MODELS[number].Name;
  model.description = faker.lorem.sentence();
  model.quantity = MODELS[number].quantity;
  model.brand = faker.lorem.word();
  model.specifications =
    '{"numberOfCores":4,"RAM":"2GB","size":"3.35 x 2.2 (85mm x 56mm)"}';
  model.tags = newTags;
  number++;
  return model;
});
