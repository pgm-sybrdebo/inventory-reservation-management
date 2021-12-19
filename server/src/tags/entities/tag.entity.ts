import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column(()=> Dates)
  date: Dates
}
