
let token;

describe('Cadastro de Usuários', () => {

    beforeEach('Preparando Intercepts', () => {
      cy.setupIntercept()
    });

    
    it('Validando User', () => {
        const userData = {
          "name": "name",
          "email": "altenhofen2@gmail.com",
          "password": "P4ssword!",
          "birthDate": "2003-09-18",
          "gender": "Masculino",
          "cpf": "159.753.258-42",
          "phone": "46991077717",
        };
  
        cy.request({
          method: 'POST',
          url: 'http://localhost:8025/users',
          body: userData
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
    });
    
    it('Validando Login', () => {
        const userData = {
            "email": "altenhofen2@gmail.com",
            "password": "P4ssword!"
        };

        cy.request({
          method: 'POST',
          url: 'http://localhost:8025/login',
          body: userData
        }).then((response) => {
            expect(response.status).to.eq(200);
            token = response.body.token;
            console.log(token);
        });
      });   

    it('Validando Categories', () => {
        const userData = {
            "name": "Outside Vehicle",
            "type": "OUTSIDE_VEHICLE"
        };
    
        cy.request({
            method: 'POST',
            url: 'http://localhost:8025/categories',
            headers: { 'Authorization': `Bearer ${token}`},
            body: userData
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });

    it('Validando Products', () => {
        const userData = {
            "name": "Product 1",
            "description": "Description of Product 1",
            "price": 99.99,
            "discount": 0.1,
            "image_name": "http://localhost:9000/commons/produto51.jpg",
            "content_type": "image/jpeg",
            "category": {
                "id": 1
            }
        };
    
        cy.request({
            method: 'POST',
            url: 'http://localhost:8025/products',
            headers: { 'Authorization': `Bearer ${token}`},
            body: userData
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });

    it('Validando Address', () => {
        const userData = {
            "cep": "85501045",
            "street": "Rua Tapajós",
            "number": 104,
            "complement": "ap 1034",
            "district": "centro",
            "city": "Pato Branco",
            "state": "Paraná"
        };
        cy.request({
            method: 'POST',
            url: 'http://localhost:8025/address/auth',
            headers: { 'Authorization': `Bearer ${token}`},
            body: userData
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });

    it('Validando ShoppingCart', () => {
        const userData = {
            "dateTime": "2024-11-20T19:00:00",
            "payment": "APPROVED",
            "totalPurchase": 0.0,
            "address": {
                "id": 1
            },
            "shoppingCartProducts": [
                { "productId": 16, "quantity": 2 }
            ]
        };
    
        cy.request({
            method: 'POST',
            url: 'http://localhost:8025/shopping-cart',
            headers: { 'Authorization': `Bearer ${token}`},
            body: userData
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });
  });  