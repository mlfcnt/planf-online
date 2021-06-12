import { isEmpty } from "lodash";
import React, { useState, useEffect, useMemo } from "react";
import { useAllBookings } from "../api/bookings";
import BookForm from "../components/BookForm";
import { Calendar } from "../components/Calendar";
import { Modal } from "antd";
import { useRouter } from 'next/router';
import { useToggle } from "react-use";
import moment from 'moment';



function Home() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [showBookingModal, toggleBookingModal] = useToggle(false)
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
        title: `${e.who.name} ${e.comment ? `- ${e.comment}` : ''}`,
        comment: e.comment,
        start: e.startDate,
        end: e.endDate,
        allday: true,
        color: e.who.family.color,
      })),
    );
  }, [allBookings]);

  useEffect(() => {
    if (!router.query.reservation) return;
    toggleBookingModal(true);
  }, [router.query.reservation])

  if (loadingBookings) return <p>Chargement des données...</p>;
  if (errorBookings) return <p>{errorBookings}</p>;

  const handleCloseBookingModal = () => {
    toggleBookingModal(false);
    router.replace('/')
  }

  return (
    <>
      <div className="calendarContainer">
        <Calendar events={events} />
      </div>
      <Modal
        width={1000}
        title="Réservation"
        visible={showBookingModal}
        onCancel={handleCloseBookingModal}
        footer={null}
      >
        <div className="formContainer">
          <BookForm
            toggleModal={handleCloseBookingModal}
            initialValues={{
              startDate: router.query.reservation ? moment(router.query.reservation) : null,
              endDate: router.query.end ? moment(router.query.end) : null,
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export default Home;
