import React from "react";
import { Button, Modal } from "antd";
import BookForm from "./BookForm";
import moment from "moment";

function EditEventModal({ show, toggle, event }) {
  const handleOk = () => {};
  if (!event) return null;
  console.log(event);
  return (
    <Modal
      title="Modifier le séjour"
      visible={show}
      onOk={handleOk}
      onCancel={toggle}
      footer={[
        <Button key="back" onClick={toggle}>
          Annuler
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Confirmer la modification
        </Button>,
        <Button key="delete" type="primary" danger onClick={handleOk}>
          Supprimer
        </Button>,
      ]}
    >
      <BookForm
        initialValues={{
          who: event.who,
          startDate: moment(event.start),
          endDate: moment(event.end),
        }}
        isEdit
      />
    </Modal>
  );
}

export default EditEventModal;
