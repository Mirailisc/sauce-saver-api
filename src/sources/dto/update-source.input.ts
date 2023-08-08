import { CreateSourceInput } from './create-source.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateSourceInput extends PartialType(CreateSourceInput) {
  @Field(() => Int)
  id: number;

  @Field()
  source_name: string;

  @Field(() => Int, { nullable: true })
  source_number?: number;

  @Field()
  url: string;

  @Field(() => [Int], { nullable: true })
  categories_id: number[];
}
