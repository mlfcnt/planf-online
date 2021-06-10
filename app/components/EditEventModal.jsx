import React from "react";
import { Modal } from "antd";
import BookForm from "./BookForm";
import moment from "moment";

function EditEventModal({ show, toggle, event }) {
  if (!event) return null;
  return (
    <Modal title="Modifier le séjour" visible={show} onCancel={toggle} footer={null}>
      <BookForm
        initialValues={{
          who: event.who,
          startDate: moment(event.start),
          endDate: moment(event.end),
          comment: event.comment,
        }}
        eventToEdit={event}
        toggleEditModal={toggle}
      />
    </Modal>
  );
}

export default EditEventModal;
