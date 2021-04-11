import React, { useMemo } from "react";
import { Form, Button, DatePicker, Select } from "antd";
import { saveBooking } from "../api/bookings";
import moment from "moment";
import { getAllPeople } from "../api/people";
import "moment/locale/fr";
import locale from "antd/es/date-picker/locale/fr_FR";

moment.locale("fr");

function BookForm({ addEvent }) {
  const { isLoading, error, allPeople } = getAllPeople();
  const [form] = Form.useForm();

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
    form.resetFields();
    addEvent(newEvent);
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

  if (isLoading) return <p>Chargement...</p>;
  if (error) <p>{error}</p>;

  return (
    <Form form={form} name="book" onFinish={onFinish}>
      <Form.Item
        label="Qui"
        name="who"
        initialValue=""
        rules={[
          {
            required: true,
            message: "Veuillez préciser qui passe la réservation",
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
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
        <DatePicker
          placeholder="Date d'arrivée"
          format={"DD MMMM"}
          locale={locale}
        />
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
        <DatePicker
          placeholder="Date de départ"
          format={"DD MMMM"}
          locale={locale}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Envoyer
        </Button>
      </Form.Item>
    </Form>
  );
}

export default BookForm;
