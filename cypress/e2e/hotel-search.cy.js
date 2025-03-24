describe('Hotel Search', () => {
  it('should search for hotels in New York', () => {
    cy.visit('https://www.booking.com');
    cy.get('#search-bar').type('New York');
    cy.get('#checkin').click();
    cy.get('.date').contains('2025-04-01').click();
    cy.get('#checkout').click();
    cy.get('.date').contains('2025-04-10').click();
    cy.get('#search-button').click();
    cy.get('.results').should('contain.text', 'New York');
  });
});