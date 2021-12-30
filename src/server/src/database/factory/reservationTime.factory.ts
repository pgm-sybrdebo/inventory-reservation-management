import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { ReservationTime } from 'src/reservation-times/entities/reservation-time.entity';

define(ReservationTime, (faker: typeof Faker) => {
  const reservationTime = new ReservationTime();
  reservationTime.amount = faker.random.number({min: 1, max: 30});
  reservationTime.name = faker.lorem.word();
  return reservationTime;
});
