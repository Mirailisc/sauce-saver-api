import { Module } from '@nestjs/common'
import { CategorySourceService } from './category-source.service'
import { CategorySourceResolver } from './category-source.resolver'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  providers: [CategorySourceResolver, CategorySourceService, PrismaService],
})
export class CategorySourceModule {}
