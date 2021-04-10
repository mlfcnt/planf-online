import { getAllBookings } from "../api/bookings";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import { useState, useEffect } from "react";

moment.locale("fr");

export const Calendar = () => {
  const [events, setEvents] = useState([]);
  const { loading, error, allBookings } = getAllBookings();

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    if (!allBookings) return;
    setEvents(
      allBookings.map((e) => ({
        title: `${e.who}`,
        start: e.startDate,
        end: e.endDate,
        allday: true,
      }))
    );
  }, [allBookings]);

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  const messages = {
    // new
    allDay: "Toute la journée",
    previous: "Précédent",
    next: "Suivant",
    today: "Aujourd'hui",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    agenda: "Agenda",
    date: "Date",
    time: "Heure",
    event: "Evennement",
  };

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={events}
        views={["month"]}
        style={{ height: 500 }}
        messages={messages}
      />
    </div>
  );
};
