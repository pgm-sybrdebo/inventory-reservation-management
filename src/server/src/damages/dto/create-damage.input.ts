import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateDamageInput {
  @IsNotEmpty()
  @IsUUID('all')
  @Field()
  deviceId: string;

  @IsOptional()
  @IsUUID('all')
  @Field({ nullable: true })
  reservationId?: string;

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
