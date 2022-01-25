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
import { Device } from 'src/devices/entities/device.entity';
import { Media } from 'src/medias/entities/media.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Entity()
@ObjectType()
export class Model {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field((type) => Int)
  quantity: number;

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  readyQuantity?: number;

  @Column()
  @Field()
  brand: string;

  @Column()
  @Field()
  specifications: string;

  @Column()
  @Field((type) => Int)
  max_reservation_time: number;

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

  @OneToMany(() => Media, (media) => media.model, { cascade: true })
  @Field((type) => [Media], { nullable: true })
  medias?: Media[];

  @ManyToMany(() => Tag, (tag) => tag.models, { cascade: true })
  @Field(() => [Tag], { nullable: true })
  @JoinTable({
    name: 'model_tag',
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
