export const GET_ALL_BOOKINGS = `
query{
    allBookings {
        id
        who
        startDate
        endDate
        validated
      }
}
  `;

export const SAVE_BOOKING = `
  mutation createBooking($who: String!, $startDate: String!, $endDate: String! ) {
    createBooking(data: { who: $who, startDate: $startDate, endDate: $endDate }) {
      id
      who
      startDate
      endDate
    }
  }
  `;
