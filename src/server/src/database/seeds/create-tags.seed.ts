import { Tag } from 'src/tags/entities/tag.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateTags implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Tag)().createMany(5);
  }
}
