generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // <--- Adicione esta linha!
}

export interface CreateClienteDto{

    nome:           string;
    email:          string;
    saldoInicial:   number;
    cpf:            string;
    endereco:       string;
    telefone:       string;

}

export interface RealizarPedido{

    clienteId:      number;
    itens:{
        produtosId:         number;
        quantidade:         number;
    }[];
    
}