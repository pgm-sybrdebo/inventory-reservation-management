import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { User } from 'src/users/entities/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.email();
  user.password = 'wachtwoord';
  user.cardNumber = faker.random.number({ min: 1000000, max: 999999999 });
  user.role = faker.random.number({ min: 0, max: 2 });
  return user;
});