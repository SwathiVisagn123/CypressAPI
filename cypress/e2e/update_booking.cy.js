describe("Get booking and delete", () => {
  let bookingid;
  let tokenid;

  function dates() {
    let checkin = new Date();
    let checkinDate = checkin.toISOString().substring(0, 10);
    checkin.setDate(checkin.getDate() + 3);
    let checkoutDate = checkin.toISOString().substring(0, 10);
    return { checkinDate, checkoutDate };
  }

  //ARRANGE
  before(() => {
    cy.fixture("inputs").then(function (input) {
      this.testdata = input;
    });
  });

  //arranging test data in a before loop to isolate the test scenario
  beforeEach(function () {
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

    //get the booking id to perform updation
    cy.api({
      method: "GET",
      url: this.testdata.booking_Endpoint,
    }).then(({ body, status }) => {
      expect(status).to.be.eq(200);
      expect(body).to.be.a("Array");
      expect(body[0]).to.haveOwnProperty("bookingid");
      bookingid = body[0].bookingid;
    });
  });

  //ACT
  //test scenario : update the booking details and assert the response
  it("should update the booking successfully", function () {
    const checkdates = dates();
    const data = {
      firstname: this.testdata.firstname,
      lastname: this.testdata.lastname,
      totalprice: this.testdata.totalprice,
      depositpaid: true,
      bookingdates: {
        checkin: `${checkdates.checkinDate}`,
        checkout: `${checkdates.checkoutDate}`,
      },
      additionalneeds: this.testdata.additional,
    };
    //update the booking details
    cy.api({
      method: "PUT",
      url: `/booking/${bookingid}`,
      headers: {
        Cookie: `token=${tokenid}`,
      },
      body: data,
    }).then(({ status, body }) => {
      //ASSERT
      expect(status).to.be.eq(200);
      expect(JSON.stringify(body)).to.be.equals(JSON.stringify(data));
    });
  });
});
