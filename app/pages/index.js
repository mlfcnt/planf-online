import React from "react";
import styled from "styled-components";
import BookForm from "../components/BookForm";
import { Calendar } from "../components/Calendar";

const Bloc = styled.div`
  margin-bottom: 3vh !important;
`;
const Title = styled.div`
  font-size: 2rem !important;
  margin-bottom: 1vh !important;
`;

const FormContainer = styled.div`
  max-width: 50%;
  margin: auto;
`;

function Home() {
  return (
    <>
      <Bloc>
        <Calendar />
      </Bloc>
      <FormContainer>
        <Title>Réserver</Title>
        <BookForm />
      </FormContainer>
    </>
  );
}

export default Home;
