import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Tag } from 'src/tags/entities/tag.entity';

const types = ['audio', 'sensor', 'transport', 'cable', 'varia'];
let number = 0;

define(Tag, (faker: typeof Faker) => {
  const tag = new Tag();
  tag.name = types[number];
  number++;
  return tag;
});
