describe('Cadastro de Usuários', () => {

  beforeEach('Acessando página', () => {
    cy.intercept('POST', '/login').as('postLogin');
    cy.visit('http://localhost:5173/login');
  });
  
  it('Login com erro', () => {
    cy.contains('label', 'Email:').next().type('altenhofen@gmail.com');
    cy.contains('label', 'Senha:').next().type('123456');
    cy.contains('button', 'Login').click();
    cy.wait('@postLogin').then((interception) => {
      assert.equal(interception.response.statusCode, 401);
    }); 
  });  

  it('Login com sucesso', () => {
    cy.contains('label', 'Email:').next().type('altenhofen@gmail.com');
    cy.contains('label', 'Senha:').next().type('P4ssword!');
    cy.contains('button', 'Login').click();
    cy.wait('@postLogin').then((interception) => {
      assert.equal(interception.response.statusCode, 200);
    }); 
  }); 
  
});  