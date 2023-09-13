/// <reference types="cypress" />
import { addDays, format } from 'date-fns';

describe('Almosafer Website', () => {
  it("Should set departure date to today's date +1, return date to today's date +2, and verify default flight class", () => {
    cy.visit('https://www.almosafer.com/en?ncr=1');

    const currentDate = new Date();
    const tomorrowDate = addDays(currentDate, 1);
    const dayAfterTomorrowDate = addDays(currentDate, 2);

    const formattedTomorrow = format(tomorrowDate, 'yyyy-MM-dd');
    const formattedDayAfterTomorrow = format(dayAfterTomorrowDate, 'yyyy-MM-dd');

    cy.get('[data-testid="FlightSearchBox__FromDateButton"]').click();
    cy.get('.DayPicker-Day[aria-label*="Departure"]').contains(formattedTomorrow).click();

    cy.get('[data-testid="FlightSearchBox__ToDateButton"]').click();
    cy.get('.DayPicker-Day[aria-label*="Return"]').contains(formattedDayAfterTomorrow).click();

    cy.get('[data-testid="FlightSearchBox__FromDateButton"]').should('contain', formattedTomorrow);

    cy.get('[data-testid="FlightSearchBox__ToDateButton"]').should('contain', formattedDayAfterTomorrow);

    cy.get('.sc-jWxkHr').click();
    cy.get('[data-testid="FlightSearchCabinSelection__EconomyOption"]').should('have.text', 'Economy');
  });
});
