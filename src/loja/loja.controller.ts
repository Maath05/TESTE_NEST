// 3. Camada de Rotas HTTP (loja.controller.ts)
import { Controller, Get, Post, Body } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CriarClienteDto, RealizarPedidoDto } from './loja.dto';

@Controller('loja')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Get('produtos')
  async verCatalogo() {
    return await this.lojaService.listarProdutosEmEstoque();
  }

  @Post('clientes')
  async registrarCliente(@Body() corpoDaRequisicao: CriarClienteDto) {
    return await this.lojaService.cadastrarCliente(corpoDaRequisicao);
  }

  @Post('pedidos')
  async comprar(@Body() dadosDaCompra: RealizarPedidoDto) {
    return await this.lojaService.fecharPedido(dadosDaCompra);
  }
}