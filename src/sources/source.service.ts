import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSourceInput } from './dto/create-source.input';
import { UpdateSourceInput } from './dto/update-source.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Source as PrismaSource } from '@prisma/client';

@Injectable()
export class SourceService {
  constructor(private prisma: PrismaService) {}

  async create(createSourceInput: CreateSourceInput): Promise<PrismaSource> {
    const categories = [];

    const existSourceData: PrismaSource[] = await this.prisma.source.findMany({
      where: {
        source_name: createSourceInput.source_name,
        source_number: createSourceInput.source_number,
      },
    });

    if (existSourceData.length > 0) {
      throw new HttpException('Source is exists', HttpStatus.CONFLICT);
    }

    await Promise.all(
      createSourceInput.categories_id.map(async (id: number) => {
        const res = await this.prisma.category.findUnique({ where: { id } });
        categories.push(res);
      }),
    );

    const newSourceData = await this.prisma.source.create({
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
            sourceId: newSourceData.id,
          },
          include: {
            category: true,
            source: true,
          },
        });
      }),
    );

    return newSourceData;
  }

  async findAll(): Promise<PrismaSource[]> {
    return this.prisma.source.findMany();
  }

  async findOne(id: number): Promise<PrismaSource> {
    return this.prisma.source.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateSourceInput: UpdateSourceInput,
  ): Promise<PrismaSource> {
    const categories = [];

    await Promise.all(
      updateSourceInput.categories_id.map(async (id: number) => {
        const res = await this.prisma.category.findUnique({ where: { id } });
        categories.push(res);
      }),
    );

    await Promise.all(
      categories.map(async (category: Category) => {
        await this.prisma.categoryOnSource.updateMany({
          where: { sourceId: id },
          data: {
            categoryId: category.id,
          },
        });
      }),
    );

    return this.prisma.source.update({
      where: { id },
      data: updateSourceInput,
    });
  }

  async remove(id: number): Promise<PrismaSource> {
    await this.prisma.categoryOnSource.deleteMany({ where: { sourceId: id } });

    return this.prisma.source.delete({
      where: { id },
    });
  }
}
