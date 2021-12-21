import { Model } from 'src/models/entities/model.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateModels implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Model)().createMany(10);
  }
}
