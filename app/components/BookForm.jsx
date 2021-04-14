import React, { useMemo } from "react";
import { Form, Button, DatePicker, Select } from "antd";
import { saveBooking } from "../api/bookings";
import moment from "moment";
import { useAllPeople } from "../api/people";
moment.locale("fr");

function BookForm({ addEvent, initialValues = {}, isEdit = false }) {
  const [form] = Form.useForm();
  const {
    loading: loadingPeople,
    error: errorPeople,
    allPeople,
  } = useAllPeople();

  const onFinish = ({ who, startDate, endDate }) => {
    const newEvent = {
      who: {
        connect: {
          id: who,
        },
      },
      startDate: moment(startDate).format("yyyy-MM-DD"),
      endDate: moment(endDate).format("yyyy-MM-DD"),
    };

    const people = allPeople.find((x) => x.id === who);
    const localEvent = {
      key: who,
      who,
      title: people.name,
      start: moment(startDate).format("yyyy-MM-DD"),
      end: moment(endDate).format("yyyy-MM-DD"),
      allDay: true,
      color: people.family.color,
    };

    form.resetFields();
    addEvent(localEvent);
    saveBooking(newEvent);
  };

  const peopleOptions = useMemo(
    () =>
      (allPeople || [])
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((people) => (
          <Option
            value={people.id}
          >{`${people.name} ${people.family.name}`}</Option>
        )),
    [allPeople]
  );

  if (loadingPeople) return <p>Chargement des données...</p>;
  if (errorPeople) return <p>{error}</p>;

  return (
    <Form
      form={form}
      name="book"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Form.Item
        label="Qui"
        name="who"
        rules={[
          {
            required: true,
            message: "Veuillez préciser qui passe la réservation",
          },
        ]}
      >
        <Select placeholder="Qui passe la réservation ?" allowClear>
          {peopleOptions}
        </Select>
      </Form.Item>
      <Form.Item
        label="Arrivée"
        name="startDate"
        rules={[
          {
            required: true,
            message: "Veuillez préciser la date d'arrivée",
          },
        ]}
      >
        <DatePicker placeholder="Date d'arrivée" format={"DD MMMM"} />
      </Form.Item>
      <Form.Item
        label="Départ"
        name="endDate"
        rules={[
          {
            required: true,
            message: "Veuillez préciser la date de départ",
          },
        ]}
      >
        <DatePicker placeholder="Date de départ" format={"DD MMMM"} />
      </Form.Item>
      {!isEdit && (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}

export default BookForm;
