import { define, factory } from "typeorm-seeding";
import * as Faker from 'faker';
import { Device } from "src/devices/entities/device.entity";
import { Model } from "src/models/entities/model.entity";
import { DeviceStatus } from "src/device-statuses/entities/device-status.entity";

define(Device, (faker: typeof Faker) => { 
  const device = new Device();
  device.model_id = factory(Model)() as any;
  device.device_status_id = factory(DeviceStatus)() as any;
  device.is_available = faker.datatype.boolean();
  device.qr_code = 'string';
  return device;
});
