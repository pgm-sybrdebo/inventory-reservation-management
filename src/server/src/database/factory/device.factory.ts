import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Device } from 'src/devices/entities/device.entity';
import { Model } from 'src/models/entities/model.entity';
import { DeviceStatus } from 'src/device-statuses/entities/device-status.entity';
import { User } from 'src/users/entities/user.entity';

interface Context {
  id: string;
  device_statuses: DeviceStatus[];
}

define(Device, (faker: typeof Faker, context: Context) => {
  // console.log("sup", context);
  const { id, device_statuses } = context;
  // console.log("id", id);
  // console.log("deviceStatus", device_statuses);
  const device = new Device();
  const deviceSt = device_statuses[faker.random.number({ min: 0, max: 3 })];
  // console.log("device", deviceSt);
  device.modelId = id;
  // 70% chance for no current user
  const boolean = Math.random() < 0.7;
  device.user = boolean ? null : (factory(User)() as any);

  device.deviceStatus = deviceSt;
  device.qr_code = 'default_qr_code';
  return device;
});
