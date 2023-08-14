class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: 3.00,
      chantily: 1.50,
      suco: 6.20,
      sanduiche: 6.50,
      queijo: 2.00,
      salgado: 7.25,
      combo1: 9.50,
      combo2: 7.50,
    };
    this.descontos = {
      dinheiro: 0.05,
      credito: 0.03,
    };
    this.principaisParaExtras = {
      chantily: 'cafe',
      queijo: 'sanduiche',
    };
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!['debito', 'credito', 'dinheiro'].includes(formaDePagamento)) {
      return 'Forma de pagamento inválida!';
    }

    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    let total = 0;
    const itemQuantities = {};

    for (const itemInfo of itens) {
      const [item, quantidade] = itemInfo.split(',');

      if (!this.cardapio.hasOwnProperty(item)) {
        return 'Item inválido!';
      }

      if (!itemQuantities[item]) {
        itemQuantities[item] = parseInt(quantidade);
      } else {
        itemQuantities[item] += parseInt(quantidade);
      }

      total += this.cardapio[item] * parseInt(quantidade);
    }

    for (const item in itemQuantities) {
      if (this.principaisParaExtras[item] && itemQuantities[item] > 0) {
        const principal = this.principaisParaExtras[item];
        if (!itemQuantities[principal] || itemQuantities[principal] <= 0) {
          return 'Item extra não pode ser pedido sem o principal';
        }
      }
    }

    if (total === 0) {
      return 'Quantidade inválida!';
    }

    if (formaDePagamento === 'dinheiro') {
      total *= 1 - this.descontos.dinheiro;
    } else if (formaDePagamento === 'credito') {
      total *= 1 + this.descontos.credito;
    }

    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };


console.log(new CaixaDaLanchonete()
  .calcularValorDaCompra('debito', ['chantily,1']));