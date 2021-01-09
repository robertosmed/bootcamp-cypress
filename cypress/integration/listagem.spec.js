/// <reference types = "cypress" />

context('Listagem', () => {
    it('Listagem sem registro', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtable-get-vazio'
        }).as('getNewtable');

        cy.visit('WebTable.html');  

        cy.get('div[role=row]').should('have.length', 1);

    });

    it('Listagem com apenas um registro', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fixture:webtable-get-unico'
        })

        cy.visit('WebTable.html');  

        cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('grideCellPhone');
        cy.get('@grideCellPhone').should('contain.text', '1254317442')

    });
});