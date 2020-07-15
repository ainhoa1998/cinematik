import React, { FC } from "react";
import styled from "styled-components";

export const Button: FC<{
  backgroundColor: "red" | "orange";
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ onClick, children, backgroundColor }) => {
  return (
    <StyledButton backgroundColor={backgroundColor} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ backgroundColor: "red" | "orange" }>`
  color: white;
  background-color: ${(props) => props.backgroundColor};
  padding: 5px;
`;
