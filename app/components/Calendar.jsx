import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import EditEventModal from './EditEventModal';
import { useToggle } from 'react-use';
import { capitalize } from 'lodash';

moment.locale('fr');

export const Calendar = ({ events }) => {
  const [showEditModal, toggleEditModal] = useToggle(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const localizer = momentLocalizer(moment);

  const currentMonth = capitalize(moment().format('MMMM'));;
  const messages = {
    allDay: 'Toute la journée',
    previous: 'Mois précédent',
    next: 'Mois suivant',
    today: currentMonth,
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Heure',
    event: 'Evennement',
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
      },
    };
  };

  return (
    <>
      <BigCalendar
        localizer={localizer}
        events={events}
        views={['month']}
        style={{ height: 500 }}
        messages={messages}
        popup
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(e) => {
          setSelectedEvent(e);
          toggleEditModal();
        }}
      />
      <EditEventModal
        show={showEditModal}
        toggle={toggleEditModal}
        event={selectedEvent}
        setEvent={setSelectedEvent}
      />
    </>
  );
};
