import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Device } from 'src/devices/entities/device.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../auth/role.enum';
import * as bcrypt from 'bcrypt';
@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  @Field()
  role: Role;

  @Column()
  @Field((type) => Int)
  profession: number;

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  cardNumber: number;

  @CreateDateColumn()
  @Field()
  created_on: Date;

  @UpdateDateColumn()
  @Field()
  updated_on: Date;

  @DeleteDateColumn()
  @Field()
  deleted_on: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  @Field((type) => [Reservation], { nullable: true })
  reservations?: Reservation[];

  @OneToMany(() => Device, (device) => device.user)
  @Field((type) => [Device], { nullable: true })
  devices?: Device[];

  // @BeforeInsert()
  // async setPassword(password: string) {
  //   const salt = await bcrypt.genSalt(10);
  //   this.password = await bcrypt.hash(password || this.password, salt);
  // }
}
