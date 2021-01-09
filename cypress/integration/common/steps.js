// steps /passos comuns a mais de uma features

Given(/^que acessa o site$/, () => {
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
});

