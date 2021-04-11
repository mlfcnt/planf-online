import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getAllBookings } from "../api/bookings";
import BookForm from "../components/BookForm";
import { Calendar } from "../components/Calendar";
import randomColor from "randomcolor";
import { groupBy } from "lodash";

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
  const { loading, error, allBookings } = getAllBookings();

  useEffect(() => {
    if (!allBookings) return;
    const groupped = groupBy(allBookings, "who");
    const events = Object.values(groupped);
    for (const gEvent of events) {
      const rc = randomColor({ luminosity: "dark" });
      for (const event of gEvent) {
        event.color = rc;
      }
    }

    const flat = events.flat();
    setEvents(
      flat.map((e) => ({
        key: e.id,
        title: `${e.who}`,
        start: e.startDate,
        end: e.endDate,
        allday: true,
        color: e.color,
      }))
    );
  }, [allBookings]);

  const addEvent = useCallback((newEvent) => setEvents([...events, newEvent]), [
    setEvents,
    events,
  ]);

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Bloc>
        <Calendar events={events} />
      </Bloc>
      <FormContainer>
        <Title>Réserver</Title>
        <BookForm addEvent={addEvent} />
      </FormContainer>
    </>
  );
}

export default Home;
