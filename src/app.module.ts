import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { CategoriesModule } from './categories/categories.module'
import { SourceModule } from './sources/source.module'
import { CategorySourceModule } from './category-source/category-source.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
    CategoriesModule,
    SourceModule,
    CategorySourceModule,
  ],
})
export class AppModule {}
