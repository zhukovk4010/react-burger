/// <reference types="cypress" />

describe("user authentication and create order", () => {
    beforeEach(() => {
        cy.visit("");
        cy.get('[test-id="ingredient"]').first().as("ingredient");
    });

    it("check modal window", () => {
        cy.get("@ingredient").click();
        cy.get('[test-id="ingredientDetails"]').should("be.visible");
        cy.get('[test-id="closeButton"]').click();
    });

    it("user authentication, drag and drop ingredients and create order", () => {
        cy.visit("login");
        cy.get('[name="email"]').type("zhukovk4010@gmail.com");
        cy.get('[name="password"]').type("zxc123");
        cy.get('[test-id="enterButton"]').click();
        cy.get('[test-id="dropTarget"]').first().as("dropTarget");
        const dataTransfer = new DataTransfer();
        cy.get("@ingredient").trigger("dragstart", {
            dataTransfer,
        });

        cy.get("@dropTarget").trigger("drop", {
            dataTransfer,
        });

        cy.get('[test-id="orderButton"]').click();
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(15000).get('[test-id="orderDetails"]').should("be.visible");
        cy.get('[test-id="closeButton"]').click();
    });
});
