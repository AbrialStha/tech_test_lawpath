import { mount } from "cypress/react";
import { PostalCodeInput } from "./PostalCodeInput";

describe("<PostalCodeInput>", () => {
  before(() => {
    cy.viewport("macbook-16");
  });

  it("InputField mounted", () => {
    mount(
      <div className="container-md">
        <PostalCodeInput
          error=""
          value=""
          onBlur={() => {}}
          onChange={() => {}}
        />
      </div>
    );

    cy.get(".form-label").invoke("text").should("contains", "Enter Postal Code");
    cy.get(".form-control")
      .invoke("attr", "placeholder")
      .should("contain", "eg: 2007");
  });
});
