import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  model_id: string;

  @Column()
  @Field()
  device_status_id: string;

  @Column()
  @Field(type=> Boolean)
  is_available: boolean;

  @Column()
  @Field()
  qr_code: string;

  @Column(()=> Dates)
  date: Dates
}
