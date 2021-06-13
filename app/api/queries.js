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
    comment
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
mutation createBooking($who: PersonRelateToOneInput!, $startDate: String!, $endDate: String!, $comment: String ) {
  createBooking(data: { who: $who, startDate: $startDate, endDate: $endDate, comment: $comment }) {
     id
  who {
    id
    name
    family {
      name
      color
    }
  }
  comment
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


export const GET_ALL_TASKS = `
  query{
    allTasks {
      id
      name
      createdBy {
        name
      }
      createdAt
      isArchived
    }
  }
  `;

export const UPDATE_TASK = `
mutation updateTask($id: ID!, $data: TaskUpdateInput!){
  updateTask(id: $id, data: $data) {
    id
  }
}
`;

export const SAVE_TASK = `
mutation createTask($name: String!, $createdBy: PersonRelateToOneInput!) {
  createTask(data: {name : $name, createdBy: $createdBy }) {
     name
  createdBy {
    id
  }
  }
}
`;
