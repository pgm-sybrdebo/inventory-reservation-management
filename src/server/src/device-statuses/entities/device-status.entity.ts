import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Device } from 'src/devices/entities/device.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class DeviceStatus {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @CreateDateColumn()
  @Field()
  created_on: Date;

  @UpdateDateColumn()
  @Field()
  updated_on: Date;

  @DeleteDateColumn()
  @Field()
  deleted_on: Date;

  @OneToMany(() => Device, (device) => device.deviceStatus)
  @Field((type) => [Device], { nullable: true })
  devices?: Device[];
}
