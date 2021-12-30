import { Model } from 'src/models/entities/model.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Tag } from 'src/tags/entities/tag.entity';
import { DeviceStatus } from 'src/device-statuses/entities/device-status.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Media } from 'src/medias/entities/media.entity';

export default class CreateModels implements Seeder {

  public async run(factory: Factory, connection: Connection): Promise<any> {
    const tags  =  await factory(Tag)().createMany(5);
    const device_statuses = await factory(DeviceStatus)().createMany(4);
    const models = await factory(Model)({tags}).createMany(9); // 90

    for (const mod of models) {
      const { id, quantity } = mod;

      await factory(Device)({id, device_statuses}).createMany(quantity);
      await factory(Media)({id}).create();
    }

  }
}
