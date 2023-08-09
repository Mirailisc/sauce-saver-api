import { Injectable } from '@nestjs/common';
import { CreateSourceInput } from './dto/create-source.input';
import { UpdateSourceInput } from './dto/update-source.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Source as PrismaSource } from '@prisma/client';

@Injectable()
export class SourceService {
  constructor(private prisma: PrismaService) {}

  async create(createSourceInput: CreateSourceInput): Promise<PrismaSource> {
    const categories = [];
    await Promise.all(
      createSourceInput.categories_id.map(async (id: number) => {
        const res = await this.prisma.category.findUnique({ where: { id } });
        categories.push(res);
      }),
    );

    console.log(categories);

    const sourceData = await this.prisma.source.create({
      data: {
        source_name: createSourceInput.source_name,
        source_number: createSourceInput.source_number,
        url: createSourceInput.url,
        createdAt: new Date(),
      },
    });

    await Promise.all(
      categories.map(async (category: Category) => {
        await this.prisma.categoryOnSource.create({
          data: {
            categoryId: category.id,
            sourceId: sourceData.id,
          },
          include: {
            category: true,
            source: true,
          },
        });
      }),
    );

    return sourceData;
  }

  findAll(): Promise<PrismaSource[]> {
    return this.prisma.source.findMany();
  }

  findOne(id: number): Promise<PrismaSource> {
    return this.prisma.source.findUnique({ where: { id } });
  }

  update(
    id: number,
    updateSourceInput: UpdateSourceInput,
  ): Promise<PrismaSource> {
    return this.prisma.source.update({
      where: { id },
      data: updateSourceInput,
    });
  }

  remove(id: number): Promise<PrismaSource> {
    return this.prisma.source.delete({
      where: { id },
    });
  }
}
