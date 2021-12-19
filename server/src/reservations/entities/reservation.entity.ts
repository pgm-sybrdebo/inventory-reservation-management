import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  device_id: string;

  @Column()
  @Field()
  reservation_state_id: string;

  @Column()
  @Field()
  user_id: string;

  @Column()
  @Field()
  start_date: Date;

  @Column()
  @Field()
  end_date: Date;

  @Column(()=> Dates)
  date: Dates
}
