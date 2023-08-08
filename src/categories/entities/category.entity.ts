import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field()
  category_name: string;
}
