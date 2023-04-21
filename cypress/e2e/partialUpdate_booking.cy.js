describe("Get booking and update partial info", () => {
  //ARRANGE
  let bookingid;
  let tokenid;
  let checkin = new Date();
  let checkinDate = checkin.toISOString().substring(0, 10);
  checkin.setDate(checkin.getDate() + 3);
  let checkoutDate = checkin.toISOString().substring(0, 10);

  const data = {
    firstname: "James",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: `${checkinDate}`,
      checkout: `${checkoutDate}`,
    },
    additionalneeds: "Breakfast",
  };

  //arranging test data in a before loop to isolate the test scenario
  before(() => {
    //fetch the auth token to delete the booking id
    cy.api({
      method: "POST",
      url: "/auth",
      body: {
        username: "admin",
        password: "password123",
      },
    }).then((body) => {
      tokenid = body.body.token;
    });

    //get the booking id to perform updation
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

  //ACT
  //test scenario : update the booking details and assert the response
  it("should update the booking successfully", () => {
    cy.log(checkoutDate);
    //update the booking details
    cy.api({
      method: "PATCH",
      url: `/booking/${bookingid}`,
      headers: {
        Cookie: `token=${tokenid}`,
      },
      body: data,
    }).then(({ status, body }) => {
      //ASSERT
      //assert status code, patched properties, response body
      expect(status).to.be.eq(200);
      expect(body.firstname).equals(data.firstname);
      expect(body.lastname).equals(data.lastname);
      expect(body).to.have.keys(
        "firstname",
        "lastname",
        "totalprice",
        "depositpaid",
        "bookingdates",
        "additionalneeds"
      );
    });
  });
});
