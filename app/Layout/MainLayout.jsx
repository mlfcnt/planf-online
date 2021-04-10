import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 75%;
  margin: auto;
`;

export const MainLayout = ({ children }) => {
  return <Container>{children}</Container>;
};
