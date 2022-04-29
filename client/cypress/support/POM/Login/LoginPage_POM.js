export default class LoginPage_POM {
  navigate_to_Login_Page() {
    cy.visit("http://localhost:3000/#/login");
  }

  submit_login_form(userName, password) {
    if (userName.trim()) {
      cy.get("[placeholder='username']").type(userName);
    }
    if (password.trim()) {
      cy.get("[placeholder='password']").type(password);
    }

    cy.get("button").contains("Login").click()
  }
}
