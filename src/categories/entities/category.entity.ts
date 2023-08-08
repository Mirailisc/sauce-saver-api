import { ObjectType, Field } from '@nestjs/graphql';
import { Source } from 'src/source/entities/source.entity';
import { Source as PrismaSource } from '@prisma/client';

@ObjectType()
export class Category {
  @Field(() => String)
  id: string;

  @Field()
  category_name: string;

  @Field(() => [Source], { nullable: true })
  source: PrismaSource[];
}
