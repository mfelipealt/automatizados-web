export const sUrlProdutos = `/products`;

export function AdicionarProdutosCarrinho(Dados){
  
  cy.visit(sUrlProdutos)
  cy.wait('@getProducts').its('response.statusCode').should('eq', 200);

  cy.contains('h2', Dados.Produto1.Nome).parent().parent().parent().next().next().children().children().next().click()

  cy.get('.chakra-alert__title').should('contain', 'Produto adicionado com sucesso ao carrinho').and('be.visible');

  cy.contains('h2', Dados.Produto2.Nome).parents(`[href="/product/${Dados.Produto2.Id}"]`).parent().next().next().children().within(() => {
    cy.contains('button', '+ Carrinho').click()
  });

  cy.contains('h2', Dados.Produto3.Nome)  // Localiza o título do Produto 8
  .parents('.chakra-card')       // Vai até o elemento pai, que contém o produto
  .find('button.chakra-button')  // Encontra todos os botões dentro desse produto
  .last()                        // Clica no último botão encontrado, que é o "+ Carrinho"
  .click();                      // Clica no botão


  cy.adicionarProdutoAoCarrinho(Dados.Produto4.Nome)
  
  cy.get('[data-testid="ShoppingCartIcon"]').should('be.visible').click()

  cy.contains('button', 'Finalizar Compra').click()

  cy.wait(1000)
  
  cy.contains('button', 'Finalizar Compra').click()

  cy.get('.chakra-alert__title').should('contain', 'Cadastre ao menos um endereço para continuar.').and('be.visible')

  cy.contains('p', 'Adicionar Endereço').parents('.css-fye358').find('svg[data-testid="AddBoxIcon"]').click() 
  cy.contains('label', 'CEP').siblings('div').find('input').type('85504600');     
  cy.contains('button', 'Buscar').click()
  cy.get('.chakra-alert__desc').should('contain', 'CEP encontrado com sucesso.').and('be.visible')
  cy.contains('label', 'Rua').siblings('input').should('have.value', 'Rua Vinícius Cadorin')
  cy.contains('label', 'Bairro').siblings('input').should('have.value', 'Cadorin')
  cy.contains('label', 'Cidade').siblings('input').should('have.value', 'Pato Branco')
  cy.contains('label', 'Estado').siblings('input').should('have.value', 'Paraná')
  cy.contains('label', 'Número').siblings('input').type('429')
  cy.contains('label', 'Complemento').siblings('input').type('Casa nmr 3')
  cy.contains('button', 'Salvar').click()
  cy.contains('button', 'Finalizar Compra').click()
  cy.get('.chakra-alert__title').should('contain', 'Compra finalizada com sucesso!').and('be.visible')
}