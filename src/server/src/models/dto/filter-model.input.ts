import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class Filter {
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Field(() => [String], { nullable: 'itemsAndList' })
  tagIds?: string[];
}
