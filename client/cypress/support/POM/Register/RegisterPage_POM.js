export default class RegisterPage_POM{
    navigate_to_register_page(){
        cy.visit(Cypress.env("url") + "/register")
    }

    submit_register_form(userName, password, re_password){
        if(userName.trim()){
            cy.get("[placeholder='username']").type(userName)
        }

        cy.get("[placeholder='password']").type(password)
        cy.get("[placeholder='Confirm Password']").type(re_password)
        cy.get("button").contains("Register").click()
    }
}