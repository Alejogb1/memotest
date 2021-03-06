/// <reference types="Cypress" />

const { parseHTML } = require("jquery");

//recuerden correr http-server primero!
const URL = '127.0.0.1:8080/MEMOTEST(PROPIO)';
const NUMERO_CUADROS = 12;

context('Memotest', () => {

  before(() => {
    cy.visit(URL);
  });

  it("Cuadros aleatorios?", () => {
    let clasesOriginales = [];
    cy.get(".cuadro").then((cuadros) =>  {
      cuadros.each(function(i, cuadro) {
        clasesOriginales.push(cuadro.className)
      })
    })
  

  cy.visit(URL);
  let clasesNuevas = [];
  cy.get(".cuadro").then((cuadros) =>  {
    cuadros.each(function(i, cuadro) {
      clasesNuevas.push(cuadro.className)
    })
  })
  
  cy.wrap(clasesOriginales).should("not.deep.equal", clasesNuevas)
  });
});

  describe("resuelve el juego", () => {
    let mapaDePares, listaDePares;

    it("elige una combinación errónea", () => {
      cy.get(".cuadro").then((cuadros) => {
        mapaDePares = obtenerParesDeCuadros(cuadros);
        listaDePares = Object.values(mapaDePares)
        cy.get(listaDePares[0][0].click())
        cy.get(listaDePares[0][1].click())
      })
    })

  it("resuelve el juego", () => {
    cy.get(".cuadro").should("have.length", NUMERO_CUADROS)
   
    listaDePares.forEach(par => {
      cy.get(par[0]).click();
      cy.get(par[1]).click();
    });

    cy.get(".cuadro").should("have.length", 0);

    cy.get(".tablero").should("not.be.visible");
    
    const numeroTurnos = NUMERO_CUADROS / 2 + 1 // Testeó 1 incorrecto

    cy.get("#fin-juego").
      should("be.visible").
      contains(
        "Fin del juego!"
      )
  })
});
function obtenerParesDeCuadros (cuadros) {
  const pares = {};

  cuadros.each( (i, cuadro) => {
    const claseColor = cuadro.className.replace("cuadro", "");

    if (pares[claseColor]) {
      pares[claseColor].push(cuadro)
    } else {
      pares[claseColor] = [cuadro]
    }
  }) 
  console.log(pares)
  return parseHTML
}
