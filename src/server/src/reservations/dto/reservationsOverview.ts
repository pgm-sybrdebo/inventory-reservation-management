import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Damage } from 'src/damages/entities/damage.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Dates } from 'src/mixins/date.entity';
import { ReservationState } from 'src/reservation-states/entities/reservation-state.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
export class ReservationsOverview {
  @Field()
  month: string;

  @Field()
  total_reservations: number;
}
