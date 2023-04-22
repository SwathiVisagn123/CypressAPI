//Add a new booking
//Assert the response code to be 200 and Booking Id to be a Number

function dates() {
  let checkin = new Date();
  let checkinDate = checkin.toISOString().substring(0, 10);
  checkin.setDate(checkin.getDate() + 3);
  let checkoutDate = checkin.toISOString().substring(0, 10);
  return { checkinDate, checkoutDate };
}

describe("Add booking", () => {
  before(() => {
    cy.fixture("inputs").then(function (input) {
      this.testdata = input;
    });
  });

  it("should add a booking successfully", function () {
    const date = dates();
    cy.api({
      method: "POST",
      url: this.testdata.booking_Endpoint,
      body: {
        firstname: this.testdata.firstname,
        lastname: this.testdata.lastname,
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: `${date.checkinDate}`,
          checkout: `${date.checkoutDate}`,
        },
        additionalneeds: this.testdata.additional,
      },
    }).then(({ body, status }) => {
      expect(status).to.be.eq(200);
      expect(body.bookingid).to.be.a("Number");
    });
  });
});
