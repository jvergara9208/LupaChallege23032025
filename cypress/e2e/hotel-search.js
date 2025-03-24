import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the Booking.com homepage", () => {
  cy.visit("https://www.booking.com");
  cy.url().should("include", "booking.com"); // Validar que estamos en la página correcta
});

When("I ensure the page has fully loaded", () => {
  // Esperar a que la página haya terminado de cargar
  cy.get('body').should('not.have.class', 'loading');
  cy.get('header').should('be.visible'); // Validar que el encabezado está visible
  cy.get('footer').should('be.visible'); // Validar que el pie de página está visible
});


When("I ensure no pop-up is present", () => {
  const checkForPopup = (attempts = 3) => {
    if (attempts === 0) return;

    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        cy.get('[role="dialog"]', { timeout: 10000 }) // Esperar hasta 10 segundos
          .should('be.visible') // Verificar que el diálogo sea visible
          .within(() => {
            // Asegurarse de interactuar con el botón dentro del diálogo
            cy.get('button')
              .should('be.visible') // Verificar visibilidad del botón
              .click({ force: true }); // Cerrar el pop-up con "force" si es necesario
          });

        // Confirmar que el diálogo ya no está presente
        cy.get('[role="dialog"]').should('not.exist');
      } else {
        cy.wait(1000); // Esperar 1 segundo antes de reintentar
        checkForPopup(attempts - 1);
      }
    });
  };

  checkForPopup();
});




When("I enter {string} in the search bar", (city) => {
  // Verificar y escribir en el campo de búsqueda
  cy.get('input[name="ss"]', { timeout: 10000 })
    .should('exist')
    .and('be.visible')
    .type(city); // Escribir el nombre de la ciudad
});

When("I select check-in and check-out dates", () => {
  cy.fixture("example.json").then((data) => {
    if (!data || !data.checkInDate || !data.checkOutDate) {
      throw new Error("Fixture file is missing or does not contain the expected data structure.");
    }

    const { checkInDate, checkOutDate } = data; // Extraer las fechas del fixture

    const today = new Date();
    const checkInDateObj = new Date(checkInDate);
    const checkOutDateObj = new Date(checkOutDate);

    // Validar que las fechas no sean anteriores a la fecha actual
    if (checkInDateObj < today || checkOutDateObj < today) {
      throw new Error("The selected dates cannot be in the past.");
    }

    // Validar que la fecha de check-in sea anterior a la de check-out
    if (checkInDateObj >= checkOutDateObj) {
      throw new Error("Check-in date must be earlier than check-out date.");
    }

    // Función para seleccionar la fecha en el calendario
    const selectDate = (targetDate, isCheckOut = false) => {
      cy.log(`Selecting date: ${targetDate}`); // Registrar la fecha objetivo
      const navigateToMonth = () => {
        cy.get(`span[data-date="${targetDate}"]`).then(($day) => {
          if ($day.length > 0) {
            // Si se encuentra el día en la grilla
            if ($day.hasClass('bui-calendar__date--disabled')) {
              throw new Error(`The selected date ${targetDate} is not available.`);
            }
            cy.wrap($day).click(); // Seleccionar el día
          } else {
            // Si no se encuentra el día, navegar al siguiente mes
            cy.get('button[aria-label="Next month"]').then(($nextButton) => {
              if ($nextButton.is(':disabled')) {
                throw new Error(`Reached the end of the calendar without finding the target date: ${targetDate}`);
              } else {
                cy.wrap($nextButton).click().then(() => {
                  navigateToMonth(); // Llamada recursiva para buscar en el siguiente mes
                });
              }
            });
          }
        });
      };

      navigateToMonth(); // Iniciar la navegación y selección de fecha
    };

    // Seleccionar Check-in
    cy.get('button[data-testid="date-display-field-start"]').click(); // Abrir calendario de Check-in
    selectDate(checkInDate);

    // Seleccionar Check-out
    cy.get('button[data-testid="date-display-field-end"]').click(); // Abrir calendario de Check-out
    selectDate(checkOutDate, true);

    // Validar que las fechas seleccionadas son las correctas
    cy.get('button[data-testid="date-display-field-start"]').should(
      "contain.text",
      checkInDate.split("-").reverse().join("-")
    );
    cy.get('button[data-testid="date-display-field-end"]').should(
      "contain.text",
      checkOutDate.split("-").reverse().join("-")
    );
  });
});

When("I click the {string} button", () => {
  cy.get('button[type="submit"]').should('be.visible').click();
});

Then("I should see hotels in {string} displayed", (city) => {
  cy.get(".results").should("contain.text", city);
});

Then("the availability should match the selected dates", () => {
  cy.get(".results").each((result) => {
    cy.wrap(result).should("contain.text", "10"); // Validar fecha de check-in
    cy.wrap(result).should("contain.text", "20"); // Validar fecha de check-out
  });
});

When("I apply the {string} filter", (filter) => {
  cy.get(`[data-filter="${filter}"]`).click(); // Aplicar filtro basado en su atributo único
});

Then("only hotels with a guest rating of 8 or higher should be displayed", () => {
  cy.get(".results").each((result) => {
    cy.wrap(result).find(".rating").should("have.attr", "data-score").and("gte", 8);
  });
});

When("I sort the results by {string}", (criteria) => {
  cy.get(`[data-sort="${criteria}"]`).click(); // Ordenar resultados por criterio
});

Then("the cheapest hotel should appear at the top of the results", () => {
  cy.get(".results").first().should("contain.text", "Lowest Price");
});