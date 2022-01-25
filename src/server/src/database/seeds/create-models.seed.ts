import { Model } from 'src/models/entities/model.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Tag } from 'src/tags/entities/tag.entity';
import { DeviceStatus } from 'src/device-statuses/entities/device-status.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Media } from 'src/medias/entities/media.entity';
import { ReservationState } from 'src/reservation-states/entities/reservation-state.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Damage } from 'src/damages/entities/damage.entity';

export default class CreateModels implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const tags = await factory(Tag)().createMany(5);
    const device_statuses = await factory(DeviceStatus)().createMany(4);
    const reservation_states = await factory(ReservationState)().createMany(3);
    const models = await factory(Model)({ tags }).createMany(90); // 90
    const devs = [];

    for (const mod of models) {
      const { id, quantity } = mod;

      const dev = await factory(Device)({ id, device_statuses }).createMany(
        quantity,
      );
      if (dev.length > 1) {
        for (let i = 0; i < dev.length; i++) {
          devs.push(dev[i]);
        }
      } else {
        devs.push(dev[0]);
      }
      await factory(Media)({ id }).create();
    }

    for (const d of devs) {
      const { id, userId } = d;

      const reserv = await factory(Reservation)({
        id,
        reservation_states,
        userId,
      }).createMany(userId ? 1 : 2);
      const reservId = reserv[0].id;
      await factory(Damage)({ id, reservId }).create();
    }
  }
}

// yarn seed:run -s CreateModels
