import { mount } from "cypress/react";
import { InputField } from "./InputField";

describe("<InputField>", () => {
  before(() => {
    cy.viewport("macbook-16");
  });

  it("InputField mounted", () => {
    mount(
      <div className="container-md">
        <InputField
          error=""
          label="Label Name"
          loading={false}
          placeholder="This is Placeholder"
          suggestion={[]}
          value=""
          onChange={() => {}}
        />
      </div>
    );

    cy.get(".form-label").invoke("text").should("contains", "Label Name");
    cy.get(".form-control")
      .invoke("attr", "placeholder")
      .should("contain", "This is Placeholder");
  });

  it("InputField mounted with error", () => {
    mount(
      <div className="container-md">
        <InputField
          error="This is error"
          label="Label Name"
          loading={false}
          placeholder="This is Placeholder"
          suggestion={[]}
          value="123ab"
          onChange={() => {}}
        />
      </div>
    );

    cy.get(".form-control").invoke("attr", "value").should("contain", "123ab");
    cy.get(".invalid-feedback")
      .invoke("text")
      .should("contain", "This is error");
  });

  it("Input Field mounted with loading true for suggestions", () => {
    mount(
      <div className="container-md">
        <InputField
          error=""
          label="Label Name"
          loading={true}
          placeholder="This is Placeholder"
          suggestion={[]}
          value="2007"
          onChange={() => {}}
        />
      </div>
    );

    cy.get(".form-control").invoke("attr", "value").should("contain", "2007");
    cy.get("span").invoke("text").should("contain", "Loading Suggestions...");
  });

  it("Input Field mounted with suggestions", () => {
    mount(
      <div className="container-md">
        <InputField
          error=""
          label="Label Name"
          loading={false}
          placeholder="This is Placeholder"
          suggestion={['NSW','TAS', 'WA']}
          value=""
          onChange={() => {}}
        />
      </div>
    );

    cy.get(".badge").invoke("text").should("contain", "NSW");
    cy.get(".badge").invoke("text").should("contain", "TAS");
    cy.get(".badge").invoke("text").should("contain", "WA");
  });
});
