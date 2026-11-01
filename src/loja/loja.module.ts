import { Module } from '@nestjs/common';
import { LojaService } from './loja.service.js';
import { LojaController } from './loja.controller.js';

@Module({
  controllers: [LojaController],
  providers: [LojaService],
})
export class LojaModule {}
