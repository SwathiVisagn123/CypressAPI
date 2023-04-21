describe("Get booking and delete", () => {
  let bookingid;
  let tokenid;

  //arranging test data in a before loop to isolate the test scenario
  before(() => {
    //fetch the auth token to delete the booking id
    cy.api({
      method: "POST",
      url: "/auth",
      body: {
        username: `${Cypress.env("username")}`,
        password: `${Cypress.env("password")}`,
      },
    }).then((body) => {
      tokenid = body.body.token;
    });

    //get the booking id to perform deletion
    cy.api({
      method: "GET",
      url: "/booking",
    }).then(({ body, status }) => {
      expect(status).to.be.eq(200);
      expect(body).to.be.a("Array");
      expect(body[0]).to.haveOwnProperty("bookingid");
      bookingid = body[0].bookingid;
      cy.log(bookingid);
    });
  });

  //test scenario : delete the booking id and assert the response
  it("should delete the booking successfully", () => {
    cy.api({
      method: "DELETE",
      url: `/booking/${bookingid}`,
      headers: {
        Cookie: `token=${tokenid}`,
      },
    }).then(({ status, body }) => {
      expect(status).to.be.eq(201);
      expect(body).to.contain("Created");
    });
  });
});
