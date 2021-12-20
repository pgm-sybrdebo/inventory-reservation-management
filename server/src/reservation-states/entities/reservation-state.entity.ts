import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class ReservationState {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column(()=> Dates)
  date: Dates

  @OneToMany(() => Reservation, reservation => reservation.reservationState)
  @Field(type => [Reservation], { nullable: true })
  reservations?: Reservation[];
}
