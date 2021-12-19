import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import JSON, { GraphQLJSONObject } from 'graphql-type-json';
import { Dates } from 'src/mixins/date.entity';

@Entity()
@ObjectType()
export class Model {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  reservation_time_id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field(type => Int)
  quantity: number;

  @Column()
  @Field()
  brand: string;

  @Column({type: 'json'})
  @Field(() => GraphQLJSONObject)
  specifications: JSON;

  // @Column()
  // @Field()
  // specifications: string;

  @Column(()=> Dates)
  date: Dates
}
