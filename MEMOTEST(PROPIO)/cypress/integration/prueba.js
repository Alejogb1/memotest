const URL = '127.0.0.1:8080';

context("Memotest", () => {
    before(() =>  {
        cy.visit("http://www.google.com");
    });
})