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
    const tags  =  await factory(Tag)().createMany(5);
    const device_statuses = await factory(DeviceStatus)().createMany(4);
    const reservation_states = await factory(ReservationState)().createMany(3);
    const models = await factory(Model)({tags}).createMany(4); // 90
    console.log("models", models);
    let devs = [];

    for (const mod of models) {
      const { id, quantity } = mod;

      const dev = await factory(Device)({id, device_statuses}).createMany(quantity);
        //  console.log("lenght", dev.length);
        //  console.log("dev",dev);
      if (dev.length > 1) {
        for (let i = 0; i < dev.length; i++) {
          devs.push(dev[i]);
        }
      } else {
        devs.push(dev[0]);
      }

      // if (typeof(dev) === "object") {
      //   console.log("obj!!!!!!!!");
      //   console.log("lenght", dev.length);
      //   devs.push(dev[0]);
      // } else {
      //   console.log("arrrrrrr");
      //   devs = devs.concat(dev);
      // }
      // console.log(dev);
      await factory(Media)({id}).create();
    }

    // console.log("devs", devs);

    for (const d of devs) {
      const { id } = d;

      const reserv = await factory(Reservation)({id, reservation_states}).createMany(2);
      // console.log("reserv", reserv);
      // await factory(Damage)({id, reserv}).create();
    }

  }
}
