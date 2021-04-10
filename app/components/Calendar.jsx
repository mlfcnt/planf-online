import { useState } from "react";
import {
  MonthlyBody,
  MonthlyCalendar,
  MonthlyNav,
  DefaultMonthlyEventItem,
} from "@zach.codes/react-calendar";
import { startOfMonth, subHours } from "date-fns";

export const Calendar = () => {
  let [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  return (
    <MonthlyCalendar
      currentMonth={currentMonth}
      onCurrentMonthChange={(date) => setCurrentMonth(date)}
    >
      <MonthlyNav />
      <MonthlyBody
        events={[]}
        renderDay={(data) =>
          data.map((item, index) => (
            <DefaultMonthlyEventItem
              key={index}
              title={item.title}
              date={item.date}
            />
          ))
        }
      />
    </MonthlyCalendar>
  );
};
