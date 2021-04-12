import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useAllBookings } from "../api/bookings";
import { useAllPeople } from "../api/people";
import BookForm from "../components/BookForm";
import { Calendar } from "../components/Calendar";

const Bloc = styled.div`
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
    loading: loadingBookings,
    error: errorBookings,
    allBookings,
  } = useAllBookings();
  console.log("👽CLG - allBookings", allBookings);
  const {
    loading: loadingPeople,
    error: errorPeople,
    allPeople,
  } = useAllPeople();

  useEffect(() => {
    if (!allBookings) return;
    setEvents(
      allBookings.map((e) => ({
        key: e.id,
        who: e.who.id,
        title: `${e.who.name}`,
        start: e.startDate,
        end: e.endDate,
        allday: true,
        color: e.who.family.color,
      }))
    );
  }, [allBookings]);

  const addEvent = useCallback((newEvent) => setEvents([...events, newEvent]), [
    setEvents,
    events,
  ]);

  if (loadingBookings || loadingPeople) return <p>Chargement des données...</p>;
  if (errorBookings || errorPeople) return <p>{error}</p>;

  return (
    <>
      <Bloc>
        <Calendar events={events} />
      </Bloc>
      <FormContainer>
        <Title>Réserver</Title>
        <BookForm addEvent={addEvent} allPeople={allPeople} />
      </FormContainer>
    </>
  );
}

export default Home;
