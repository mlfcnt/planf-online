import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { saveBooking } from "../api/bookings";
import moment from "moment";

function BookForm({ addEvent }) {
  const [form] = Form.useForm();

  const onFinish = ({ who, startDate, endDate }) => {
    const newEvent = {
      who,
      startDate: moment(startDate).format("yyyy-MM-DD"),
      endDate: moment(endDate).format("yyyy-MM-DD"),
    };
    form.resetFields();
    addEvent(newEvent);
    saveBooking(newEvent);
  };

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
        <Input />
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
        <DatePicker placeholder="Date d'arrivée" />
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
        <DatePicker placeholder="Date de départ" />
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
