import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Damage } from 'src/damages/entities/damage.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';

define(Damage, (faker: typeof Faker) => {
  const damage = new Damage();
  damage.device_id = factory(Device)() as any;
  damage.reservation_id = factory(Reservation)() as any;
  damage.title = faker.lorem.word();
  damage.description = faker.lorem.sentence();
  damage.picture = 'defaultImage.jpeg';
  return damage;
});
