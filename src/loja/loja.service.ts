// 2. Camada de Regras de Negócio (loja.service.ts)
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CriarClienteDto, RealizarPedidoDto } from './loja.dto';

@Injectable()
export class LojaService {
  constructor(private prisma: PrismaService) {}

  async cadastrarCliente(dados: CriarClienteDto) {
    return await this.prisma.cliente.create({
      data: {
        nome: dados.nome,
        email: dados.email,
        carteira: dados.saldoInicial,
        perfil: {
          create: {
            cpf: dados.cpf,
            endereco: dados.endereco,
            telefone: dados.telefone,
          },
        },
      },
      include: { perfil: true },
    });
  }

  async listarProdutosEmEstoque() {
    return await this.prisma.produto.findMany({
      where: { estoque: { gt: 0 } },
      include: { categoria: true },
      orderBy: { preco: 'asc' },
    });
  }

  async fecharPedido(dados: RealizarPedidoDto) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: dados.clienteId },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado no sistema.');
    }

    let valorTotalDoPedido = 0;

    for (const item of dados.itens) {
      const produtoNoBanco = await this.prisma.produto.findUnique({
        where: { id: item.produtoId },
      });

      if (!produtoNoBanco || produtoNoBanco.estoque < item.quantidade) {
        throw new BadRequestException(`Estoque insuficiente para o produto ID ${item.produtoId}`);
      }

      valorTotalDoPedido += produtoNoBanco.preco * item.quantidade;
    }

    if (cliente.carteira < valorTotalDoPedido) {
      throw new BadRequestException('Saldo insuficiente na carteira.');
    }

    await this.prisma.cliente.update({
      where: { id: cliente.id },
      data: { carteira: cliente.carteira - valorTotalDoPedido },
    });

    return await this.prisma.pedido.create({
      data: {
        clienteId: cliente.id,
        valorTotal: valorTotalDoPedido,
        status: 'FINALIZADO',
      },
    });
  }
}