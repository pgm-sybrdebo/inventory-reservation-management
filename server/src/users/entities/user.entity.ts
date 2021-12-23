import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dates } from 'src/mixins/date.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

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
  @Field()
  role: number = 0;

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  cardNumber?: number;

  @Column(() => Dates)
  date: Dates;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  @Field((type) => [Reservation], { nullable: true })
  reservations?: Reservation[];
}
