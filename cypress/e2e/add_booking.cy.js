//Add a new booking
//Assert the response code to be 200 and Booking Id to be a Number

describe("Add booking", () => {
  let checkin = new Date();
  let checkinDate = checkin.toISOString().substring(0, 10);
  checkin.setDate(checkin.getDate() + 3);
  let checkoutDate = checkin.toISOString().substring(0, 10);

  it("should add a booking successfully", () => {
    cy.api({
      method: "POST",
      url: "/booking",
      body: {
        firstname: "Swathika",
        lastname: "Visagn",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: `${checkinDate}`,
          checkout: `${checkoutDate}`,
        },
        additionalneeds: "Breakfast",
      },
    }).then(({ body, status }) => {
      expect(status).to.be.eq(200);
      expect(body.bookingid).to.be.a("Number");
    });
  });
});
