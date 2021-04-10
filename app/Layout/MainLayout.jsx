import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 3vh !important;
  padding-top: 3vh !important;
  max-width: 70% !important;
  margin: auto !important;
`;

const Title = styled.h1`
  font-size: 3rem !important;
  text-align: center !important;
`;

export const MainLayout = ({ children }) => {
  return (
    <Container>
      <Title>Planf'Online</Title>
      {children}
    </Container>
  );
};
