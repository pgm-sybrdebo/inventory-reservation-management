import { DeviceStatus } from 'src/device-statuses/entities/device-status.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateDeviceStatuses implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(DeviceStatus)().createMany(3);
  }
}
