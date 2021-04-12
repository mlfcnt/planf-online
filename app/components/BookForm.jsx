import React, { useMemo } from "react";
import { Form, Button, DatePicker, Select } from "antd";
import { saveBooking } from "../api/bookings";
import moment from "moment";
moment.locale("fr");

function BookForm({ allPeople, addEvent, initialValues = {}, isEdit = false }) {
  const [form] = Form.useForm();

  const onFinish = ({ who, startDate, endDate }) => {
    console.log({ who, startDate, endDate });
    const newEvent = {
      who: {
        connect: {
          id: who,
        },
      },
      startDate: moment(startDate).format("yyyy-MM-DD"),
      endDate: moment(endDate).format("yyyy-MM-DD"),
    };
    console.log(who);
    // window.location.reload();
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
        <Select
          placeholder="Select a option and change input text above"
          allowClear
          value={initialValues.who}
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
