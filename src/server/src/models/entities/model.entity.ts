import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import JSON, { GraphQLJSONObject } from 'graphql-type-json';
import { Dates } from 'src/mixins/date.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Media } from 'src/medias/entities/media.entity';
import { ReservationTime } from 'src/reservation-times/entities/reservation-time.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { type } from 'os';

@Entity()
@ObjectType()
export class Model {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  // @Column()
  // @Field()
  // reservation_time_id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field((type) => Int)
  quantity: number;
  
  @Column({nullable: true})
  @Field((type) => Int, {nullable: true})
  readyQuantity?: number;

  @Column()
  @Field()
  brand: string;

  // @Column({type: 'json'})
  // @Field(() => GraphQLJSONObject)
  // specifications: JSON;

  @Column()
  @Field()
  specifications: string;

  @Column()
  @Field((type) => Int)
  max_reservation_time: number;

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

  @OneToMany(() => Device, (device) => device.model)
  @Field((type) => [Device], { nullable: true })
  devices?: Device[];

  @OneToMany(() => Media, (media) => media.model, {cascade: true})
  @Field((type) => [Media], { nullable: true })
  medias?: Media[];

  // @ManyToOne(() => ReservationTime, (reservationTime) => reservationTime.models)
  // @Field((type) => ReservationTime)
  // reservationTime: ReservationTime;

  @ManyToMany(() => Tag, (tag) => tag.models, { cascade: true })
  @Field(() => [Tag], { nullable: true })
  @JoinTable({
    name: 'model_tag', // table name for the junction table of this relation
    joinColumn: {
      name: 'model_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];
}
