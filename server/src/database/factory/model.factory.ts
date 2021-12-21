import { define, factory } from "typeorm-seeding";
import * as Faker from 'faker';
import { Model } from "src/models/entities/model.entity";
import { ReservationTime } from "src/reservation-times/entities/reservation-time.entity";
import { Tag } from "src/tags/entities/tag.entity";


define(Model, (faker: typeof Faker) => { 
  const model = new Model();
  model.reservation_time_id = factory(ReservationTime)() as any;
  model.name = faker.commerce.productName();
  model.description = faker.lorem.sentence();
  model.quantity = faker.datatype.number({min: 1, max: 1000});
  model.brand = faker.lorem.word();
  model.specifications = "specifications ...";
  model.tags = factory(Tag)().makeMany(2) as any;
  return model;
});