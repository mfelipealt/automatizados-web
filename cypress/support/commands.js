
Cypress.Commands.add("setupIntercept", () => {
    cy.intercept('POST', '/login').as('postLogin');
    cy.intercept('POST', '/users').as('postUsers');
    cy.intercept('POST', '/categories').as('postCategories');
    cy.intercept('POST', '/products').as('postProducts');
    cy.intercept('POST', '/shopping-cart').as('postShoppingCart');
    cy.intercept('POST', '/cart-list').as('postCartList');

    cy.intercept('GET', '/login').as('getLogin');
    cy.intercept('GET', '/products').as('getProducts');
    cy.intercept('GET', '/checkout').as('getCheckout');
    cy.intercept('GET', '/user').as('getUser');
});

Cypress.Commands.add('adicionarProdutoAoCarrinho', (nomeProduto) => {
    cy.contains('h2', nomeProduto).parents('.chakra-card').find('button.chakra-button').last().scrollIntoView().click();
});