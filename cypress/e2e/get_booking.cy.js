describe("get booking details", () => {
  let bookingid;

  before(() => {
    cy.fixture("inputs").then(function (input) {
      this.testdata = input;
    });
  });

  beforeEach(function () {
    //arranging test data in a before loop to isolate the test scenario
    //get the booking id
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

  it("should get booking details successfully", () => {
    cy.api({
      method: "GET",
      url: `/booking/${bookingid}`,
    }).then(({ body, status }) => {
      cy.log(body);
      //assert status code
      expect(status).to.be.eq(200);

      //assert booking details
      expect(body).to.have.keys(
        "firstname",
        "lastname",
        "totalprice",
        "depositpaid",
        "bookingdates",
        "additionalneeds"
      );

      //asserting some property types
      expect(body.firstname).to.be.a("string");
      expect(body.totalprice).to.be.a("number");
    });
  });
});
