export const GET_ALL_BOOKINGS = `
query{
  allBookings{
    id
    who {
      id
      name
      family {
        name
        color
      }
    }
    startDate
    endDate
  }
}
  `;

export const GET_ALL_PEOPLE = `
  query{
    allPeople {
      id
      name
      family {
        name
      }
    }
  }
  `;

export const SAVE_BOOKING = `
mutation createBooking($who: PersonRelateToOneInput!, $startDate: String!, $endDate: String! ) {
  createBooking(data: { who: $who, startDate: $startDate, endDate: $endDate }) {
     id
  who {
    name
    family {
      name
      color
    }
  }
  startDate
  endDate
  }
}
`;
