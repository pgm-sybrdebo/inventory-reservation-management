import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { Model } from 'src/models/entities/model.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

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

  @ManyToMany(() => Model, (model) => model.tags)
  @Field(() => [Model], { nullable: true })
  models: Model[];
}
