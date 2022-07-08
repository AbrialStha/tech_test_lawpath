import { mount } from "cypress/react";
import App from "./App";

describe("<App>", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    mount(<App />);
    //Set API spy and stub it with the custom response from fixutrues
    cy.intercept("/postcode/search.json*", {
      fixture: "postal_details.json",
      delay: 200,
    }).as("getPostDetails");
  });

  it("Validate Empty Input Fields", () => {
    cy.get(".btn-primary")
      .contains("validate input", { matchCase: false })
      .click();
    cy.get(".form-label")
      .contains("postal code", { matchCase: false })
      .siblings(".invalid-feedback")
      .invoke("text")
      .should("contain", "PostalCode is Required");

    cy.get(".form-label")
      .contains("enter suburb", { matchCase: false })
      .siblings(".invalid-feedback")
      .invoke("text")
      .should("contain", "Suburb is Required");

    cy.get(".form-label")
      .contains("enter state", { matchCase: false })
      .siblings(".invalid-feedback")
      .invoke("text")
      .should("contain", "State is Required");
  });

  it("Validate for invalid postal code input",()=> {
    cy.get(".postalcode > .form-control").type("123a")
    cy.contains('Postalcode should only contains number of length 4')
  })

  it("Reset Form button check", () => {
    cy.get(".btn-primary")
      .contains("validate input", { matchCase: false })
      .click();
    cy.get(".btn-secondary")
      .contains("reset form", { matchCase: false })
      .click();
    cy.get(".invalid-feedback").should("not.be.visible");
  });

  it("Validate by entering postal code and check for suggestions", () => {
    // Enter the Postal code
    cy.get(".postalcode > .form-control").type("2007").blur();

    // Check if the loding suggestion appears abd validate button is disabled or not
    cy.get(".inputfield > .form-label")
      .contains("Enter Suburb", {
        matchCase: false,
      })
      .siblings(".d-flex")
      .invoke("text")
      .should("contain", "Loading Suggestions...");

    cy.get(".inputfield > .form-label")
      .contains("Enter State", {
        matchCase: false,
      })
      .siblings(".d-flex")
      .invoke("text")
      .should("contain", "Loading Suggestions...");

    cy.get(".btn-primary")
      .contains("Validate Input", { matchCase: false })
      .should("be.disabled");

    // Wait For API to return response and check suggestions
    cy.wait("@getPostDetails").then(() => {
      cy.get(".inputfield > .form-label")
        .contains("Enter Suburb", {
          matchCase: false,
        })
        .siblings(".container-md .hstack")
        .within(() => {
          cy.get("span").invoke("text").should("contain", "ULTIMO");
        });

      cy.get(".inputfield > .form-label")
        .contains("Enter State", {
          matchCase: false,
        })
        .siblings(".container-md .hstack")
        .within(() => {
          cy.get("span").invoke("text").should("contain", "NSW");
        });

      cy.get(".btn-primary")
        .contains("Validate Input", { matchCase: false })
        .should("not.be.disabled");
    });
  });

  it("Validate for invalid input combination", () => {
    cy.get(".postalcode > .form-control").type("2007");
    cy.get(".inputfield > .form-label")
      .contains("enter suburb", { matchCase: false })
      .siblings(".form-control")
      .type("MELBOURNE");
    cy.get(".inputfield > .form-label")
      .contains("enter state", { matchCase: false })
      .siblings(".form-control")
      .type("QLD");
    cy.get(".btn-primary").click();

    //Check for invalid input message
    cy.get(".inputfield > .form-label")
      .contains("enter suburb", { matchCase: false })
      .siblings(".invalid-feedback")
      .should(
        "contain",
        "The postal code 2007 doesnot matches the suburb MELBOURNE, try changing the postal code or choose suburb from suggestion"
      );

    cy.get(".inputfield > .form-label")
      .contains("enter state", { matchCase: false })
      .siblings(".invalid-feedback")
      .should(
        "contain",
        "The suburb MELBOURNE doesnot exist in the state QLD, try changing the postal code or choose state from suggestion"
      );
  });

  it("Validate for all valid input combinations", () => {
    cy.get(".postalcode > .form-control").type("2007").blur();
    cy.contains("ULTIMO", { matchCase: false }).click();
    cy.contains("nsw", { matchCase: false }).click();
    cy.get(".btn-primary").click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('The postcode 2007, suburb ULTIMO and state NSW entered are valid.');
    });
  });
});
