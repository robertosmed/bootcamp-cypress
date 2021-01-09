/// <reference types = "cypress" />


Given(/^que o site não possui registro$/, () => {
	cy.server()
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fx:webtable-get-vazio'
    }).as('getNewtable');
});

When(/^acessar a listagem$/, () => {
	cy.visit('WebTable.html'); 
});

Then(/^devo visualizar a listagem vazia$/, () => {
	cy.get('div[role=row]').should('have.length', 1);
});


Given(/^que o site possui apenas um registro$/, () => {
	cy.server()
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fixture:webtable-get-unico'
    })
});

Then(/^devo visualizar apenas um registro$/, () => {
	cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('grideCellPhone');
    cy.get('@grideCellPhone').should('contain.text', '1254317442')
});


