import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Device } from 'src/devices/entities/device.entity';
import { Dates } from 'src/mixins/date.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class DeviceStatus {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column(() => Dates)
  date: Dates;

  @OneToMany(() => Device, (device) => device.deviceStatus)
  @Field((type) => [Device], { nullable: true })
  devices?: Device[];
}
