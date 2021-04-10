import React from "react";
import { Form, Input, Button, Radio } from "antd";
import RangePicker from "./RangePicker";

function BookForm({ show }) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    show && (
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Durée"
          name="range"
          rules={[
            {
              required: true,
              message: "Veuillez préciser les dates d'arrivée et départ",
            },
          ]}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    )
  );
}

export default BookForm;
