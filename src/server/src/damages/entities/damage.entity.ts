import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Damage {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  deviceId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  reservationId: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  picture: string;

  @Column(() => Dates)
  date: Dates;

  @ManyToOne(() => Reservation, (reservation) => reservation.damages, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Reservation)
  reservation: Reservation;

  @ManyToOne(() => Device, (device) => device.damages)
  @Field((type) => Device)
  device: Device;
}
