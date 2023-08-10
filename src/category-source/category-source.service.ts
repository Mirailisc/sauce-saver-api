import { Injectable } from '@nestjs/common'
import { CategoryOnSource } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategorySourceService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CategoryOnSource[]> {
    return this.prisma.categoryOnSource.findMany({
      include: {
        category: true,
        source: true,
      },
    })
  }

  async findCategoriesFromSource(id: number): Promise<CategoryOnSource[]> {
    return this.prisma.categoryOnSource.findMany({
      where: {
        sourceId: id,
      },
      include: {
        category: true,
        source: true,
      },
    })
  }
}
