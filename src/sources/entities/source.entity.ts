import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Source {
  @Field(() => Int)
  id: string;

  @Field()
  source_name: string;

  @Field({ nullable: true })
  source_number?: number;

  @Field()
  url: string;

  @Field(() => Date)
  createdAt: Date;
}
