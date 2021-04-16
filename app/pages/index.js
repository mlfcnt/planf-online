import { isEmpty } from "lodash";
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useAllBookings } from "../api/bookings";
import BookForm from "../components/BookForm";
import { Calendar } from "../components/Calendar";

const CalendarContainer = styled.div`
  margin-bottom: 3vh !important;
`;
const Title = styled.div`
  font-size: 2rem !important;
  margin-bottom: 1vh !important;
`;

const FormContainer = styled.div`
  max-width: 50%;
  margin: auto;
`;

function Home() {
  const [events, setEvents] = useState([]);
  const {
    isLoading: loadingBookings,
    error: errorBookings,
    data,
  } = useAllBookings();

  const allBookings = useMemo(() => {
    if (!data) return [];
    return data.data.allBookings;
  }, [data]);

  useEffect(() => {
    if (isEmpty(allBookings)) setEvents([]);
    setEvents(
      allBookings.map((e) => ({
        key: e.id,
        who: e.who.id,
        title: e.who.name,
        start: e.startDate,
        end: e.endDate,
        allday: true,
        color: e.who.family.color,
      }))
    );
  }, [allBookings]);

  if (loadingBookings) return <p>Chargement des données...</p>;
  if (errorBookings) return <p>{errorBookings}</p>;

  return (
    <>
      <CalendarContainer>
        <Calendar events={events} />
      </CalendarContainer>
      <FormContainer>
        <Title>Réserver</Title>
        <BookForm />
      </FormContainer>
    </>
  );
}

export default Home;
