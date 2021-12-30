import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateDamageInput {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  deviceId: string;

  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  reservationId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  picture: string;
}
