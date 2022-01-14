import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
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


@InputType()
export class Filter {
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Field(() => [String], { nullable: 'itemsAndList' })
  tagIds?: string[];
}
