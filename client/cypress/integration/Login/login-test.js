///<reference types="cypress"/>
import LoginPage_POM from "../../support/POM/Login/LoginPage_POM"

describe("test login page",() => {
    let loginPage_PO = new LoginPage_POM()
    beforeEach(() => {
        loginPage_PO.navigate_to_Login_Page() 
        cy.fixture("example").as("data")
    })

    it("test null username",() => {
        cy.get("@data").then((data) => {
            loginPage_PO.submit_login_form("", data.password)
        })
        cy.get(".errMsg").then((ele) => {
             expect(ele.text()).to.eq("username should not be blank")
        })
    }) 

    it("test null password",() => {
        cy.get("@data").then((data) => {
            loginPage_PO.submit_login_form(data.name, "")
        })
        cy.get(".errMsg").then((ele) => {
             expect(ele.text()).to.eq("password should not be blank")
        })
    })

    it("test wrong userName",() => {
        cy.get("@data").then((data) => {
            loginPage_PO.submit_login_form(data.name + Math.random().toString(36).substring(2), data.password)
        })
        cy.get(".errMsg").then((ele) => {
             expect(ele.text()).to.eq("wrong username or password")
        })
    })

    it("test wrong password",() => {
        cy.get("@data").then((data) => {
            loginPage_PO.submit_login_form(data.name, data.password + + Math.random().toString(36).substring(2))
        })
        cy.get(".errMsg").then((ele) => {
             expect(ele.text()).to.eq("wrong username or password")
        })
    })

    it.only("correct userName and password, then verify XHR",() => {
        let userName = ''
        cy.intercept({
            method:"POST",
            url:"**/login"
        }).as("postXHR")

        cy.get("@data").then((data) => {
            userName = data.name
            loginPage_PO.submit_login_form(data.name, data.password)
         })

        cy.wait("@postXHR").should(({request, response}) => {
             expect(response.body.data.username).to.eq(userName)
             expect(response.statusCode).to.eq(200)

        }) 
    })
})