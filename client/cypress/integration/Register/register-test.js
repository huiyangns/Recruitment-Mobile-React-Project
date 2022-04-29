///<reference types="cypress"/>

import RegisterPage_POM from "../../support/POM/Register/RegisterPage_POM";

describe("test register page", () => {
  let registerPage_PO = new RegisterPage_POM();

  describe("test register page via UI", () => {
    let userName =
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2);

    beforeEach(() => {
      cy.fixture("example").as("data");
      registerPage_PO.navigate_to_register_page();
    });

    it("test null username", () => {
      cy.get("@data").then((data) => {
        registerPage_PO.submit_register_form("", data.password, data.password);
      });
      cy.get("[class='adm-list-item-content-main']")
        .eq(0)
        .should("contain", "username should not be blank");
    });

    it("test password inconsistent", () => {
      cy.get("@data").then((data) => {
        registerPage_PO.submit_register_form(
          userName,
          data.password,
          data.re_password
        );
      });
      cy.get("[class='adm-list-item-content-main']")
        .eq(0)
        .should("contain", "password should be consistent");
    });

    it("test register successfully and verify XHR", () => {
      cy.intercept({
        method: "POST",
        url: "**/register",
      }).as("postXHR");

      cy.get("@data").then((data) => {
        registerPage_PO.submit_register_form(
          userName,
          data.password,
          data.password
        );
      });

      cy.wait("@postXHR").should(({ request, response }) => {
        expect(response.body.data.username).to.eq(userName);
        expect(response.body.data.type).to.eq("dashen");
      });

      cy.get("[class='adm-list-header']")
        .find("p")
        .should("contain", "Choose an avatar");
    });

    it("register an existing user", () => {
      cy.get("@data").then((data) => {
        registerPage_PO.submit_register_form(
          userName,
          data.password,
          data.password
        );
      });
      cy.get("[class='adm-list-item-content-main']")
        .eq(0)
        .should("contain", "user exists");
    });
  });

  describe("test register page via API", () => {
    let userName =
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2);
    let type = "laoban";

    beforeEach(() => {
      cy.fixture("example").as("data");
      registerPage_PO.navigate_to_register_page();
    });

    it("test register successfully via API", () => {
      cy.get("@data").then((data) => {
        cy.request({
          method: "POST",
          url: "http://localhost:4000/register",
          body: {
            username: userName,
            password: data.password,
            type,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          let uName = response.body.data.username;
          let uType = response.body.data.type;
          expect(uName).to.eq(userName);
          expect(uType).to.eq(type);
        });
      });
    });
  });
});
