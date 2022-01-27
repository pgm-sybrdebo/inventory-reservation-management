import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Damage } from 'src/damages/entities/damage.entity';


interface Context {
  id: string;
  reservId: string;
}

define(Damage, (faker: typeof Faker, context: Context) => {
  const { id, reservId } = context;
  const damage = new Damage();
  damage.deviceId = id;
  damage.reservationId = reservId;
  damage.title = faker.lorem.word();
  damage.description = faker.lorem.sentence();
  damage.picture = 'defaultDamageImage.jpeg';
  return damage;
});
