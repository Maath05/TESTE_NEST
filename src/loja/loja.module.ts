import { Module } from '@nestjs/common';
import { LojaController } from './loja.controller';
import { LojaService } from './loja.service';
import { PrismaModule } from '../prisma/prisma.module'; // Ou registre o PrismaService nos providers

@Module({
  imports: [PrismaModule], // Garante que o LojaService consiga usar o Prisma
  controllers: [LojaController],
  providers: [LojaService],
})
export class LojaModule {}