import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceResolver } from './source.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SourceResolver, SourceService, PrismaService],
})
export class SourceModule {}
