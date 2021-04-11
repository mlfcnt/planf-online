import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

export const Calendar = ({ events }) => {
  const localizer = momentLocalizer(moment);

  const messages = {
    // new
    allDay: "Toute la journée",
    previous: "Mois précédent",
    next: "Mois suivant",
    today: "Aujourd'hui",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    agenda: "Agenda",
    date: "Date",
    time: "Heure",
    event: "Evennement",
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
      },
    };
  };

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={events}
        views={["month"]}
        style={{ height: 500 }}
        messages={messages}
        popup
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};
