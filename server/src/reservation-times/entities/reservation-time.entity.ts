import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ReservationTime {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field(type=> Int)
  amount: number;

  @Column()
  @Field()
  name: string;

  @Column(()=> Dates)
  date: Dates
}
