import React from "react";
import { DatePicker, Space } from "antd";

const { RangePicker: AntRangePicker } = DatePicker;

function RangePicker() {
  return (
    <Space direction="vertical" size={12}>
      <AntRangePicker
        locale="fr"
        showTime={{ format: "HH:mm" }}
        format="dd/MM/yyyy HH:mm"
      />
    </Space>
  );
}

export default RangePicker;
