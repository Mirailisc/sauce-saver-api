import { Injectable } from '@nestjs/common';
import { Categories, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async categories(): Promise<Categories[]> {
    return this.prisma.categories.findMany();
  }

  async createCategory(
    data: Prisma.CategoriesCreateInput,
  ): Promise<Categories> {
    return this.prisma.categories.create({ data });
  }

  async deleteCategory(
    where: Prisma.CategoriesWhereUniqueInput,
  ): Promise<Categories> {
    return this.prisma.categories.delete({ where });
  }

  async updateCategory(
    where: Prisma.CategoriesWhereUniqueInput,
    data: Prisma.CategoriesUpdateInput,
  ): Promise<Categories> {
    return this.prisma.categories.update({ where, data });
  }
}
