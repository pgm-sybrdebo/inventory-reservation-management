import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Damage } from 'src/damages/entities/damage.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Dates } from 'src/mixins/date.entity';
import { ReservationState } from 'src/reservation-states/entities/reservation-state.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  deviceId: string;

  @Column()
  @Field()
  reservationStateId: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  start_date: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  end_date: Date;

  // @Column(() => Dates)
  // date: Dates;

  @CreateDateColumn()
  @Field()
  created_on: Date;

  @UpdateDateColumn()
  @Field()
  updated_on: Date;

  @DeleteDateColumn()
  @Field()
  deleted_on: Date;

  @ManyToOne(() => User, (user) => user.reservations)
  @Field((type) => User)
  user: User;

  @ManyToOne(
    () => ReservationState,
    (reservationState) => reservationState.reservations,
  )
  @Field((type) => ReservationState)
  reservationState: ReservationState;

  @ManyToOne(() => Device, (device) => device.reservations)
  @Field((type) => Device)
  device: Device;

  @OneToMany(() => Damage, (damage) => damage.reservation)
  @Field((type) => [Damage], { nullable: true })
  damages?: Damage[];
}
