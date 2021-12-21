import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
export class Dates {
  // @Column({nullable: true})
  // @Field({nullable: true})
  // created_on?: Date;

  // @Column({nullable: true})
  // @Field({nullable: true})
  // modified_on?: Date;

  // @Column({nullable: true})
  // @Field({nullable: true})
  // deleted_on?: Date;

  @CreateDateColumn()
  @Field()
  created_on: Date;

  @UpdateDateColumn()
  @Field()
  updated_on: Date;

  @DeleteDateColumn()
  @Field()
  deleted_on: Date;
}
