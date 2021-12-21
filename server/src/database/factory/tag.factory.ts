import { define, factory } from "typeorm-seeding";
import * as Faker from 'faker';
import { Tag } from "src/tags/entities/tag.entity";

const types = ['jpeg', 'png', 'mp4'];

define(Tag, (faker: typeof Faker) => { 
  const tag = new Tag();
  tag.name = faker.lorem.word();
  return tag;
});