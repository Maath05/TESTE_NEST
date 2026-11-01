

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