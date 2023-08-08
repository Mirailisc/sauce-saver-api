import { ObjectType, Field } from '@nestjs/graphql';
import { Source as PrismaSource } from '@prisma/client';
import { Category } from 'src/categories/entities/category.entity';
import { Source } from 'src/sources/entities/source.entity';

@ObjectType()
export class CategoryOnSource {
  @Field(() => [Source])
  source: PrismaSource;

  @Field(() => [Category])
  category: Category;
}
