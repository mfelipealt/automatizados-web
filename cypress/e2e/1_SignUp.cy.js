describe('Cadastro de Usuários', () => {

    beforeEach('Acessando página', () => {
      cy.intercept('POST', '/users').as('postUsers');
      cy.visit('http://localhost:5173/cadastrar');
      cy.contains('button', 'Cadastrar').click();
      cy.wait('@postUsers');
    });

    it('Validando Feedbacks', () => {
      cy.get('#name').next().should('have.text', 'não deve estar vazio');
      cy.get('#cpf').next().should('have.text', 'não deve estar vazio');
      cy.get('#phone').next().should('have.text', 'não deve estar vazio');
      cy.get('#birthDate').next().should('have.text', 'O campo Data de Nascimento não pode ser nulo');
      cy.contains('div', 'Erro ao cadastrar o usuário!').should('be.visible');
    }); 
    
    it('Criar Usuário', () => {
      cy.get('#name').type('Felipe Altenhofen');
      cy.get('#email').type('altenhofen@gmail.com');
      cy.get('#password').type('P4ssword!');
      cy.get('#passwordConfirm').type('P4ssword!');
      cy.get('#cpf').type('12345678901');
      cy.get('#phone').type('44999998888');
      cy.get('select[name=gender]').select('male');
      cy.get('#birthDate').type('1990-01-01');
      cy.contains('button', 'Cadastrar').click();
      cy.wait('@postUsers');
      cy.contains('div', 'Cadastro realizado com sucesso!').should('be.visible');
    });     
  });  