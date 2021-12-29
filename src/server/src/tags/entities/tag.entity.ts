import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { Model } from 'src/models/entities/model.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column(() => Dates)
  date: Dates;

  @ManyToMany(() => Model, (model) => model.tags)
  @Field(() => [Model], { nullable: true })
  models: Model[];
}
