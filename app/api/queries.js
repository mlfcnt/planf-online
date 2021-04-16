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
        color
      }
    }
  }
  `;

export const SAVE_BOOKING = `
mutation createBooking($who: PersonRelateToOneInput!, $startDate: String!, $endDate: String! ) {
  createBooking(data: { who: $who, startDate: $startDate, endDate: $endDate }) {
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

export const UPDATE_BOOKING = `
mutation updateBooking($id: ID!, $data: BookingUpdateInput!){
  updateBooking(id: $id, data: $data) {
    id
  }
}
`;

export const DELETE_BOOKING = `
mutation deleteBooking($id: ID!){
  deleteBooking(id: $id) {
    id
  }
}
`;
