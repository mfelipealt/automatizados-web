const { AdicionarProdutosCarrinho } = require("./comandos");
const { DadosCarrinho } = require("./dados");

describe(`Carrinho de Compras - Incluir`, () => {

  beforeEach(function () {
    cy.loginAutoParts();
    cy.setupIntercept();
  });

  it(`Incluir`, () => {
    AdicionarProdutosCarrinho(DadosCarrinho);
  });
});


