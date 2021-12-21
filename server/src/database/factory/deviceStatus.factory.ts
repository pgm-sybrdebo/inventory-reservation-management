import { define, factory } from "typeorm-seeding";
import * as Faker from 'faker';
import { DeviceStatus } from "src/device-statuses/entities/device-status.entity";

const deviceStatuses = ['broken', 'stolen', 'ready', 'in check'];

define(DeviceStatus, (faker: typeof Faker) => { 
  const deviceStatus = new DeviceStatus();
  deviceStatus.name = deviceStatuses[faker.datatype.number({min: 0, max: 3})];
  return deviceStatus;
});