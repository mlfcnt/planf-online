import { Button } from "antd";
import React from "react";
import { useToggle } from "react-use";
import BookForm from "../components/BookForm";
import { Calendar } from "../components/Calendar";

function Home() {
  const [show, toggle] = useToggle(false);

  return (
    <>
      <Calendar />
      <Button
        size="large"
        type="primary"
        onClick={toggle}
        style={{ marginTop: "3vh", marginBottom: "3vh" }}
      >
        Réserver
      </Button>
      <BookForm show={show} />
    </>
  );
}

export default Home;
