import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@ObjectType()
export class Dates {

  @Column({nullable: true})
  @Field({nullable: true})
  created_on?: Date;

  @Column({nullable: true})
  @Field({nullable: true})
  modified_on?: Date;

  @Column({nullable: true})
  @Field({nullable: true})
  deleted_on?: Date;
}
