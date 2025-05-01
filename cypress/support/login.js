const UsuariosAutoParts = {
    DEV: {
        MARCOS: {
            username: 'm.felipealt@gmail.com',
            password: 'P4ssword!',
            name: 'Marcos Felipe Altenhofen',
        },
        FELIPE: {
            username: 'altenhofen@gmail.com',
            password: 'P4ssword!',
            name: 'Felipe Altenhofen',
        },
        RODRIGO: {
            username: 'm.felipealt@gmail.com',
            password: 'P4ssword!',
            name: 'Marcos Felipe Altenhofen',
        }
    },
    PROD: {
        MARCOS: {
            username: 'm.felipealt@gmail.com',
            password: 'P4ssword!',
            name: 'Marcos Felipe Altenhofen',
        },
        RODRIGO: {
            username: 'm.felipealt@gmail.com',
            password: 'P4ssword!',
            name: 'Marcos Felipe Altenhofen',
        }
    }
}

function GetUsuario() {
    return UsuariosAutoParts[Cypress.env("AMBIENTE")][Cypress.env("USUARIO")];
}

Cypress.Commands.add('loginAutoParts', () => {

    cy.setupIntercept();

    // console.log(Cypress.env("AMBIENTE"));
    // console.log(Cypress.env("USUARIO"));

    const user = GetUsuario();
    // console.log(user.username);

    cy.session(
        user.username, () => {
            cy.visit(`/login`);

            cy.get(`#email`).type(user.username);
            cy.get(`#password`).type(user.password);

            cy.contains('button', 'Login').click();
            cy.wait(2000); // Aguarda 2 segundos para o login ser processado

            cy.wait('@postLogin').then((interception) => {
                assert.equal(interception.response.statusCode, 200);
            });
        },
        {
            validate: () => {   
                cy.url().then($url => {
                    cy.visit(`/login`);
                });
              },
            // O cache será mantido entre os testes, mas não entre os specs
            // Isso significa que o login será feito apenas uma vez por spec, mas não entre os specs
            cacheAcrossSpecs: true,
        }
    );
});