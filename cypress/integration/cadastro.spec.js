/// <reference types = "cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', ()=>{
    it('cadastro de usuario no site', () => {
        // rotas
        //POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gD
        //POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3
        //GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5g
        cy.server();
        cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**').as('postNewtable');
        cy.route('POST','**/api/1/databases/userdetails/collections/usertable?**').as('postUsertable');
        cy.route('GET','**/api/1/databases/userdetails/collections/newtable?**').as('getNewtable');


        // baseUrl + Register.html
        cy.visit('Register.html');

       //type
       cy.get('input[placeholder="First Name"]').type(chance.first());
       cy.get('input[ng-model^=Last]').type(chance.last());
       cy.get('input[ng-model^=Email]').type(chance.email());
       cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false }));

       //check --> radio's e checkboxes
        cy.get('input[value=FeMale]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');

        // select--> select & select2 (combos)
        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Brazil');
        cy.get('select#country').select('Australia', { force: true });
        cy.get('select#yearbox').select('1994');
        cy.get('select[ng-model^=month]').select('December');
        cy.get('select#daybox').select('10');
        cy.get('input#firstpassword').type('R@berto2020');
        cy.get('input#secondpassword').type('R@berto2020');

        // attachFile--> input file
        cy.get('input#imagesrc').attachFile('Bug.jpg');
        // click
        cy.get('button#submitbtn').click();

        // comandos que interagem com as rotas por meio do apelidos que temos a essas rotas
        cy.wait('@postNewtable').then((resNewtable) => {
            // chai
            expect(resNewtable.status).to.eq(200)
        })

        cy.wait('@postUsertable').then((resUsertable) =>{
            expect(resUsertable.status).to.eq(200)
        })

        cy.wait('@getNewtable').then((resNewtable) =>{
            expect(resNewtable.status).to.eq(200)
        })

        cy.url().should('contain', 'WebTable');


    });
});

//elementos
//input[placeholder="First Name"]
//input[ng-model^=Last]
//input[ng-model^=Email]
//input[ng-model^=Phone]
//input[value=FeMale]
//input[type=checkbox]
//select#Skills
//'select#countries'
//select#country
//select#yearbox
//select[ng-model^=month]
//select#daybox
//input#firstpassword
//input#secondpassword
//input#imagesrc
//button#submitbtn