
import { Reservation } from "src/reservations/entities/reservation.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateReservations implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Reservation)().createMany(10);
  }
}