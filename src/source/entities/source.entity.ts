import { ObjectType, Field } from '@nestjs/graphql';
import { Categories } from '@prisma/client';
import { Category } from 'src/categories/entities/category.entity';

@ObjectType()
export class Source {
  @Field(() => String)
  id: string;

  @Field()
  source_name: string;

  @Field({ nullable: true })
  source_number?: number;

  @Field()
  url: string;

  @Field(() => Category, { nullable: false })
  categories: Categories[];

  @Field(() => Date)
  createdAt: Date;
}
