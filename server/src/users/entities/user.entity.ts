import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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

  @Column()
  @Field(type => Int)
  role: number;

  @Column({nullable: true})
  @Field(type => Int, {nullable: true})
  studentNumber?: number;

  @Column({nullable: true})
  @Field(type => Int, {nullable: true})
  lecturerNumber?: number;

  @Column(() => Dates)
  date: Dates
}
