import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.email();
  user.password = bcrypt.hash('password', 10);
  user.cardNumber = faker.random.number({ min: 1000000, max: 999999999 });
  user.role = 0;
  user.profession = faker.random.number({min: 0, max: 1});
  return user;
});
