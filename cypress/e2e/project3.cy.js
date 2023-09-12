/// <reference types="cypress" />
import { addDays, format } from 'date-fns';

describe('Almosafer Website', () => {
  it("Should set departure date to today's date +1 and return date to today's date +2", () => {
    // Visit the website
    cy.visit('https://www.almosafer.com/en?ncr=1');

    // Calculate tomorrow's date and the day after tomorrow
    const currentDate = new Date();
    const tomorrowDate = addDays(currentDate, 1);
    const dayAfterTomorrowDate = addDays(currentDate, 2);

    // Format these dates as 'yyyy-MM-dd' to match the date format '2023-09-13'
    const formattedTomorrow = format(tomorrowDate, 'yyyy-MM-dd');
    const formattedDayAfterTomorrow = format(dayAfterTomorrowDate, 'yyyy-MM-dd');

    // Click on the departure date input
    cy.get('[data-testid="FlightSearchBox__FromDateButton"]').click();

    // Find and click on the date corresponding to tomorrow
    cy.get('.DayPicker-Day[aria-label*="Departure"]').contains(formattedTomorrow).click();

    // Click on the return date input
    cy.get('[data-testid="FlightSearchBox__ToDateButton"]').click();

    // Find and click on the date corresponding to the day after tomorrow
    cy.get('.DayPicker-Day[aria-label*="Return"]').contains(formattedDayAfterTomorrow).click();

    // Assert that the selected departure date is tomorrow
    cy.get('[data-testid="FlightSearchBox__FromDateButton"]').should('contain', formattedTomorrow);

    // Assert that the selected return date is the day after tomorrow
    cy.get('[data-testid="FlightSearchBox__ToDateButton"]').should('contain', formattedDayAfterTomorrow);
  });
});
