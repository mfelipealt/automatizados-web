
export const sUrlLogin = `/login`;

export function LoginSistema(Dados){
    cy.intercept('POST', '/login').as('postLogin');
    cy.visit(sUrlLogin);
    cy.contains('label', 'Email:').next().type(Dados.email);
    cy.contains('label', 'Senha:').next().type(Dados.senha);
    cy.contains('button', 'Login').click();
    cy.wait('@postLogin').then((interception) => {
        assert.equal(interception.response.statusCode, 200);
    }); 
}
